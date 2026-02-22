import React from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { useUserContext } from '../../hooks/useUser';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Head from '../Helper/Head';
import { toast } from 'react-toastify';

const PasswordLostForm = () => {
  const email = useForm('email');
  const { userPasswordLost, loading } = useUserContext();
  const navigator = useNavigate();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const isValid = email.validate();
    if (!isValid) {
      toast.error('Preencha um e-mail válido.', { theme: 'dark' });
      return;
    }
    await userPasswordLost(email.value);
    toast.success('Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha. Verifique Caixa de Entrada e Spam.', { theme: 'dark' });
    setTimeout(() => navigator('/login'), 1500);
  }

  return (
    <section className="animate-animeLeft max-w-md sm:max-w-lg mx-auto px-4">
      <Head title=" » Recuperar Senha" description="Recover Password" />
      <div className="grid justify-center mt-12">
        <p className="text-3xl sm:text-4xl font-gabarito text-[rgba(107,70,178)] font-bold mb-4 border-b-gray-700 rounded-lg">
          Recuperar Senha
        </p>
        <form className="bg-slate-200 px-6 sm:px-8 py-6 rounded-xl flex flex-col gap-y-4 font-roboto shadow-[0_8px_20px_rgba(0,0,0,0.25)]" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            width={'100%'}
            height={'48px'}
            placeholder={'Digite seu email'}
            customStyleDiv={'h-[auto]'}
            customStyleInput={'tm:w-full tm:indent-0 focus:ring-2 focus:ring-purple-700'}
            {...email}
          />
          <p className="text-xs text-slate-600">
            Por segurança, não informamos se um e-mail está cadastrado. Caso não receba em alguns minutos, solicite novamente.
          </p>
          <div className="flex flex-col justify-center items-center font-semibold font-gabarito text-lg">
            {loading ? (
              <Button disabled customStyle="h-12 w-full bg-purple-900 text-white rounded-lg">
                Enviando...
              </Button>
            ) : (
              <Button disabled={!email.value} customStyle="h-12 w-full bg-purple-900 hover:bg-purple-800 transition-colors text-white rounded-lg active:scale-[.99] px-4">
                Enviar instruções por e-mail
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default PasswordLostForm;
