const apiUrl = 'https://serverest.dev';

export default {
  cadastrar(produto, token) {
    return cy.request({ method: 'POST', url: `${apiUrl}/produtos`, headers: { Authorization: token }, body: produto, failOnStatusCode: false });
  },
  consultar(id) {
    return cy.request({ method: 'GET', url: `${apiUrl}/produtos/${id}`, failOnStatusCode: false });
  }
};
