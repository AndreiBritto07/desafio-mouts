
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import listaComprasPage from '../pages/lista_compras_page';

Then('o produto {string} deve ser exibido na lista de compras', (produto) => {
  listaComprasPage.validarProdutoNaLista(produto);
});

When('eu adiciono a lista de compras ao carrinho', () => {
  listaComprasPage.adicionarAoCarrinho();
});
