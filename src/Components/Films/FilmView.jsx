import React from 'react';
import Head from '../Helper/Head';
import Loading from '../Helper/Loading';
import { randomColor, randomColorHEX } from '../Helper/Colors';
import Markdown from 'https://esm.sh/react-markdown@9';
import { useParams, Link } from 'react-router-dom';
import { Filmes_GET } from '../Api/Api';
import { useUserContext, tokenUserLocal } from '../../Hooks/useUser';
import { toast } from 'react-toastify';
import { userAlreadyLiked, userContainsLikeId } from '../User/Like/UserLike';
import LikeButton from '../User/Like/LikeButton';
import {
  userAlreadyListedFilm,
  userContainsFilmInWatchListId,
} from '../User/WatchList/UserWatchList';
import WatchListButton from '../User/WatchList/WatchListButton';
import WatchButton from '../User/Watch/WatchButton';
import { userAlreadyWatchedFilm } from '../User/Watch/UserWatch';
import ReviewForms from '../Reviews/ReviewForms';
import ReviewFeedByFilm from '../Reviews/ReviewFeedByFilm';
import RateButton from '../User/Rate/RateButton';
import ModalTrailer from './ModalTrailer';
import useWindowDimensions from '../../Hooks/useWindowDimension';

const FilmView = () => {
  const [films, setFilms] = React.useState(null);
  const {
    login,
    data,
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

  // Rate
  const refLiRate = React.useRef(null);
  const divDescriptionFilmRef = React.useRef(null);
  const pRef = React.useRef(null);

  //Modal
  const [activeModal, setActiveModal] = React.useState(false);
  const { width } = useWindowDimensions();

  React.useEffect(() => {
    const ruleSlug = `/filmes?filters[slug][$eq]`;
    const populateAll = `populate=*`;
    Filmes_GET(`${ruleSlug}=${id}&${populateAll}`)
      .then((data) => {
        setFilms(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar filmes:', error);
      });
  }, [id]);

  React.useEffect(() => {
    userAlreadyLiked(films, login, tokenUserLocal, setLikedId, setLiked);
    userAlreadyListedFilm(
      films,
      login,
      tokenUserLocal,
      setWatchListId,
      setWatchList,
    );
    userAlreadyWatchedFilm(films, login, tokenUserLocal, setWatchId, setWatch);
    const randomColorValueOne = randomColor();
    const randomColorValueTwo = randomColor();
    const randomColorHexOne = randomColorHEX();
    if (films) {
      pRef.current.style.boxShadow = `0px 0px 4px 2px rgba(${randomColorValueOne},30,${randomColorValueTwo}, 1)`;
      divDescriptionFilmRef.current.style.boxShadow = `0px 0px 2px -1px ${randomColorHexOne}`;
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
        return open(
          `https://www.youtube.com/watch?v=${films?.data[0]?.attributes.trailer}`,
        );
      },
    },
    { title: 'Compartilhar', onClick: () => clipboardFilmURL() },
  ];

  const sizeIcons = 21;

  return (
    <>
      <div>
        {activeModal ? (
          <ModalTrailer
            key={activeModal}
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

            <div className="mt-12 grid grid-cols-2 grid-rows-[auto,1fr] gap-y-8 content-center justify-items-center items-start animate-fadeIn max-w-7xl lg:max-w-5xl font-gabarito cardMD:grid-cols-1 cardMD:p-8 ">
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
                  <p className="text-slate-400 mt-3 mx-auto text-normal px-2 text-justify font-gabarito hover:text-slate-300 animate-fadeIn transition-colors py-1 ml-2">
                    {films.data[0].attributes.description}
                  </p>
                </div>
              </div>
              {login ? (
                <div className="col-span-full font-gabarito content-center justify-items-center max-w-7xl lg:max-w-5xl h-16 cardMD:h-[auto] cardMD:p-4 tm:p-2 bg-transparent border border-blue-950 text-slate-300 rounded-lg flex justify-start items-center cardMD:mx-auto">
                  <div className="cardMD:mx-8 tm:mx-1 grid grid-cols-[1fr,1fr] cardMD:grid-cols-1 tm:grid-cols-2 tm:items-center tm:gap-x-4  cardMD:gap-y-4  justify-between cardMD:justify-center mx-auto grid-row-1 ">
                    <ul className="pl-8 flex justify-center tm:flex-col tm:gap-y-4 gap-x-8 cardMD:mx-auto my-auto text-center">
                      <li
                        className="cursor-pointer "
                        onClick={() => setWatch(!watch)}
                      >
                        <WatchButton
                          watch={watch}
                          watchId={watchId}
                          tokenUserLocal={tokenUserLocal}
                          films={films}
                          userContainsFilmInWatchListId={
                            userContainsFilmInWatchListId
                          }
                          userWatchedUpdate={userWatchedUpdate}
                          userWatchedRemove={userWatchedRemove}
                          userWatchedCreateId={userWatchedCreateId}
                          data={data}
                          sizeIcons={sizeIcons}
                        />
                      </li>
                      <li
                        className="cursor-pointer "
                        onClick={() => setLiked(!like)}
                      >
                        <LikeButton
                          like={like}
                          likeId={likeId}
                          tokenUserLocal={tokenUserLocal}
                          films={films}
                          userContainsLikeId={userContainsLikeId}
                          userLikeFilmUpdate={userLikeFilmUpdate}
                          userLikeFilmRemove={userLikeFilmRemove}
                          userLikeFilmCreateId={userLikeFilmCreateId}
                          data={data}
                          sizeIcons={sizeIcons}
                        />
                      </li>
                      <li
                        className="cursor-pointer "
                        onClick={() => setWatchList(!watchList)}
                      >
                        <WatchListButton
                          watchList={watchList}
                          watchListId={watchListId}
                          tokenUserLocal={tokenUserLocal}
                          films={films}
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
                        className="mr-12 cardMD:mr-0 relative "
                        ref={refLiRate}
                      >
                        {/*ConfigProvider lib React Rate */}
                        <RateButton
                          tokenUserLocal={tokenUserLocal}
                          films={films}
                          login={login}
                          userRateUpdate={userRateUpdate}
                          userRateRemove={userRateRemove}
                          userRateCreateId={userRateCreateId}
                          data={data}
                          sizeIcons={sizeIcons}
                        />
                      </li>
                    </ul>
                    <ul className="flex text-center tm:flex-col justify-center gap-x-4 tm:gap-y-3 items-center text-slate-300 cardMD:mx-auto  ">
                      {actions.map((action, index) => (
                        <li
                          key={index}
                          className="w-[7rem] lg:w-[7rem]  px-2 py-2 tm:p-2 tm:text-center rounded-md bg-[rgba(47,66,178)] hover:bg-[rgba(46,38,178)] cursor-pointer transition-colors"
                          onClick={action.onClick}
                        >
                          {action.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="mt-12"></div>
              )}
              {login ? (
                <div className="text-slate-400 inline-block mr-auto w-full col-span-full">
                  <div className="mb-24">
                    <p className="border-b border-b-slate-900 text-lg rounded-sm mt-8 mb-8">
                      Reviews Recentes de {` `}
                      <span className="text-slate-200 text-xl font-semibold">
                        {films.data[0].attributes.title}
                      </span>
                    </p>
                    <ReviewFeedByFilm
                      tokenUser={tokenUserLocal}
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
                      li: ({ ordered, index, ...props }) => (
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
            key={modalReview}
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
