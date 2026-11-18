const apiUrl = 'https://serverest.dev';

export default {
  autenticar(email, password) {
    return this.autenticarComPayload({ email, password });
  },

  autenticarComPayload(payload) {
    return cy.request({
      method: 'POST',
      url: `${apiUrl}/login`,
      body: payload,
      failOnStatusCode: false
    });
  }
};
