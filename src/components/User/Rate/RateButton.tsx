import { ConfigProvider, Rate } from 'antd';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import React from 'react';
import { userAlreadyRatedFilm } from './UserRate';

interface RateButtonProps {
  tokenUserLocal: string;
  films: any;
  login: boolean | null;
  userRateUpdate: (token: string, idRate: any, idFilm: any, newValue: number) => Promise<void>;
  userRateRemove: (token: string, idRate: any) => Promise<void>;
  userRateCreateId: (token: string, idFilm: any, rateValue: number, idUser: any) => Promise<void>;
  data: any;
  sizeIcons: number;
  loading?: boolean;
}

const RateButton = ({
  tokenUserLocal,
  films,
  login,
  userRateUpdate,
  userRateRemove,
  userRateCreateId,
  data,
  sizeIcons,
  loading = false,
}: RateButtonProps) => {
  const [rate, setRate] = React.useState(0);
  const [rateId, setRateId] = React.useState('');
  const [clearRate, setClearRate] = React.useState(false);
  const [existRate, setExistRate] = React.useState<boolean | null>(false);
  const [initLoading, setInitLoading] = React.useState(true);
  const [pending, setPending] = React.useState(false);

  const initAlreadyRated = async () => {
    const resolve = await userAlreadyRatedFilm(
      films,
      login,
      tokenUserLocal,
      setRateId,
      setRate,
    );
    setExistRate(resolve);
    if (existRate) {
      setClearRate(true);
    }
    setInitLoading(false);
  };

  React.useEffect(() => {
    initAlreadyRated();
  }, [existRate, rate]);

  const handleRateClickRemove = async () => {
    if (pending) return;
    const prev = { clearRate, existRate, rate };
    setPending(true);
    setClearRate(false);
    setExistRate(false);
    setRate(0);
    try {
      await userRateRemove(tokenUserLocal, rateId);
    } catch {
      setClearRate(prev.clearRate);
      setExistRate(prev.existRate);
      setRate(prev.rate);
    } finally {
      setPending(false);
    }
  };

  const handleRateClick = async (newRate: number) => {
    setRate(newRate);
    if (existRate === null) {
      return userRateCreateId(
        tokenUserLocal,
        films.data[0].id,
        newRate,
        data.id,
      );
    }
    return userRateUpdate(tokenUserLocal, rateId, films.data[0].id, newRate);
  };
  if (loading || initLoading) {
    return (
      <LoadingOutlined style={{ fontSize: `${sizeIcons}px` }} />
    );
  }

  return (
    <>
      {clearRate && !loading && !initLoading ? (
        <button
          type="button"
          aria-label="Limpar avaliação"
          onClick={handleRateClickRemove}
          disabled={pending}
          className={`absolute top-6 right-2 rounded-full border p-1 transition-colors ${pending
            ? 'bg-slate-700/60 border-slate-600 text-slate-400 cursor-not-allowed'
            : 'bg-slate-800/70 hover:bg-slate-700/80 border-slate-600 text-slate-300'
            }`}
        >
          <CloseOutlined style={{ fontSize: `${Math.max(12, Math.floor(sizeIcons * 0.7))}px` }} />
        </button>
      ) : null}
      <ConfigProvider
        theme={{
          token: {
            colorFillContent: 'rgba(255, 255,255, 0.4)',
          },
        }}
      >
        <Rate
          allowClear={true}
          allowHalf
          value={rate}
          className='py-5'
          onChange={(newRate) => {
            setRate(newRate);
            handleRateClick(newRate);
            setClearRate(newRate > 0);
          }}
          disabled={pending}
          defaultValue={rate}
          style={{
            color: 'rgba(127,76,178)',
            fontSize: `${sizeIcons}px`,
          }}
        />
      </ConfigProvider>
    </>
  );
};

export default RateButton;
