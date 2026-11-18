
import { Given } from '@badeball/cypress-cucumber-preprocessor';
import cadastroPage from '../pages/cadastro_page';
import loginPage from '../pages/login_page';
import adminHomePage from '../pages/admin_home_page';
import { gerarUsuario } from '../factories/usuario_factory';


Given('que eu realizo o cadastro do administrador com sucesso', () => {
  const administrador = gerarUsuario(true);

  cy.wrap(administrador).as('usuarioCriado');

  loginPage.acessarPaginaCadastro();

  cadastroPage.preencherFormulario(administrador);
  cadastroPage.confirmarCadastro();

  adminHomePage.validarHomeAdministrador(administrador.nome);
  adminHomePage.validarOpcoesAdministrador();
});


Given( 'que eu realizo o cadastro do cliente com sucesso', () => {
    const cliente = gerarUsuario(false);

    cy.wrap(cliente).as('usuarioCriado');

    loginPage.acessarPaginaCadastro();
    cadastroPage.preencherFormulario(cliente);
    cadastroPage.confirmarCadastro();
    cadastroPage.validarCadastroConcluido();
  }
);
