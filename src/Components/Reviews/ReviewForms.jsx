import React from 'react';
import { useUserContext } from '../../Hooks/useUser';
import Button from '../Forms/Button';
import {
  handleKeyDown,
  handleOutSideClick,
  borderModal,
  styleExit,
} from '../Helper/HandleModal';

import { Checkbox, ConfigProvider } from 'antd';

const ReviewForms = ({ setModal, nameFilmReview, dateFilmReview }) => {
  const { login } = useUserContext();
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
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 left-0 top-0 w-screen h-screen "
          onKeyDown={handleKeyDown}
        >
          <div
            className={
              isActive
                ? `${borderModal} border-slate-900 bg-slate-900 animate-scaleOut`
                : `${borderModal} border-slate-900 bg-slate-900 animate-fadeIn`
            }
          >
            <div
              className={`${styleExit}`}
              onClick={handleClick}
              style={{ cursor: 'Pointer' }}
            ></div>
            <section className="mx-auto w-[50vh] cardMD:w-[35vh] font-gabarito">
              <form className="flex flex-col gap-y-4 px-8 mb-6 rounded-md ">
                <div>
                  <p className="text-slate-400 text-lg block">
                    Review do filme...{' '}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-slate-200 text-3xl">{`${nameFilmReview}`}</span>
                  <span className="font-gabarito ml-3 text-base font-extralight text-slate-300 bg-slate-800 rounded-md px-2 inline-block align-middle">{` ${dateFilmReview}`}</span>
                </div>

                <div className=" text-slate-200 p-1 pb-6">
                  <textarea
                    name="bodyReview"
                    id="bodyReview"
                    placeholder="Escreva sua review..."
                    cols="30"
                    rows="10"
                    className="rounded-sm block outline-none focus:outline-blue-700 focus:transition-all  p-2.5 w-full text-slate-900 resize-none focus:ring-blue-500 focus:border-blue-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500	"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorBgContainer: '#374151',
                        colorPrimary: '#6B21A8',
                      },
                    }}
                  >
                    <Checkbox
                      className="font-gabarito text-slate-200"
                      onChange={(e) => e.target.checked}
                    >
                      Contém Spoiler
                    </Checkbox>
                  </ConfigProvider>

                  <Button
                    customStyle={
                      'inline-block bg-purple-900 text-slate-300 hover:bg-purple-800 hover:text-slate-200 px-4 py-2 rounded-md'
                    }
                  >
                    Salvar
                  </Button>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewForms;
