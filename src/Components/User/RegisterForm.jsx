import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import Head from '../Head';
import PasswordSecurity from './PasswordSecurity';
import Error from '../Helper/Error';
import { userRegister_POST } from '../Api/Api';
import { useUserContext } from '../../Hooks/useUser';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const username = useForm('username');
  const password = useForm('password');
  const email = useForm('email');
  const { userRegister, loading } = useUserContext();
  const navigator = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    if (username.validate() && password.validate() && email.validate()) {
      userRegister(email.value, username.value, password.value);
      navigator('/login');
    } else {
      return null;
    }
  }
  return (
    <section className="animate-animeLeft max-w-5xl mx-auto">
      <Head title=" » Cadastro" />
      <div className="grid justify-center mt-16">
        <h1
          className="text-4xl font-gabarito text-[rgba(107,70,178)] font-bold mb-2 border-b border-b-1 border-b-gray-700 rounded-lg
        "
        >
          Cadastre-se
        </h1>
        <form
          className="bg-slate-200 px-12 py-6 rounded-xl flex flex-col gap-y-3 font-roboto"
          onSubmit={handleSubmit}
        >
          <Input
            label="Email"
            type="email"
            name="email"
            customStyleDiv={'h-[5.2rem]'}
            labelStyle={'font-semibold'}
            {...email}
          />
          <Input
            label="Username"
            type="text"
            name="username"
            labelStyle={'font-semibold'}
            customStyleDiv={'h-[5.2rem]'}
            {...username}
          />
          <Input
            label="Senha"
            type="password"
            name="senha"
            labelStyle={'font-semibold'}
            customStyleDiv={'h-[5.2rem]'}
            {...password}
          />
          <div className="text-sm">
            {password.value || password.value === '' ? (
              <PasswordSecurity>{password.value}</PasswordSecurity>
            ) : (
              ''
            )}
          </div>
          <div className="mx-auto font-bold font-gabarito text-lg">
            {loading ? (
              <Button disabled>Cadastrando...</Button>
            ) : (
              <Button>Cadastrar</Button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
