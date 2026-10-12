import { EyeFilled, EyeOutlined } from '@ant-design/icons';

export default function WatchButton({ active, pending, onToggle }: { active: boolean; pending: boolean; onToggle: () => void }) {
  return <button type="button" aria-label="Marcar filme como assistido" aria-pressed={active} disabled={pending} onClick={onToggle}
    className="flex w-full flex-col items-center justify-center gap-1 py-5 disabled:opacity-50">
    {active ? <EyeFilled style={{ color: '#91c483', fontSize: 21 }} /> : <EyeOutlined style={{ fontSize: 21 }} />}
    <span className="text-slate-400">{active ? 'Assistido' : 'Assistir'}</span>
  </button>;
}
