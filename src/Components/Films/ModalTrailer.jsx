import React from 'react';
import EmbedVideo from './EmbedVideo';

const ModalTrailer = ({ setModal, EmbedId }) => {
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function handleOutSideClick(event) {
    if (event.target === event.currentTarget) {
      setModal(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      setModal(false);
    }
  }
  return (
    <div>
      {setModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-9999 bg-black bg-opacity-40 left-0 top-0 w-screen h-screen"
          onClick={handleOutSideClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {EmbedId && <EmbedVideo embedId={EmbedId} />}
        </div>
      )}
    </div>
  );
};

export default ModalTrailer;
