import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { useUserContext } from '../../hooks/useUser';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Error from '../Helper/Error';
import Head from '../Helper/Head';
import { toast } from 'react-toastify';

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const codeParam = searchParams.get('code') || '';

  const password = useForm('password');
  const confirm = useForm('password');
  const { userPasswordReset, loading, error } = useUserContext();
  const hasEmptyCode = codeParam.length === 0;
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const isPasswordValid = password.validate();
    const isConfirmValid = confirm.validate();
    const isMatch = password.value === confirm.value;
    if (!isMatch) {
      confirm.setValue(confirm.value); // trigger re-render
      return toast.error('As senhas não coincidem.', { theme: 'dark' });
    }
    if (isPasswordValid && isConfirmValid && codeParam.length > 0) {
      await userPasswordReset(codeParam, password.value, confirm.value);
      if (!error) {
        toast.success('Senha alterada com sucesso!', { theme: 'dark' });
        setTimeout(() => navigate('/login'), 2000);
      }
    }
  }

  return (
    <section className="animate-animeLeft max-w-md sm:max-w-lg mx-auto px-4">
      <Head title=" » Redefinir Senha" description="Reset Password Page" />
      <div className="grid justify-center mt-12">
        <h1 className="text-3xl sm:text-4xl font-gabarito text-[rgba(107,70,178)] font-bold mb-4 border-b border-b-1 border-b-gray-700 rounded-lg">
          Redefinir Senha
        </h1>
        <form
          className="bg-slate-200 px-6 sm:px-8 py-6 rounded-xl flex flex-col gap-y-4 font-roboto shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
          onSubmit={handleSubmit}
        >
          <Input
            label="Nova senha"
            type="password"
            name="new_password"
            autoComplete="new-password"
            customStyleInput={'tm:w-full tm:indent-0 focus:ring-2 focus:ring-purple-700'}
            customStyleDiv={'h-[auto]'}
            width={'100%'}
            height={'48px'}
            {...password}
          />
          <Input
            label="Confirmar senha"
            type="password"
            name="confirm_password"
            autoComplete="new-password"
            customStyleInput={'tm:w-full tm:indent-0 focus:ring-2 focus:ring-purple-700'}
            customStyleDiv={'h-[auto]'}
            width={'100%'}
            height={'48px'}
            {...confirm}
          />
          {hasEmptyCode ? (
            <div className="text-sm text-red-700">
              Link inválido.
            </div>
          ) : null}
          <div className="flex flex-col justify-center items-center font-bold font-gabarito text-lg mt-2">
            {loading ? (
              <Button disabled customStyle="h-12 w-full bg-purple-900 text-white rounded-lg">
                Redefinindo...
              </Button>
            ) : (
              <Button customStyle="h-12 w-full bg-purple-900 hover:bg-purple-800 transition-colors text-white rounded-lg active:scale-[.99]">
                Redefinir
              </Button>
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

export default ResetPasswordForm;
