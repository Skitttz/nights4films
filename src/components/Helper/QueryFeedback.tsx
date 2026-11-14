import type { ReactNode } from 'react';
import { translateErrorMessage } from './Translate';

export default function QueryFeedback({ error, onRetry, message, title, icon }: {
  error?: unknown; message?: string; onRetry: () => void; title?: string; icon?: ReactNode;
}) {
  return <div role="alert" className="p-6 text-center text-slate-300">
    {icon && <span aria-hidden="true" className="block mb-3 text-4xl text-slate-500">{icon}</span>}
    {title && <p className="font-gabarito text-xl font-medium text-slate-200">{title}</p>}
    <p className={title ? 'mt-1 text-sm text-slate-400' : undefined}>{message ?? translateErrorMessage(error)}</p>
    <button type="button" className="mt-3 rounded-lg border border-slate-600 px-4 py-2 hover:bg-slate-800" onClick={onRetry}>Tentar novamente</button>
  </div>;
}
