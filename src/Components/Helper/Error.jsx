import React from 'react';

const Error = ({ error }) => {
  if (error === 'Failed to fetch') {
    error =
      'Ops! ocorreu um problema ao buscar os dados. Por favor, tente novamente mais tarde.';
  } else if (error === 'Request failed with status code 400') {
    error = 'Senha/ou Login incorretos';
  } else if (error === 'Request failed with status code 429') {
    error = 'Muitas tentativas espere um pouco';
  }
  if (!error) return null;
  return (
    <p
      className={`animate-fadeIn text-red-700 font-bold text-sm mt-1 tm:text-xs`}
    >
      {error}
    </p>
  );
};

export default Error;
