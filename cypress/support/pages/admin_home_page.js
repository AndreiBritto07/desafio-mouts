
/// <reference types="cypress" />

export default {
  
validarHomeAdministrador(nome) {
  cy.location('pathname')
    .should('eq', '/admin/home');

  cy.get('.jumbotron h1')
    .should('be.visible')
    .invoke('text')
    .then((texto) => {
      const mensagemAtual = texto.replace(/\s+/g, ' ').trim();
      const mensagemEsperada = `Bem Vindo ${nome}`;

      expect(mensagemAtual).to.equal(mensagemEsperada);
    });
},


  validarOpcoesAdministrador() {
    cy.get('[data-testid="listarUsuarios"]')
      .should('be.visible');

    cy.get('[data-testid="listarProdutos"]')
      .should('be.visible');
  }
};
