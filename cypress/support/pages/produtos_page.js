
/// <reference types="cypress" />

export default {
  acessarListaProdutos() {
    cy.get('[data-testid="listarProdutos"]')
      .should('be.visible')
      .click();
  },

  validarListaProdutos() {
    // Valida a rota correta
    cy.location('pathname')
      .should('eq', '/admin/listarprodutos');

    // Valida o título real da página
    cy.get('.jumbotron h1')
      .should('be.visible')
      .and('have.text', 'Lista dos Produtos');

    // Valida a tabela
    cy.get('.table.table-striped')
      .should('be.visible');

    // Valida os cabeçalhos
    const colunas = [
      'Nome',
      'Preço',
      'Descrição',
      'Quantidade',
      'Imagem',
      'Ações'
    ];

    cy.get('.table.table-striped thead th')
      .should('have.length', colunas.length)
      .each(($coluna, indice) => {
        expect($coluna.text().trim())
          .to.equal(colunas[indice]);
      });

    // Valida a existência de produtos
    cy.get('.table.table-striped tbody tr')
      .should('have.length.greaterThan', 0);

    // Valida as ações disponíveis na primeira linha
    cy.get('.table.table-striped tbody tr')
      .first()
      .within(() => {
        cy.contains('Editar').should('be.visible');
        cy.contains('Excluir').should('be.visible');
      });
  }
};
