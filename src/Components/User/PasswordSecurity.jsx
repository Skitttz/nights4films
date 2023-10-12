import React from 'react';

const PasswordSecurity = ({ children }) => {
  /* Tamanho */
  const validateTL = children.length >= 6 && children.length <= 20;

  /* Caract Especial */
  const validateSC = /[^A-Za-z0-9]/.test(children);

  /* Lower Case */
  const validateLW = /[a-z]/.test(children);

  /* Upper Case */
  const validateUC = /[A-Z]/.test(children);

  /* Number Case */
  const validateNC = /[0-9]/.test(children);

  return (
    <div
      className="animate-animeDown"
      style={{ fontWeight: '550', marginBottom: '2rem' }}
    >
      <p>
        {validateTL
          ? '✔️ OK! A senha tem entre 6 a 20 caracteres.'
          : `❌ Crie uma senha de 6 a 20 caracteres.`}
      </p>
      <p>
        {validateUC
          ? '✔️ OK! Temos uma letra maiúscula aqui. '
          : `❌ Insira uma letra maiúscula.`}
      </p>
      <p>
        {validateLW
          ? '✔️ OK! Temos uma letra minúscula. '
          : '❌ Insira uma letra minúscula. '}
      </p>
      <p>{validateNC ? '✔️ OK! Temos um número. ' : `❌ Insira um número.`}</p>
      <p>
        {validateSC
          ? '✔️ OK! Temos um caracter especial.'
          : `❌ Insira um carácter especial. `}
      </p>
    </div>
  );
};

export default PasswordSecurity;
