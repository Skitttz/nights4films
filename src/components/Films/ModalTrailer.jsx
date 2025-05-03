import React from 'react';
import EmbedVideo from './EmbedVideo';
import {
  handleKeyDown,
  handleOutSideClick,
  borderModal,
  styleExit,
} from '../Helper/HandleModal';
const ModalTrailer = ({ setModal, EmbedId }) => {
  const [isActive, setIsActive] = React.useState(false);
  const timerTransition = 700;

  const handleKey = (event) => {
    handleKeyDown(event, setModal, setIsActive, timerTransition);
  };

  const handleClick = (event) => {
    handleOutSideClick(event, setModal, setIsActive, timerTransition);
  };
  React.useEffect(() => {
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div>
      {setModal && (
        <div
          className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-80 left-0 top-0 w-screen h-screen"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div
            className={
              isActive
                ? `${borderModal} border-slate-900 animate-scaleOut`
                : `${borderModal} border-slate-900 animate-scaleItem`
            }
          >
            <div className="absolute block -top-9 left-3">
              <p className="font-gabarito font-thin text-xl text-gray-200 ">
                Nights
                <span className="text-[rgba(107,66,178)] p-0.5 px-2 bg-transparent rounded-lg mx-1 font-limelight font-bold shadow-[0px_2px_0px_0px_rgba(107,66,178)]">
                  4
                </span>
                <span className="font-gabarito">Films</span>
              </p>
            </div>
            <div
              className={`${styleExit}`}
              onClick={handleClick}
              style={{ cursor: 'Pointer' }}
            ></div>
            {EmbedId && <EmbedVideo embedId={EmbedId} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalTrailer;
