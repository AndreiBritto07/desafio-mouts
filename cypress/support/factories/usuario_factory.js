import { faker } from '@faker-js/faker/locale/pt_BR';

export function gerarUsuario(administrador = false) {
  return {
    nome: faker.person.fullName(),
    email: `qa.${faker.string.uuid()}@example.com`,
    password: faker.internet.password({ length: 12 }),
    administrador: String(administrador)
  };
}