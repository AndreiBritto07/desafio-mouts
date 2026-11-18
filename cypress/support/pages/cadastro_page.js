/// <reference types="cypress" /> 


export default {
  preencherNome(nome) {
    cy.get('#nome')
      .should('be.visible')
      .clear()
      .type(nome);
  },

  preencherEmail(email) {
    cy.get('#email')
      .should('be.visible')
      .clear()
      .type(email);
  },

  preencherSenha(senha) {
    cy.get('#password')
      .should('be.visible')
      .clear()
      .type(senha, { log: false });
  },

  selecionarAdministrador() {
    cy.get('#administrador')
      .check()
      .should('be.checked');
  },

  preencherFormulario(usuario) {
    this.preencherNome(usuario.nome);
    this.preencherEmail(usuario.email);
    this.preencherSenha(usuario.password);

    if (usuario.administrador === 'true') {
      this.selecionarAdministrador();
    }
  },

  confirmarCadastro() {
    cy.get('[data-testid="cadastrar"]')
      .should('be.visible')
      .and('be.enabled')
      .click();
  },

  validarCadastroConcluido() {
    cy.get('.alert-link')
      .should('be.visible')
      .should('contain.text', 'Cadastro realizado com sucesso');
  }
};
