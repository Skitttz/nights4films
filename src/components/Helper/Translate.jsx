const errorTranslations = {
  //Quando já existe Email ou Usuario Cadastrado
  'Email or Username are already taken': 'Email ou Usuário já existe',

  //Quando foi feito solicitacoes de forma repetida
  'Too many requests, please try again later.':
    'Muitas tentativas, tente novamente mais tarde.',

  //Quando o usuario bota login/senha invalida
  'Invalid identifier or password': 'Usuário/ou Senha inválida',

  //Campo Obrigatorio Vazio
  'identifier is a required field': 'Preencha o Campo de Login',
  'password is a required field': 'Preencha o Campo de Senha',

  //Mais de um Campo Obrigatorio Vazio
  '2 errors occurred': 'Preencha os Campos Obrigatórios',
};

export function translateErrorMessage(errorMessage) {
  if (errorTranslations[errorMessage]) {
    return errorTranslations[errorMessage];
  } else {
    return errorMessage; // Se não houver tradução, retorne a mensagem original.
  }
}
