
import { When } from '@badeball/cypress-cucumber-preprocessor';
import vitrinePage from '../pages/vitrine_page';
import detalhesProdutoPage from '../pages/detalhes_produto_page';

When('eu acesso os detalhes do produto {string}', (produto) => {
  vitrinePage.acessarDetalhesProduto(produto);
  detalhesProdutoPage.validarDetalhesProduto(produto);
});

