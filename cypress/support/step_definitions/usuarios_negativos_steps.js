
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { gerarUsuario } from '../factories/usuario_factory';
import usuariosClient from '../api/clients/usuarios_client';

Given('que existe um usuário previamente cadastrado', () => {
  const usuario = gerarUsuario(false);

  usuariosClient.cadastrar(usuario).then((resposta) => {
    expect(resposta.status).to.eq(201);
  });

  cy.wrap(usuario).as('cadastroInvalido');
  cy.wrap('duplicado').as('tipoErroCadastro');
});

Given('que possuo dados de cadastro sem o campo nome', () => {
  const usuario = gerarUsuario(false);
  delete usuario.nome;

  cy.wrap(usuario).as('cadastroInvalido');
  cy.wrap('nome').as('tipoErroCadastro');
});

Given('que possuo dados de cadastro sem o campo email', () => {
  const usuario = gerarUsuario(false);
  delete usuario.email;

  cy.wrap(usuario).as('cadastroInvalido');
  cy.wrap('email').as('tipoErroCadastro');
});

Given('que possuo dados de cadastro com email inválido', () => {
  const usuario = gerarUsuario(false);
  usuario.email = 'email-invalido';

  cy.wrap(usuario).as('cadastroInvalido');
  cy.wrap('email').as('tipoErroCadastro');
});

Given('que possuo dados de cadastro sem o campo password', () => {
  const usuario = gerarUsuario(false);
  delete usuario.password;

  cy.wrap(usuario).as('cadastroInvalido');
  cy.wrap('password').as('tipoErroCadastro');
});

When('tento cadastrar outro usuário com o mesmo email', () => {
  cy.get('@cadastroInvalido').then((usuario) => {
    usuariosClient.cadastrar(usuario)
      .as('respostaCadastroInvalido');
  });
});

When('envio uma requisição de cadastro inválido', () => {
  cy.get('@cadastroInvalido').then((usuario) => {
    usuariosClient.cadastrar(usuario)
      .as('respostaCadastroInvalido');
  });
});


Then('a API deve rejeitar o cadastro com status {int}', (status) => {
  cy.get('@tipoErroCadastro').then((tipoErro) => {
    cy.get('@respostaCadastroInvalido').then((resposta) => {
      expect(resposta.status).to.eq(status);

      const body = resposta.body;

      expect(body).to.be.an('object');
      expect(body).not.to.have.property('_id');

      if (tipoErro === 'duplicado') {
        expect(body.message)
          .to.eq('Este email já está sendo usado');

        return;
      }

      expect(body)
        .to.have.property(tipoErro)
        .that.is.a('string')
        .and.not.be.empty;
    });
  });
});

