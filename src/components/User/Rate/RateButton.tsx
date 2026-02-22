import { ConfigProvider, Rate } from 'antd';
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
}: RateButtonProps) => {
  const [rate, setRate] = React.useState(0);
  const [rateId, setRateId] = React.useState('');
  const [clearRate, setClearRate] = React.useState(false);
  const [existRate, setExistRate] = React.useState<boolean | null>(false);

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
  };

  React.useEffect(() => {
    initAlreadyRated();
  }, [existRate, rate]);

  const handleRateClickRemove = async () => {
    await userRateRemove(tokenUserLocal, rateId).then(() => {
      setClearRate(false);
      setExistRate(false);
      setRate(0);
    });
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
  return (
    <>
      <div
        onClick={async () => {
          handleRateClickRemove();
        }}
        className={` cursor-pointer -top-0 -right-8 content-exit animate-animeLeft ${
          clearRate ? 'absolute' : 'hidden'
        }`}
      ></div>
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
          onChange={(newRate) => {
            setRate(newRate);
            handleRateClick(newRate);
            setClearRate(newRate > 0);
          }}
          defaultValue={rate}
          style={{
            color: 'rgba(127,76,178)',
            fontSize: `${sizeIcons}px`,
          }}
        />
      </ConfigProvider>
      {rate === 0 ? (
        <p className="text-slate-400">Avaliar</p>
      ) : (
        <p className="text-slate-400">Avaliado</p>
      )}
    </>
  );
};

export default RateButton;
