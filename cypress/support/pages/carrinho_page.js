
export default {
  validarTelaEmConstrucao(mensagem) {
    cy.location('pathname')
      .should('eq', '/carrinho');

    cy.get('#root > div > div > h1')
      .should('be.visible')
      .and('have.text', mensagem);
  }
};
