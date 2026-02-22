import React from 'react';

const types: { [key: string]: { regex: RegExp; message: string } } = {
  username: {
    regex: /^(?=.{3,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/,
    message: 'Sem @#$%!?* | Mínimo 3 a 20 caracteres',
  },
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um e-mail válido. ',
  },
  password: {
    regex: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%?=*&]).{6,20})/,
    message: '',
  },
  contentReview: {
    regex: /^.{1,1000}$/,
    message: '',
  },
};

const useForm = (type: string | false) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  function validate(value: string) {
    if (type === false) return true;
    if (value.length === 0) {
      setError('Não deixe este campo em branco.');
      return false;
    }
    if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    }
    setError(null);
    return true;
  }

  function onChange({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
