import { Given } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../pages/login_page';

Given('que eu realizo o login com sucesso', () => {
  cy.get('@usuarioCriado').then((usuario) => {
    loginPage.acessarPaginaLogin();

    loginPage.preencherLogin(
      usuario.email,
      usuario.password
    );

    loginPage.confirmarLogin();
  });

  cy.location('pathname')
    .should('eq', '/admin/home');
});