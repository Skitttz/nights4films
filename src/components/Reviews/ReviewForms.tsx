import { Checkbox, ConfigProvider } from 'antd';
import React from 'react';
import { toast } from 'react-toastify';
import { useReviewCreate } from '../../hooks/query/useEngagement';
import { translateErrorMessage } from '../Helper/Translate';
import Button from '../Forms/Button';
import {
  borderModal,
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
  const createReview = useReviewCreate(idFilmReview);
  const submitting = React.useRef(false);
  const [reviewContent, setReviewContent] = React.useState('');
  const [hasSpoiler, setHasSpoiler] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const timerTransition = 700;

  const handleClick = (event: any) => {
    if (submitting.current) return;
    handleOutSideClick(event, setModal, setIsActive, timerTransition);
  };
  React.useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !submitting.current) setModal(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [setModal]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting.current) return;
    const content = reviewContent.trim();
    if (content.length === 0 || content.length > 1000) {
      toast.error('Ops! Sua review está muito grande ou vazia.');
      return;
    }
    submitting.current = true;
    try {
      await createReview.mutateAsync({ content, hasSpoiler });
      toast.success('Review criada com sucesso!');
      setIsActive(false);
      setModal(false);
      setReviewContent('');
      setHasSpoiler(false);
    } catch (error) {
      toast.error(translateErrorMessage(error));
    } finally {
      submitting.current = false;
    }
  }

  return (
    <div>
      <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 left-0 top-0 w-screen h-screen "
        onClick={handleClick}
        role="dialog"
        aria-modal="true"
        aria-label={`Review de ${nameFilmReview}`}
      >
        <div
          className={
            isActive
              ? `${borderModal} border-slate-900 bg-slate-900 animate-scaleOut`
              : `${borderModal} border-slate-900 bg-slate-900 animate-fadeIn`
          }
        >
          <button type="button" aria-label="Fechar review" disabled={createReview.isPending}
            className={`${styleExit}`}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
          />
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
                  maxLength={1000}
                  disabled={createReview.isPending}
                  aria-label="Texto da review"
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
                    checked={hasSpoiler}
                    disabled={createReview.isPending}
                    className="font-gabarito text-slate-200"
                    onChange={(e) => setHasSpoiler(e.target.checked)}
                  >
                    Contém Spoiler
                  </Checkbox>
                </ConfigProvider>

                <Button
                  disabled={createReview.isPending}
                  customStyle={
                    'inline-block bg-purple-900 text-slate-300 hover:bg-purple-800 hover:text-slate-200 px-4 py-2 rounded-md'
                  }
                >
                  {createReview.isPending ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReviewForms;
