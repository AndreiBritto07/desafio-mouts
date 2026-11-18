import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { gerarUsuario } from '../factories/usuario_factory';
import usuariosClient from '../api/clients/usuarios_client';
import loginClient from '../api/clients/login_client';

Given('que existe um administrador para autenticação via API', () => {
  const usuario = gerarUsuario(true);
  cy.wrap(usuario).as('apiUsuarioLogin');
  usuariosClient.cadastrar(usuario).then((resposta) => {
    expect(resposta.status).to.eq(201);
    expect(resposta.body._id).to.be.a('string').and.not.be.empty;
  });
});

When('autentico esse administrador pela API', () => {
  cy.get('@apiUsuarioLogin').then(({ email, password }) => {
    loginClient.autenticar(email, password).as('apiRespostaLogin');
  });
});

Then('a API de login deve retornar status 200 e um token de autorização', () => {
  cy.get('@apiRespostaLogin').should((resposta) => {
    expect(resposta.status).to.eq(200);
    expect(resposta.body.message).to.eq('Login realizado com sucesso');
    expect(resposta.body.authorization).to.be.a('string').and.match(/^Bearer\s+\S+$/);
  });
});
