import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { gerarUsuario } from '../factories/usuario_factory';
import usuariosClient from '../api/clients/usuarios_client';

Given('que preparo os dados de um novo administrador via API', () => {
  cy.wrap(gerarUsuario(true)).as('apiUsuario');
});

When('cadastro o administrador pela API', () => {
  cy.get('@apiUsuario').then((usuario) => {
    usuariosClient.cadastrar(usuario).as('apiRespostaCadastroUsuario');
  });
});

Then('a API de usuários deve confirmar o cadastro com status 201', () => {
  cy.get('@apiRespostaCadastroUsuario').should((resposta) => {
    expect(resposta.status).to.eq(201);
    expect(resposta.body.message).to.eq('Cadastro realizado com sucesso');
    expect(resposta.body._id).to.be.a('string').and.not.be.empty;
  });
});

Then('a consulta por ID deve retornar o administrador cadastrado', () => {
  cy.get('@apiRespostaCadastroUsuario').then(({ body }) => {
    usuariosClient.consultar(body._id).then((consulta) => {
      expect(consulta.status).to.eq(200);
      cy.get('@apiUsuario').then((usuario) => {
        expect(consulta.body).to.include({
          _id: body._id, nome: usuario.nome, email: usuario.email,
          administrador: usuario.administrador
        });
      });
    });
  });
});
