import React from 'react';
import Markdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Filmes_GET } from '../api/index';
import ModalTrailer from '../components/Films/ModalTrailer';
import { randomColor, randomColorHEX } from '../components/Helper/Colors';
import Head from '../components/Helper/Head';
import Loading from '../components/Helper/Loading';
import ReviewFeedByFilm from '../components/Reviews/ReviewFeedByFilm';
import ReviewForms from '../components/Reviews/ReviewForms';
import LikeButton from '../components/User/Like/LikeButton';
import {
  userAlreadyLiked,
  userContainsLikeId,
} from '../components/User/Like/UserLike';
import RateButton from '../components/User/Rate/RateButton';
import { userAlreadyWatchedFilm, userContainsFilmInWatchedId } from '../components/User/Watch/UserWatch';
import WatchButton from '../components/User/Watch/WatchButton';
import {
  userAlreadyListedFilm,
  userContainsFilmInWatchListId,
} from '../components/User/WatchList/UserWatchList';
import WatchListButton from '../components/User/WatchList/WatchListButton';
import { tokenUserLocal, useUserContext } from '../hooks/useUser';
import useWindowDimensions from '../hooks/useWindowDimension';

const FilmView = () => {
  const [films, setFilms] = React.useState<any>(null);
  const {
    login,
    data,
    loading,
    userLikeFilmCreateId,
    userLikeFilmUpdate,
    userLikeFilmRemove,
    userListFilmCreateId,
    userListFilmUpdate,
    userListFilmRemove,
    userWatchedCreateId,
    userWatchedUpdate,
    userWatchedRemove,
    userRateCreateId,
    userRateUpdate,
    userRateRemove,
  } = useUserContext();

  // All const example & const exampleId, example -> value insert for user , exampleId -> Reference Id this element
  //ID Film
  const { id } = useParams();

  //Modal Review
  const [modalReview, setModalReview] = React.useState(false);

  // Watch
  const [watchId, setWatchId] = React.useState('');
  const [watch, setWatch] = React.useState(false);

  // Like
  const [likeId, setLikedId] = React.useState('');
  const [like, setLiked] = React.useState(false);

  // Watchlist
  const [watchListId, setWatchListId] = React.useState('');
  const [watchList, setWatchList] = React.useState(false);

  // Loading de engajamento
  const [engagementLoading, setEngagementLoading] = React.useState(false);

  // Rate
  const refLiRate = React.useRef<HTMLLIElement>(null);
  const divDescriptionFilmRef = React.useRef<HTMLDivElement>(null);
  const pRef = React.useRef<HTMLParagraphElement>(null);

  //Modal
  const [activeModal, setActiveModal] = React.useState(false);
  const { width } = useWindowDimensions();

  React.useEffect(() => {
    const ruleSlug = '/filmes?filters[slug][$eq]';
    const populateAll = 'populate=*';
    Filmes_GET(`${ruleSlug}=${id}&${populateAll}`)
      .then((data: any) => {
        setFilms(data);
      })
      .catch((error: any) => {
        console.error('Erro ao buscar filmes:', error);
      });
  }, [id]);

  React.useEffect(() => {
    if (!tokenUserLocal) return;
    let mounted = true;
    const initEngagement = async () => {
      if (!tokenUserLocal) return;
      setEngagementLoading(true);
      try {
        await Promise.all([
          userAlreadyLiked(films, login, tokenUserLocal, setLikedId, setLiked),
          userAlreadyListedFilm(
            films,
            login,
            tokenUserLocal,
            setWatchListId,
            setWatchList,
          ),
          userAlreadyWatchedFilm(
            films,
            login,
            tokenUserLocal,
            setWatchId,
            setWatch,
          ),
        ]);
      } finally {
        if (mounted) setEngagementLoading(false);
      }
    };
    initEngagement();
    return () => {
      mounted = false;
    };
  }, [films, login]);

  React.useEffect(() => {
    const randomColorValueOne = randomColor();
    const randomColorValueTwo = randomColor();
    const randomColorHexOne = randomColorHEX();
    if (films) {
      if (pRef.current) {
        pRef.current.style.boxShadow = `0px 0px 4px 2px rgba(${randomColorValueOne},30,${randomColorValueTwo}, 1)`;
      }
      if (divDescriptionFilmRef.current) {
        divDescriptionFilmRef.current.style.boxShadow = `0px 0px 2px -1px ${randomColorHexOne}`;
      }
    }
  }, [films]);

  function clipboardFilmURL() {
    const { href } = window.location;
    navigator.clipboard.writeText(href);
    toast.success('Link copiado com sucesso!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }

  const actions = [
    { title: 'Criar Review', onClick: () => setModalReview(!modalReview) },
    {
      title: 'Trailer',
      onClick: () => {
        if (width > 1000) {
          return setActiveModal(true);
        }
        return window.open(
          `https://www.youtube.com/watch?v=${films?.data[0]?.attributes.trailer}`,
        );
      },
    },
    { title: 'Compartilhar', onClick: () => clipboardFilmURL() },
  ];

  const sizeIcons = 21;
  const isAuthenticated = login === true && tokenUserLocal
  return (
    <>
      <div>
        {activeModal ? (
          <ModalTrailer
            key={activeModal ? 'active' : 'inactive'}
            setModal={setActiveModal}
            EmbedId={films?.data[0]?.attributes.trailer}
          />
        ) : (
          ''
        )}
      </div>
      <div>
        {films ? (
          <div
            className="grid justify-center bg-slate-950 mt-6 animate-animeLeft xl:px-4 lg:px-4 cardMD:px-4"
            key={films.data[0].id}
          >
            <Head
              title={` » ${films.data[0].attributes.title}`}
              description="Pagina do filme"
            />

            <div className="mt-12 grid grid-cols-2 grid-rows-[auto,1fr] gap-y-8 content-center justify-items-center items-start animate-fadeIn max-w-7xl lg:max-w-5xl font-gabarito cardMD:grid-cols-1 cardMD:p-2">
              <div>
                <img
                  className="w-auto h-auto bg-contain rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] "
                  src={`${films.data[0].attributes.photo_description.data.attributes.url}`}
                  alt=""
                />
              </div>
              <div
                ref={divDescriptionFilmRef}
                className="px-3 pt-3 rounded-br-lg h-full cardMD:pb-3"
              >
                <div className="text-center ">
                  <p
                    ref={pRef}
                    className={`inline-block items-center text-slate-200 text-4xl p-4 border border-slate-300 border-opacity-10 rounded-xl hover:animate-pulse`}
                  >
                    {films.data[0].attributes.title}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400 mt-3 mx-auto text-normal px-2 tm:ml-0 tm:px-0 text-justify font-gabarito hover:text-slate-300 animate-fadeIn transition-colors py-1 ml-2">
                    {films.data[0].attributes.description}
                  </p>
                </div>
              </div>
              {isAuthenticated ? (
                <div className="col-span-full w-full max-w-7xl lg:max-w-5xl font-gabarito">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm text-slate-200 shadow-md px-5 py-4 tm:px-4 tm:py-3 cardMD:px-4 cardMD:py-3">
                    <ul
                      className={`grid grid-cols-4 cardMD:grid-cols-2 sm:grid-cols-1 tm:grid-cols-1 gap-4 cardMD:gap-3 tm:gap-3 items-stretch tm:items-center  auto-rows-fr ${engagementLoading ? 'animate-pulse' : ''}`}
                      role="group"
                      aria-label="Ações do usuário"
                    >
                      <li
                        className={`h-full group relative cursor-pointer w-full flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900/40 shadow-sm transition-all duration-200 hover:bg-slate-800/50 hover:shadow-[0_0_0_2px_rgba(10,241,95,0.418)] focus-within:ring-2 focus-within:ring-green-700 ${engagementLoading ? 'pointer-events-none opacity-60' : ''}`}
                        onClick={() => {
                          if (!engagementLoading) setWatch(!watch);
                        }}
                      >
                        <WatchButton
                          watch={watch}
                          watchId={watchId}
                          tokenUserLocal={tokenUserLocal as string}
                          films={films}
                          loading={engagementLoading}
                          userContainsFilmInWatchedId={userContainsFilmInWatchedId}
                          userWatchedUpdate={userWatchedUpdate}
                          userWatchedRemove={userWatchedRemove}
                          userWatchedCreateId={userWatchedCreateId}
                          data={data}
                          sizeIcons={sizeIcons}
                        />
                      </li>
                      <li
                        className={`h-full group relative cursor-pointer w-full flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900/40 shadow-sm transition-all duration-200 hover:bg-slate-800/50 hover:shadow-[0_0_0_2px_rgba(244,63,94,0.25)] focus-within:ring-2 focus-within:ring-pink-400 ${engagementLoading ? 'pointer-events-none opacity-60' : ''}`}
                        onClick={() => {
                          if (!engagementLoading) setLiked(!like);
                        }}
                      >
                        <LikeButton
                          like={like}
                          likeId={likeId}
                          tokenUserLocal={tokenUserLocal as string}
                          films={films}
                          loading={engagementLoading}
                          userContainsLikeId={userContainsLikeId}
                          userLikeFilmUpdate={userLikeFilmUpdate}
                          userLikeFilmRemove={userLikeFilmRemove}
                          userLikeFilmCreateId={userLikeFilmCreateId}
                          data={data}
                          sizeIcons={sizeIcons}
                        />
                      </li>
                      <li
                        className={`h-full group relative cursor-pointer w-full flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900/40 shadow-sm transition-all duration-200 hover:bg-slate-800/50 hover:shadow-[0_0_0_2px_rgba(34,197,94,0.25)] focus-within:ring-2 focus-within:ring-green-400 ${engagementLoading ? 'pointer-events-none opacity-60' : ''}`}
                        onClick={() => {
                          if (!engagementLoading) setWatchList(!watchList);
                        }}
                      >
                        <WatchListButton
                          watchList={watchList}
                          watchListId={watchListId}
                          tokenUserLocal={tokenUserLocal as string}
                          films={films}
                          loading={engagementLoading}
                          userContainsFilmInWatchListId={
                            userContainsFilmInWatchListId
                          }
                          userListFilmUpdate={userListFilmUpdate}
                          userListFilmRemove={userListFilmRemove}
                          userListFilmCreateId={userListFilmCreateId}
                          data={data}
                          sizeIcons={sizeIcons}
                        />
                      </li>
                      <li
                        className="h-full relative overflow-hidden w-full flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900/40 shadow-sm transition-all duration-200 hover:bg-slate-800/50 hover:shadow-[0_0_0_2px_rgba(129,140,248,0.25)] focus-within:ring-2 focus-within:ring-indigo-500"
                        ref={refLiRate}
                      >
                        <RateButton
                          tokenUserLocal={tokenUserLocal as string}
                          films={films}
                          login={login}
                          loading={engagementLoading}
                          userRateUpdate={userRateUpdate}
                          userRateRemove={userRateRemove}
                          userRateCreateId={userRateCreateId}
                          data={data}
                          sizeIcons={sizeIcons}
                        />
                      </li>
                    </ul>
                    <ul className="mt-5 flex flex-wrap gap-3 items-center justify-center text-slate-300 cardMD:grid cardMD:grid-cols-3 cardMD:gap-4 tm:grid-cols-1 cardMD:justify-center tm:grid tm:gap-4 tm:justify-center">
                      {actions.map((action, index) => (
                        <li
                          key={index}
                          className="px-3 py-2 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-slate-700/60 hover:border-slate-500 text-sm font-medium cursor-pointer  transition-colors duration-200 shadow-sm min-w-[7rem] text-center"
                          onClick={action.onClick}
                        >
                          {action.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : login === false ? (
                <div className="mt-12 tm:mt-0"></div>
              ) : (
                <Loading />
              )}
              {isAuthenticated ? (
                <div className="text-slate-400 inline-block mr-auto w-full col-span-full">
                  <div className="mb-24">
                    <p className="border-b border-b-slate-900 text-lg rounded-sm mt-8 mb-8">
                      Reviews Recentes de {` `}
                      <span className="text-slate-200 text-xl font-semibold">
                        {films.data[0].attributes.title}
                      </span>
                    </p>
                    <ReviewFeedByFilm
                      tokenUser={tokenUserLocal as string}
                      FilmId={films.data[0].id}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-slate-400 inline-block mr-auto w-full col-span-full">
                  <div className="">
                    <p className="border-b border-b-slate-900 text-lg rounded-sm mt-8 mb-8">
                      Reviews Recentes de {` `}
                      <span className="text-slate-200 text-xl font-semibold">
                        {films.data[0].attributes.title}
                      </span>
                    </p>
                    <div className="flex justify-center p-12 ">
                      <h3 className="font-thin text-slate-300 border-b border-b-indigo-950 p-2 rounded-lg">
                        <Link to={'/login'}>
                          {' '}
                          <span className="font-medium text-orange-200 underline">
                            Acesse
                          </span>
                        </Link>{' '}
                        ou{' '}
                        <Link to={'/login/register'}>
                          <span className="font-medium text-blue-200 underline">
                            {' '}
                            Crie
                          </span>
                        </Link>{' '}
                        sua conta para conseguir ver as reviews dos usuários
                      </h3>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-span-full bg-gray-950 px-6 rounded-lg shadow-[rgba(55,44,_255,_1.3)_0px_0px_2px]  mb-20 ">
                <p
                  className={`inline-block mr-auto text-slate-200 text-3xl p-4 border border-slate-300 border-opacity-10 rounded-xl mt-5 cardMD:text-center `}
                >
                  {`Curiosidades sobre ${films.data[0].attributes.title}`}
                </p>

                <div className="text-slate-300 whitespace-pre-line text-lg">
                  <Markdown
                    components={{
                      li: ({ ordered, index, ...props }: any) => (
                        <li {...props}>
                          {ordered ? `${index + 1}.` : '―'} {props.children}
                        </li>
                      ),
                    }}
                  >{`${films.data[0].attributes.curiosities}`}</Markdown>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
      <div>
        {modalReview ? (
          <ReviewForms
            key={modalReview ? 'review' : 'no-review'}
            setModal={setModalReview}
            nameFilmReview={films.data[0].attributes.title}
            dateFilmReview={films.data[0].attributes.year}
            photoFilmReview={
              films.data[0].attributes.photo_description.data.attributes.url
            }
            idFilmReview={films.data[0].id}
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default FilmView;
