import { FieldTimeOutlined } from '@ant-design/icons';

export default function WatchListButton({ active, pending, onToggle }: { active: boolean; pending: boolean; onToggle: () => void }) {
  return <button type="button" aria-label="Adicionar filme à lista" aria-pressed={active} disabled={pending} onClick={onToggle}
    className="flex w-full flex-col items-center justify-center gap-1 py-5 disabled:opacity-50">
    <FieldTimeOutlined style={{ color: active ? '#b6ed12' : undefined, fontSize: 21 }} />
    <span className="text-slate-400">{active ? 'Adicionado' : 'Assistir Depois'}</span>
  </button>;
}
