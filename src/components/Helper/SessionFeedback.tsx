import { useUserContext } from '../../hooks/useUser';
import Loading from './Loading';
import QueryFeedback from './QueryFeedback';

export default function SessionFeedback() {
  const { status, error, retrySession } = useUserContext();
  if (status === 'error') return <QueryFeedback error={error} onRetry={retrySession} />;
  return <div role="status" aria-label="Validando sua sessão" className="relative min-h-24 flex justify-center py-8"><Loading /></div>;
}
