import { translateErrorMessage } from './Translate';

export default function QueryFeedback({ error, onRetry, message }: {
  error?: unknown; message?: string; onRetry: () => void;
}) {
  return <div role="alert" className="p-6 text-center text-slate-300">
    <p>{message ?? translateErrorMessage(error)}</p>
    <button type="button" className="mt-3 rounded-lg border border-slate-600 px-4 py-2 hover:bg-slate-800" onClick={onRetry}>Tentar novamente</button>
  </div>;
}
