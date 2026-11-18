import { faker } from '@faker-js/faker/locale/pt_BR';

export function gerarProduto() {
  return {
    nome: `Produto QA ${faker.string.uuid()}`,
    preco: faker.number.int({ min: 10, max: 1000 }),
    descricao: 'Produto criado por teste automatizado de API',
    quantidade: faker.number.int({ min: 1, max: 100 })
  };
}
