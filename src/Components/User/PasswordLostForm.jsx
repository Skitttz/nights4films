import React from 'react';
import Input from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import Head from '../Head';
import Button from '../Forms/Button';
import { useUserContext } from '../../Hooks/useUser';
import { useNavigate } from 'react-router-dom';

const PasswordLostForm = () => {
  const email = useForm('email');
  const { userPasswordLost, loading } = useUserContext();
  const navigator = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    userPasswordLost(email.value);
    navigator('/login');
  }

  return (
    <div className="max-w-5xl grid grid-cols-1 justify-items-center animate-animeLeft mx-auto font-roboto mt-24">
      <Head title=" » " />
      <div className="flex flex-col justify-center py-4 px-8 items-center bg-slate-200 rounded-lg">
        <p className="text-2xl mb-3 font-gabarito">Recuperar Senha</p>
        <form className="" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="text"
            name="email"
            width={250}
            placeholder={'Digite seu email'}
            customStyleDiv={'h-[5.5rem]'}
            customStyleInput={
              'focus:bg-slate-200 indent-1 focus:text-slate-900 '
            }
            {...email}
          />
          {loading ? (
            <Button
              customStyle={
                'p-2 bg-slate-300 rounded-lg mt-2 hover:bg-slate-900 hover:text-slate-300'
              }
              disabled
            >
              Recuperando...
            </Button>
          ) : (
            <Button
              customStyle={
                'p-2 bg-slate-300 rounded-lg mt-2 hover:bg-slate-900 hover:text-slate-300'
              }
            >
              Recuperar
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PasswordLostForm;
