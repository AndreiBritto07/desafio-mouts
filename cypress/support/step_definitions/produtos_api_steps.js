import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { gerarUsuario } from '../factories/usuario_factory';
import { gerarProduto } from '../factories/produto_factory';
import usuariosClient from '../api/clients/usuarios_client';
import loginClient from '../api/clients/login_client';
import produtosClient from '../api/clients/produtos_client';

Given('que estou autenticado como administrador via API', () => {
  const usuario = gerarUsuario(true);
  usuariosClient.cadastrar(usuario).then((cadastro) => {
    expect(cadastro.status).to.eq(201);
    loginClient.autenticar(usuario.email, usuario.password).then((login) => {
      expect(login.status).to.eq(200);
      expect(login.body.authorization).to.match(/^Bearer\s+\S+$/);
      cy.wrap(login.body.authorization).as('apiTokenAdministrador');
    });
  });
});

Given('que preparo os dados de um produto via API', () => {
  cy.wrap(gerarProduto()).as('apiProduto');
});

When('cadastro o produto pela API', () => {
  cy.get('@apiTokenAdministrador').then((token) => {
    cy.get('@apiProduto').then((produto) => {
      produtosClient.cadastrar(produto, token).as('apiRespostaCadastroProduto');
    });
  });
});

Then('a API de produtos deve confirmar o cadastro com status 201', () => {
  cy.get('@apiRespostaCadastroProduto').should((resposta) => {
    expect(resposta.status).to.eq(201);
    expect(resposta.body.message).to.eq('Cadastro realizado com sucesso');
    expect(resposta.body._id).to.be.a('string').and.not.be.empty;
  });
});

Then('a consulta por ID deve retornar o produto cadastrado', () => {
  cy.get('@apiRespostaCadastroProduto').then(({ body }) => {
    produtosClient.consultar(body._id).then((consulta) => {
      expect(consulta.status).to.eq(200);
      cy.get('@apiProduto').then((produto) => {
        expect(consulta.body).to.include({ _id: body._id, ...produto });
      });
    });
  });
});
