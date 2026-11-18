/// <reference types="cypress" />

export default {
  acessarDetalhesProduto() {
    cy.get('[data-testid="product-detail-link"] a')
      .first()
      .should('be.visible')
      .click();

    cy.location('pathname')
      .should('include', '/detalhesProduto/');

    cy.get('[data-testid="product-detail-name"]')
      .should('be.visible')
      .invoke('text')
      .then((nome) => {
        const nomeProduto = nome.trim();

        expect(nomeProduto).to.not.be.empty;

        cy.wrap(nomeProduto).as('nomeProdutoSelecionado');
      });
  }
};

