import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from '../../hooks/useForm';
import { useUserContext } from '../../hooks/useUser';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Error from '../Helper/Error';
import Head from '../Helper/Head';
import PasswordSecurity from './PasswordSecurity';

const RegisterForm = () => {
  const username = useForm('username');
  const password = useForm('password');
  const email = useForm('email');
  const { userRegister, loading, error } = useUserContext();
  const navigator = useNavigate();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (username.validate() && password.validate() && email.validate()) {
      await userRegister(email.value, username.value, password.value);
      if (error === null) {
        toast.success('Cadastro realizado. Você será redirecionado para o login.', {
          position: 'top-center',
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });

        setTimeout(() => {
          navigator('/login');
        }, 4000);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  return (
    <section className="animate-animeLeft max-w-md sm:max-w-lg mx-auto px-4">
      <Head title=" » Cadastro" description="Registration Page" />
      <div className="grid justify-center mt-12">
        <h1 className="text-3xl sm:text-4xl font-gabarito text-[rgba(107,70,178)] font-bold border-b-gray-700 rounded-sm">
          Criar conta
        </h1>
        <p className="text-sm text-slate-300 mt-1 mb-4">
          Preencha os dados obrigatórios: nome de usuário, e‑mail e senha.
        </p>
        <form
          className="bg-slate-200 px-6 sm:px-8 py-6 rounded-xl flex flex-col gap-y-4 font-roboto shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
          onSubmit={handleSubmit}
        >
          <Input
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            customStyleInput={'tm:w-full tm:indent-0 focus:ring-2 focus:ring-purple-700'}
            customStyleDiv={'h-[auto] '}
            width={'100%'}
            height={'48px'}
            labelStyle={'font-semibold'}
            {...email}
          />
          <p className="text-xs text-slate-600">Use um e‑mail válido. Você receberá comunicações importantes por ele.</p>
          <Input
            label="Nome de usuário"
            type="text"
            name="username"
            autoComplete="username"
            customStyleInput={'tm:w-full tm:indent-0 focus:ring-2 focus:ring-purple-700'}
            customStyleDiv={'h-[auto]'}
            width={'100%'}
            height={'48px'}
            labelStyle={'font-semibold'}
            {...username}
          />
          <p className="text-xs text-slate-600">Entre 3 e 20 caracteres. Evite espaços e caracteres especiais.</p>
          <Input
            label="Senha"
            type="password"
            name="senha"
            autoComplete="new-password"
            customStyleInput={'tm:w-full tm:indent-0 focus:ring-2 focus:ring-purple-700'}
            labelStyle={'font-semibold'}
            customStyleDiv={'h-[auto]'}
            width={'100%'}
            height={'48px'}
            {...password}
          />
          <div className="text-sm">
            {password.value || password.value === '' ? (
              <PasswordSecurity>{password.value}</PasswordSecurity>
            ) : (
              ''
            )}
          </div>
          <div className="flex flex-col justify-center items-center font-bold font-gabarito text-lg mt-2">
            {loading ? (
              <Button disabled customStyle="h-12 w-full bg-purple-900 text-white rounded-lg">Cadastrando...</Button>
            ) : (
              <Button disabled={!email.value || !username.value || !password.value} customStyle="h-12 w-full bg-purple-900 hover:bg-purple-800 transition-colors text-white rounded-lg active:scale-[.99]">Criar conta</Button>
            )}
            <div aria-live="polite" role="alert" className="w-full mt-2">
              <Error error={error} />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
