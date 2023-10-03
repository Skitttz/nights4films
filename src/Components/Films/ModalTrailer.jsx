import React from 'react';
import EmbedVideo from './EmbedVideo';

const ModalTrailer = ({ setModal, EmbedId }) => {
  const [isActive, setIsActive] = React.useState(false);
  const borderModal = `relative border-solid border-slate-900 border-t-[42px] rounded-md`;
  const timerTransition = 700;
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function handleOutSideClick(event) {
    if (event.target === event.currentTarget) {
      setIsActive(true);
      setTimeout(() => {
        setModal(false);
      }, timerTransition);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      setIsActive(true);
      setTimeout(() => {
        setModal(false);
      }, timerTransition);
    }
  }
  return (
    <div>
      {setModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 left-0 top-0 w-screen h-screen"
          onClick={handleOutSideClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div
            className={
              isActive
                ? `${borderModal} animate-scaleOut`
                : `${borderModal} animate-scaleItem`
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
              className="absolute block -top-8 right-5 content-exit opacity-50 hover:opacity-100"
              onClick={handleOutSideClick}
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
