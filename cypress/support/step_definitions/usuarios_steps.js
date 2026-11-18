
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import usuariosPage from '../pages/usuarios_page';

When('eu acesso a lista de usuários', () => {
  usuariosPage.acessarListaUsuarios();
});

Then('a lista de usuários deve ser exibida corretamente', () => {
  usuariosPage.validarListaUsuarios();
});
