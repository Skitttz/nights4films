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
          <div className="border-e bg-slate-900 border-orange-900 my-auto max-w-xs text-slate-200 px-10 py-6 rounded-e-lg grid grid-cols-1 gap-y-4 font-medium mr-auto">
            <h1 className="text-3xl text-slate-50">Login</h1>
            <form className="grid gap-y-5" onSubmit={handleSubmit}>
              <Input
                label="Username"
                type="text"
                name="username"
                customStyleInput={
                  'focus:bg-slate-200 indent-1 focus:text-slate-900'
                }
                width={250}
                customStyleDiv={'h-[5.2rem] '}
                {...username}
              />
              <div className="relative">
                <Input
                  label="Password"
                  type="password"
                  name="senha"
                  width={250}
                  customStyleDiv={'h-[5.2rem] '}
                  customStyleInput={
                    'focus:bg-slate-200 indent-1 focus:text-slate-900'
                  }
                  {...password}
                />
                <Link
                  to={'recuperar'}
                  className="mb-2 text-xs underline text-right absolute right-0 -bottom-3"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <div>
                <Button
                  customStyle={`bg-orange-800 hover:bg-orange-700 transition-colors hover:text-slate-100 text-slate-300 py-2 px-8 rounded-lg`}
                >
                  {loading ? (
                    <div className="w-[42px] text-center text-[16px] mx-auto text-slate-100">
                      <LoadingOutlined />
                    </div>
                  ) : (
                    ' Entrar'
                  )}
                </Button>
                {error &&
                password.value.length > 2 &&
                username.value.length > 2 ? (
                  <div className="h-[30px]">
                    <Error error={error} />
                  </div>
                ) : (
                  <div className="h-[30px]"></div>
                )}
              </div>
            </form>

            <div>
              <p className="text-xs mt-8">
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
