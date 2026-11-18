
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { gerarUsuario } from '../factories/usuario_factory';
import usuariosClient from '../api/clients/usuarios_client';
import loginClient from '../api/clients/login_client';

Given('que possuo um email não cadastrado', () => {
  const { email, password } = gerarUsuario(false);
  cy.wrap({ email, password }).as('loginInvalido');
});

Given('que possuo um usuário cadastrado', () => {
  const usuario = gerarUsuario(false);

  usuariosClient.cadastrar(usuario).then((resposta) => {
    expect(resposta.status).to.eq(201);
  });

  cy.wrap({
    email: usuario.email,
    password: usuario.password
  }).as('loginInvalido');
});

Given('informo uma senha incorreta', () => {
  cy.get('@loginInvalido').then((dados) => {
    cy.wrap({
      ...dados,
      password: `${dados.password}incorreta`
    }).as('loginInvalido');
  });
});

Given('que possuo credenciais sem o campo email', () => {
  cy.wrap({ password: 'Senha123!' }).as('loginInvalido');
});

Given('que possuo credenciais sem o campo password', () => {
  const usuario = gerarUsuario(false);
  cy.wrap({ email: usuario.email }).as('loginInvalido');
});

Given('que possuo credenciais com email inválido', () => {
  cy.wrap({
    email: 'email-invalido',
    password: 'Senha123!'
  }).as('loginInvalido');
});

When('envio uma requisição de login', () => {
  cy.get('@loginInvalido').then((dados) => {
    loginClient.autenticarComPayload(dados)
      .as('respostaLoginInvalido');
  });
});


Then('a API deve rejeitar o login com status {int}', (status) => {
  cy.get('@respostaLoginInvalido').then((resposta) => {
    expect(resposta.status).to.eq(status);

    const body = resposta.body;

    expect(body).to.be.an('object');
    expect(body).not.to.have.property('authorization');

    if (status === 401) {
      expect(body.message)
        .to.eq('Email e/ou senha inválidos');

      return;
    }

    cy.get('@loginInvalido').then((credenciais) => {
      if (!Object.hasOwn(credenciais, 'email')) {
        expect(body.email)
          .to.eq('email é obrigatório');
      } else if (!Object.hasOwn(credenciais, 'password')) {
        expect(body.password)
          .to.eq('password é obrigatório');
      } else {
        expect(body)
          .to.have.property('email')
          .that.is.a('string')
          .and.not.be.empty;
      }
    });
  });
});
