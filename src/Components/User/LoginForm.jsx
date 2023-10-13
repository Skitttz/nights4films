import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { Link } from 'react-router-dom';
import { userLogin_POST } from '../Api/Api';
import useForm from '../../Hooks/useForm';
import { useUserContext } from '../../Hooks/useUser';

const LoginForm = () => {
  const username = useForm('');
  const password = useForm('');
  const { userLogin } = useUserContext();

  async function handleSubmit(event) {
    event.preventDefault();
    userLogin(username.value, password.value);
  }
  return (
    <div className="relative">
      <section className="max-w-5xl animate-animeLeft mx-auto font-roboto grid grid-cols-2 mt-24 before:bg-[url('../../src/Assets/photo_login_l.jpg')] before:bg-cover before:bg-center before:bg-no-repeat before:h-[auto] before:w-[15rem] before:ml-auto before:rounded-s-xl z-10">
        <div className="relative">
          <div className="border-e bg-slate-900 border-orange-900 my-auto max-w-xs text-slate-200 px-10 py-6 rounded-e-lg grid grid-cols-1 gap-y-4 font-medium mr-auto">
            <h1 className="text-3xl text-slate-50">Login</h1>
            <form className="grid gap-y-6" onSubmit={handleSubmit}>
              <Input
                label="Username"
                type="text"
                name="username"
                customStyleInput={
                  'focus:bg-slate-200 indent-1 focus:text-slate-900'
                }
                width={250}
                {...username}
              />
              <Input
                label="Password"
                type="password"
                name="senha"
                width={250}
                customStyleInput={
                  'focus:bg-slate-200 indent-1 focus:text-slate-900'
                }
                {...password}
              />
              <div>
                <Button
                  customStyle={`bg-orange-800 hover:bg-slate-500 transition-colors hover:text-slate-800 text-slate-300 py-2 px-8 rounded-lg`}
                >
                  Entrar
                </Button>
              </div>
              <a href="" className="mb-2 text-xs underline text-right">
                Esqueceu a senha?
              </a>
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
