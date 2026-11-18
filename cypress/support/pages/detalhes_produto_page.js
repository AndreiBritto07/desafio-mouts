
/// <reference types="cypress" />

export default {
  acessarDetalhesProduto() {
    cy.get('[data-testid="product-detail-link"] a')
      .first()
      .should('be.visible')
      .click();

    cy.location('pathname')
      .should('include', '/detalhesProduto/');
  },

  validarDetalhesProduto() {
    cy.location('pathname')
      .should('include', '/detalhesProduto/');

    cy.get('@nomeProdutoSelecionado').then((nome) => {
      cy.get('[data-testid="product-detail-name"]')
        .should('be.visible')
        .and('have.text', nome);
    });

    cy.get('[data-testid="adicionarNaLista"]')
      .should('be.visible');
  },

  adicionarNaLista() {
    cy.get('[data-testid="adicionarNaLista"]')
      .should('be.visible')
      .click();
  }
};
