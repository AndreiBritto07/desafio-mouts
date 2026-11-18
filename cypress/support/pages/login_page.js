/// <reference types="cypress" />

export default {
  acessarPaginaCadastro() {
    cy.visit('/');

    cy.get('[data-testid="cadastrar"]')
      .should('be.visible')
      .click();
  },


  preencherLogin(email, senha) {
    cy.get('#email')
      .should('be.visible')
      .clear()
      .type(email);

    cy.get('#password')
      .should('be.visible')
      .clear()
      .type(senha, { log: false });
  },

  confirmarLogin() {
    cy.get('[data-testid="entrar"]')
      .should('be.enabled')
      .click();
  }
};