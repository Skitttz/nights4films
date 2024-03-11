import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { Link } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import { useUserContext } from '../../Hooks/useUser';
import Error from '../Helper/Error';
import Head from '../Helper/Head';
import { LoadingOutlined } from '@ant-design/icons';

const LoginForm = () => {
  const username = useForm(false);
  const password = useForm(false);
  const { userLogin, error, loading } = useUserContext();

  async function handleSubmit(event) {
    event.preventDefault();

    userLogin(username.value, password.value);
  }
  return (
    <div className="relative">
      <Head title=" » Login" />
      <section className="max-w-5xl animate-animeLeft mx-auto font-roboto grid grid-cols-2 mt-24 before:bg-login before:bg-cover before:bg-center before:bg-no-repeat before:h-[auto] before:w-[15rem] before:ml-auto before:rounded-s-xl z-10 sm:before:hidden sm:grid-cols-1">
        <div className="relative sm:mx-auto">
          <div className="border-e bg-slate-900 border-orange-900 my-auto max-w-xs desktop:max-w-sm text-slate-200 px-10 py-6 rounded-e-lg grid grid-cols-1 gap-y-4 font-medium mr-auto">
            <h1 className="text-3xl text-slate-50">Login</h1>
            <form
              className="grid gap-y-5 desktop:max-w-[250px]"
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
                width={250}
                {...username}
              />
              <div className="relative">
                <Input
                  label="Senha"
                  type="password"
                  name="senha"
                  customStyleDiv={'h-[5.2rem] '}
                  customStyleInput={
                    'focus:bg-slate-200 indent-1 focus:text-slate-900'
                  }
                  width={250}
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
                  customStyle={`h-12 w-28 bg-orange-800 hover:bg-orange-700 transition-all duration-300 hover:text-slate-100 text-slate-300 rounded-lg`}
                >
                  {loading ? (
                    <LoadingOutlined className="text-[24px]" />
                  ) : (
                    <p className="font-bold">Entrar</p>
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
