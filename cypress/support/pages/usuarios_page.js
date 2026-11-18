
/// <reference types="cypress" />

export default {
  acessarListaUsuarios() {
    cy.get('[data-testid="listarUsuarios"]')
      .should('be.visible')
      .click();
  },

  validarListaUsuarios() {
    // Valida a rota correta
    cy.location('pathname')
      .should('eq', '/admin/listarusuarios');

    // Valida o título real da página
    cy.get('.jumbotron h1')
      .should('be.visible')
      .and('have.text', 'Lista dos usuários');

    // Valida a tabela
    cy.get('.table.table-striped')
      .should('be.visible');

    // Valida os cabeçalhos
    const colunas = [
      'Nome',
      'Email',
      'Senha',
      'Administrador',
      'Ações'
    ];

    cy.get('.table.table-striped thead th')
      .should('have.length', colunas.length)
      .each(($coluna, indice) => {
        expect($coluna.text().trim())
          .to.equal(colunas[indice]);
      });

    // Valida que existem usuários cadastrados
    cy.get('.table.table-striped tbody tr')
      .should('have.length.greaterThan', 0);

    // Valida os controles de ação da primeira linha
    cy.get('.table.table-striped tbody tr')
      .first()
      .within(() => {
        cy.contains('Editar').should('be.visible');
        cy.contains('Excluir').should('be.visible');
      });
  }
};
