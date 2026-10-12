import { ConfigProvider, Rate } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styles from './RateButton.module.css';

export default function RateButton({ value, pending, onChange }: { value: number; pending: boolean; onChange: (value: number) => void }) {
  return <div className="flex min-w-0 w-full flex-col items-center justify-center gap-1 px-1 py-5">
    <ConfigProvider theme={{ components: { Rate: { starColor: '#7f4cb2', starBg: 'rgba(255,255,255,0.4)', starSize: 20 } } }}>
      <Rate aria-label="Avaliação do filme" allowClear allowHalf value={value} onChange={onChange} disabled={pending} className={styles.stars} />
    </ConfigProvider>
    <div className="flex items-center justify-center gap-1.5 text-slate-400">
      <span>Sua nota</span>
      <button type="button" aria-label="Limpar avaliação" title="Limpar avaliação" disabled={pending || value === 0} onClick={() => onChange(0)}
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-600 text-slate-300 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">
        <CloseOutlined style={{ fontSize: 11 }} />
      </button>
    </div>
  </div>;
}
