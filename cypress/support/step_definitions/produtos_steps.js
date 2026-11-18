
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import produtosPage from '../pages/produtos_page';

When('eu acesso a lista de produtos', () => {
  produtosPage.acessarListaProdutos();
});

Then('a lista de produtos deve ser exibida corretamente', () => {
  produtosPage.validarListaProdutos();
});
