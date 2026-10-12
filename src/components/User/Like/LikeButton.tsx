import { HeartFilled, HeartOutlined } from '@ant-design/icons';

export default function LikeButton({ active, pending, onToggle }: { active: boolean; pending: boolean; onToggle: () => void }) {
  return <button type="button" aria-label="Curtir filme" aria-pressed={active} disabled={pending} onClick={onToggle}
    className="flex w-full flex-col items-center justify-center gap-1 py-5 disabled:opacity-50">
    {active ? <HeartFilled style={{ color: '#a51f1f', fontSize: 21 }} /> : <HeartOutlined style={{ fontSize: 21 }} />}
    <span className="text-slate-400">{active ? 'Liked' : 'Like'}</span>
  </button>;
}
