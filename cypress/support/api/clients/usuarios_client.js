const apiUrl = 'https://serverest.dev';

export default {
  cadastrar(usuario) {
    return cy.request({ method: 'POST', url: `${apiUrl}/usuarios`, body: usuario, failOnStatusCode: false });
  },
  consultar(id) {
    return cy.request({ method: 'GET', url: `${apiUrl}/usuarios/${id}`, failOnStatusCode: false });
  }
};
