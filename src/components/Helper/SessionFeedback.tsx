import { useUserContext } from '../../hooks/useUser';
import Loading from './Loading';
import QueryFeedback from './QueryFeedback';

export default function SessionFeedback() {
  const { status, retrySession } = useUserContext();
  if (status === 'error') return <QueryFeedback message="A conexão com o servidor está indisponível. Tente novamente em instantes." onRetry={retrySession} />;
  return <div role="status" aria-label="Validando sua sessão" className="relative min-h-24 flex justify-center py-8"><Loading /></div>;
}
