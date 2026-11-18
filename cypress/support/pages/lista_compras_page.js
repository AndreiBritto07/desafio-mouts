
export default {
  
  validarProdutoNaLista() {
    cy.location('pathname')
      .should('eq', '/minhaListaDeProdutos');

    cy.contains('h1', 'Lista de Compras')
      .should('be.visible');

    cy.get('@nomeProdutoSelecionado').then((nomeProduto) => {
      cy.contains(nomeProduto)
        .should('be.visible');
    });
  },


  adicionarAoCarrinho() {
    cy.get('[data-testid="adicionar carrinho"]')
      .should('be.visible')
      .and('be.enabled')
      .click();
  }
};
