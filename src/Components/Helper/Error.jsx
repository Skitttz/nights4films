import React from 'react';

const Error = ({ error }) => {
  if (error === 'Failed to fetch') {
    error =
      'Ops! ocorreu um problema ao buscar os dados. Por favor, tente novamente mais tarde.';
  }
  if (!error) return null;
  return (
    <p className={`animate-fadeIn text-red-700 font-bold text-sm mt-1`}>
      {error}
    </p>
  );
};

export default Error;
