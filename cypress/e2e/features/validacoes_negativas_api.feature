
@api @negative @login
Feature: Validações negativas de autenticação e de cadastro de usuários

  Scenario: Login com email não cadastrado
    Given que possuo um email não cadastrado
    When envio uma requisição de login
    Then a API deve rejeitar o login com status 401

  Scenario: Login com senha incorreta
    Given que possuo um usuário cadastrado
    And informo uma senha incorreta
    When envio uma requisição de login
    Then a API deve rejeitar o login com status 401

  Scenario: Login sem informar email
    Given que possuo credenciais sem o campo email
    When envio uma requisição de login
    Then a API deve rejeitar o login com status 400

  Scenario: Login sem informar senha
    Given que possuo credenciais sem o campo password
    When envio uma requisição de login
    Then a API deve rejeitar o login com status 400

  Scenario: Login com email em formato inválido
    Given que possuo credenciais com email inválido
    When envio uma requisição de login
    Then a API deve rejeitar o login com status 400


  Scenario: Cadastro com email já existente
    Given que existe um usuário previamente cadastrado
    When tento cadastrar outro usuário com o mesmo email
    Then a API deve rejeitar o cadastro com status 400

  Scenario: Cadastro sem nome
    Given que possuo dados de cadastro sem o campo nome
    When envio uma requisição de cadastro inválido
    Then a API deve rejeitar o cadastro com status 400

  Scenario: Cadastro sem email
    Given que possuo dados de cadastro sem o campo email
    When envio uma requisição de cadastro inválido
    Then a API deve rejeitar o cadastro com status 400

  Scenario: Cadastro com email inválido
    Given que possuo dados de cadastro com email inválido
    When envio uma requisição de cadastro inválido
    Then a API deve rejeitar o cadastro com status 400

  Scenario: Cadastro sem senha
    Given que possuo dados de cadastro sem o campo password
    When envio uma requisição de cadastro inválido
    Then a API deve rejeitar o cadastro com status 400
  
