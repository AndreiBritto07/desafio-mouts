import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

import detalhesProdutoPage from '../pages/detalhes_produto_page';
import vitrinePage from '../pages/vitrine_page';

When('eu acesso os detalhes do primeiro produto disponível', () => {
  vitrinePage.acessarDetalhesProduto();
});

Then('os detalhes do produto devem ser exibidos corretamente', () => {
  detalhesProdutoPage.validarDetalhesProduto();
});

When('eu adiciono o produto à lista de compras', () => {
  detalhesProdutoPage.adicionarNaLista();
});
