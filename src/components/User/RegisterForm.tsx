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
  const [click, setClicked] = React.useState(false);
  const email = useForm('email');
  const { userRegister, loading, error } = useUserContext();
  const navigator = useNavigate();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (username.validate() && password.validate() && email.validate()) {
      await userRegister(email.value, username.value, password.value);
      setClicked(true);
      if (error === null) {
        toast.success('Cadastrado com Sucesso!', {
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
        <h1
          className="text-3xl sm:text-4xl font-gabarito text-[rgba(107,70,178)] font-bold mb-4 border-b border-b-1 border-b-gray-700 rounded-lg
        "
        >
          Cadastre-se
        </h1>
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
          <Input
            label="Username"
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
              <Button customStyle="h-12 w-full bg-purple-900 hover:bg-purple-800 transition-colors text-white rounded-lg active:scale-[.99]">Cadastrar</Button>
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
