
const PasswordSecurity = ({ children }: { children: string }) => {
  const validateTL = children.length >= 8 && children.length <= 64;
  const validateSC = /[^A-Za-z0-9]/.test(children);
  const validateLW = /[a-z]/.test(children);
  const validateUC = /[A-Z]/.test(children);
  const validateNC = /[0-9]/.test(children);

  return (
    <div
      className="animate-animeDown tm:text-xs"
      style={{ fontWeight: '550', marginBottom: '.8rem' }}
    >
      <p>
        {validateTL
          ? '✔️ Requisito atendido: 8 a 64 caracteres.'
          : '❌ A senha deve ter entre 8 e 64 caracteres.'}
      </p>
      <p>
        {validateUC
          ? '✔️ Requisito atendido: letra maiúscula.'
          : '❌ Inclua ao menos uma letra maiúscula.'}
      </p>
      <p>
        {validateLW
          ? '✔️ Requisito atendido: letra minúscula.'
          : '❌ Inclua ao menos uma letra minúscula.'}
      </p>
      <p>{validateNC ? '✔️ Requisito atendido: número.' : '❌ Inclua ao menos um número.'}</p>
      <p>
        {validateSC
          ? '✔️ Requisito atendido: símbolo.'
          : '❌ Inclua ao menos um símbolo.'}
      </p>
    </div>
  );
};

export default PasswordSecurity;
