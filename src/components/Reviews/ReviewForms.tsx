import { Checkbox, ConfigProvider } from 'antd';
import React from 'react';
import { tokenUserLocal, useUserContext } from '../../hooks/useUser';
import Button from '../Forms/Button';
import {
  borderModal,
  handleKeyDown,
  handleOutSideClick,
  styleExit,
} from '../Helper/HandleModal';

interface ReviewFormsProps {
  setModal: (value: boolean) => void;
  idFilmReview: string | number;
  nameFilmReview: string;
  dateFilmReview: string;
  photoFilmReview: string;
}

const ReviewForms = ({
  setModal,
  idFilmReview,
  nameFilmReview,
  dateFilmReview,
  photoFilmReview,
}: ReviewFormsProps) => {
  const { login, data, userCreateReview } = useUserContext();
  const [reviewContent, setReviewContent] = React.useState('');
  const [hasSpoiler, setHasSpoiler] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const timerTransition = 700;

  const handleKey = (event: any) => {
    handleKeyDown(event, setModal, setIsActive, timerTransition);
  };

  const handleClick = (event: any) => {
    handleOutSideClick(event, setModal, setIsActive, timerTransition);
  };
  React.useEffect(() => {
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (tokenUserLocal && reviewContent.length > 0 && reviewContent.length < 1000) {
      userCreateReview(
        tokenUserLocal,
        reviewContent,
        idFilmReview,
        data.id,
        hasSpoiler,
      );
      alert('Review criada com sucesso');
      setIsActive(false);
      setModal(false);
      location.reload();
    } else {
      alert('Ops! Sua review está muito grande ou vazia.');
    }
  }

  return (
    <div>
      {setModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 left-0 top-0 w-screen h-screen "
          onKeyDown={handleKeyDown as any}
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
              style={{ cursor: 'pointer' }}
            ></div>
            <section className="mx-auto grid grid-cols-[100px,1fr] cardMD:grid-cols-1 w-[50vh] cardMD:w-[35vh] font-gabarito">
              <div>
                <img
                  className="ml-9 w-[80px] h-[360px] object-cover mx-auto rounded-lg opacity-60 mb-4 
                  cardMD:h-[auto] cardMD:overflow-hidden cardMD:opacity-90 cardMD:ml-0 cardMD:p-4 cardMD:rounded-s-full"
                  src={photoFilmReview}
                  alt=""
                />
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-y-4 px-8 mb-6 rounded-md "
              >
                <div>
                  <p className="text-slate-400 text-lg block">
                    Review do filme...{' '}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-slate-200 text-3xl">{`${nameFilmReview}`}</span>
                  <span className="font-gabarito ml-3 text-base font-extralight text-slate-300 bg-slate-800 rounded-md px-2 inline-block align-middle">{` ${dateFilmReview}`}</span>
                </div>

                <div className=" text-slate-200 p-1">
                  <textarea
                    autoFocus={true}
                    required={true}
                    name="reviewBody"
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    id="reviewBody"
                    placeholder="Escreva sua review..."
                    cols={30}
                    rows={10}
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
                      onChange={(e) => setHasSpoiler(e.target.checked)}
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
