import { ConfigProvider, Rate } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export default function RateButton({ value, pending, onChange }: { value: number; pending: boolean; onChange: (value: number) => void }) {
  return <div className="relative w-full">
    {value > 0 && <button type="button" aria-label="Limpar avaliação" disabled={pending} onClick={() => onChange(0)}
      className="absolute top-2 right-2 rounded-full border border-slate-600 p-1 text-slate-300 disabled:opacity-50"><CloseOutlined /></button>}
    <ConfigProvider theme={{ token: { colorFillContent: 'rgba(255,255,255,0.4)' } }}>
      <Rate allowClear allowHalf value={value} onChange={onChange} disabled={pending} className="py-5" style={{ color: '#7f4cb2', fontSize: 21 }} />
    </ConfigProvider>
  </div>;
}
