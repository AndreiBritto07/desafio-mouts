
import { Then } from '@badeball/cypress-cucumber-preprocessor';
import carrinhoPage from '../pages/carrinho_page';

Then('devo visualizar a mensagem {string}', (mensagem) => {
  carrinhoPage.validarTelaEmConstrucao(mensagem);
});
