Feature: Desafio Mouts

Scenario: Cadastrar um usuário administrador com sucesso e acessar a lista de produtos
    Given que eu realizo o cadastro do administrador com sucesso
    When eu acesso a lista de produtos
    Then a lista de produtos deve ser exibida corretamente


Scenario: Cadastrar um usuário administrador com sucesso e acessar a lista de usuários
    Given que eu realizo o cadastro do administrador com sucesso
    When eu acesso a lista de usuários
    Then a lista de usuários deve ser exibida corretamente

Scenario: Cadastrar cliente e adicionar produto ao carrinho
    Given que eu realizo o cadastro do cliente com sucesso
    When eu acesso os detalhes do produto "Produto QA Carrinho 1794921708338"
    And eu adiciono o produto à lista de compras
    Then o produto "Produto QA Carrinho 1794921708338" deve ser exibido na lista de compras
    When eu adiciono a lista de compras ao carrinho
    Then devo visualizar a mensagem "Em construção aguarde"  

Scenario: API-001 - Cadastrar administrador e consultar os dados persistidos
    Given que preparo os dados de um novo administrador via API
    When cadastro o administrador pela API
    Then a API de usuários deve confirmar o cadastro com status 201
    And a consulta por ID deve retornar o administrador cadastrado

Scenario: API-002 - Autenticar administrador com credenciais válidas
    Given que existe um administrador para autenticação via API
    When autentico esse administrador pela API
    Then a API de login deve retornar status 200 e um token de autorização


Scenario: API-003 - Cadastrar produto autenticado e consultar os dados persistidos
    Given que estou autenticado como administrador via API
    And que preparo os dados de um produto via API
    When cadastro o produto pela API
    Then a API de produtos deve confirmar o cadastro com status 201
    And a consulta por ID deve retornar o produto cadastrado

