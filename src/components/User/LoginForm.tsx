import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { useUserContext } from '../../hooks/useUser';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

const LoginForm = () => {
  const username = useForm(false);
  const password = useForm(false);
  const { userLogin, error, loading } = useUserContext();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    userLogin(username.value, password.value);
  }
  return (
    <div className="relative">
      <Head title=" » Login" description="Login page" />
      <section className="max-w-5xl animate-animeLeft mx-auto font-roboto grid grid-cols-[15rem,auto] items-center justify-center mt-20 px-0 z-10 sm:grid-cols-1">
        <div className="sm:hidden block w-[15rem] h-[26.5rem] bg-login bg-cover bg-center bg-no-repeat rounded-l-xl shadow-[0_10px_25px_rgba(0,0,0,0.45)] opacity-95" />
        <div className="relative -ml-2 sm:ml-0 sm:flex sm:justify-center sm:px-4">
          <div className="bg-slate-900 border border-orange-900 my-auto w-full max-w-sm text-slate-200 px-8 py-6 rounded-r-xl rounded-l-none sm:rounded-l-xl grid grid-cols-1 gap-y-4 font-medium">
            <h1 className="text-3xl text-slate-50">Login</h1>
            <form
              className="grid gap-y-5 w-full"
              onSubmit={handleSubmit}
            >
              <Input
                label="Usuario"
                type="username"
                name="username"
                customStyleInput={
                  'focus:bg-slate-200 indent-1 focus:text-slate-900 '
                }
                customStyleDiv={'h-[5.2rem] '}
                width={'100%'}
                {...username}
              />
              <div className="relative">
                <Input
                  label="Senha"
                  type="password"
                  name="password"
                  customStyleDiv={'h-[5.2rem] '}
                  customStyleInput={
                    'focus:bg-slate-200 indent-1 focus:text-slate-900'
                  }
                  width={'100%'}
                  {...password}
                />
                <Link
                  to={'recuperar'}
                  className="pt-1 text-sm underline text-right absolute right-0 -bottom-3"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="transition-transform duration-300">
                <Button
                  customStyle={`h-12 w-full bg-orange-800 hover:bg-orange-700 transition-all duration-300 hover:text-slate-100 text-slate-300 rounded-lg`}
                >
                  {loading ? (
                    <LoadingOutlined className="text-[24px]" />
                  ) : (
                    <p className="font-bold text-center">Entrar</p>
                  )}
                </Button>
                <div className="absolute">
                  {error ? <Error error={error} /> : ''}
                </div>
              </div>
            </form>

            <div>
              <p className="text-sm mt-8">
                Ainda não tem uma conta?{' '}
                <Link
                  className="text-orange-400 font-extrabold"
                  to={'register'}
                >
                  Clique Aqui.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
