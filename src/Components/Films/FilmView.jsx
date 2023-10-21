import React from 'react';
import { useParams } from 'react-router-dom';
import { Filmes_GET } from '../Api/Api';
import Head from '../Helper/Head';
import Loading from '../Helper/Loading';
import Markdown from 'https://esm.sh/react-markdown@9';
import { Rate, ConfigProvider } from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  EyeOutlined,
  EyeFilled,
  FieldTimeOutlined,
} from '@ant-design/icons';
import ReviewForms from '../Reviews/ReviewForms';
import { toast } from 'react-toastify';
import { useUserContext } from '../../Hooks/useUser';

const FilmView = () => {
  const [films, setFilms] = React.useState(null);
  const { id } = useParams();
  const { login } = useUserContext();

  const [modalReview, setModalReview] = React.useState(false);
  const [watch, setWatch] = React.useState(false);
  const [like, setLiked] = React.useState(false);
  const [listWatch, setListWatch] = React.useState(false);
  const refLiRate = React.useRef(null);
  const [rate, setRate] = React.useState(0);
  const [clearRate, setClearRate] = React.useState(false);

  function randomColor() {
    return Math.floor(Math.random() * 256).toString(16);
  }

  function randomColorHEX() {
    return `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;
  }

  const divDescriptionFilmRef = React.useRef(null);
  const pRef = React.useRef(null);

  React.useEffect(() => {
    const ruleSlug = `/filmes?filters[slug][$eq]`;
    const populatePhotoDescription = `populate=photo_description`;
    Filmes_GET(`${ruleSlug}=${id}&${populatePhotoDescription}`)
      .then((data) => {
        setFilms(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar filmes:', error);
      });
  }, [id]);

  React.useEffect(() => {
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
    { title: 'Compartilhar', onClick: () => clipboardFilmURL() },
  ];

  const sizeIcons = 21;

  return (
    <>
      <div>
        {films ? (
          <div
            className="grid justify-center bg-slate-950 mt-6 animate-animeLeft"
            key={films.data[0].id}
          >
            <Head
              title={` » ${films.data[0].attributes.title}`}
              description="Pagina do filme"
            />
            {login ? (
              <div className="font-gabarito mt-12 content-center justify-items-center  max-w-5xl h-16 cardMD:h-[auto] cardMD:p-4 tm:p-2 bg-transparent border border-blue-950 text-slate-300 rounded-t-lg flex justify-start items-center cardMD:mx-auto">
                <div className=" cardMD:mx-8 tm:mx-1 grid grid-cols-[1fr,1fr] cardMD:grid-cols-1 tm:grid-cols-2 tm:items-center tm:gap-x-4  cardMD:gap-y-4  justify-between cardMD:justify-center mx-auto grid-row-1 w-full">
                  <ul className="flex justify-center tm:flex-col  tm:gap-y-4 gap-x-8 cardMD:mx-auto my-auto text-center">
                    <li
                      className="cursor-pointer"
                      onClick={() => setWatch(!watch)}
                    >
                      {watch ? (
                        <div>
                          <EyeFilled
                            style={{
                              color: '#68a512',
                              fontSize: `${sizeIcons}px`,
                            }}
                          />
                          <p className="text-slate-400">Assistido</p>
                        </div>
                      ) : (
                        <div>
                          <EyeOutlined style={{ fontSize: `${sizeIcons}px` }} />
                          <p className="text-slate-400">Assistir</p>
                        </div>
                      )}
                    </li>
                    <li
                      className="cursor-pointer"
                      onClick={() => setLiked(!like)}
                    >
                      {like ? (
                        <div>
                          <HeartFilled
                            style={{
                              color: '#a51f1f',
                              fontSize: `${sizeIcons}px`,
                            }}
                          />
                          <p className="text-slate-400">Liked</p>
                        </div>
                      ) : (
                        <div>
                          <HeartOutlined
                            style={{ fontSize: `${sizeIcons}px` }}
                          />
                          <p className="text-slate-400">Like</p>
                        </div>
                      )}
                    </li>
                    <li
                      className="cursor-pointer"
                      onClick={() => setListWatch(!listWatch)}
                    >
                      {listWatch ? (
                        <div>
                          <FieldTimeOutlined
                            style={{
                              color: '#b6ed12',
                              fontSize: `${sizeIcons}px`,
                            }}
                          />
                          <p className="text-slate-400">Adicionado</p>
                        </div>
                      ) : (
                        <div>
                          <FieldTimeOutlined
                            style={{ fontSize: `${sizeIcons}px` }}
                          />
                          <p className="text-slate-400">Adicionar</p>
                        </div>
                      )}
                    </li>
                    <li className="mr-12 cardMD:mr-0 relative " ref={refLiRate}>
                      {/*ConfigProvider da lib React Rate */}
                      <div
                        onClick={() => {
                          setClearRate(false);
                          setRate(0);
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
                    </li>
                  </ul>
                  <ul className="flex tm:flex-col justify-center gap-x-4 tm:gap-y-3 items-center text-slate-300 cardMD:mx-auto  ">
                    {actions.map((action, index) => (
                      <li
                        key={index}
                        className="p-2 tm:p-2 tm:text-center  rounded-md bg-[rgba(47,66,178)] hover:bg-[rgba(46,38,178)] cursor-pointer transition-colors"
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

            <div className="grid grid-cols-2 grid-rows-[auto,1fr] gap-y-8 content-center justify-items-center items-center animate-fadeIn max-w-5xl font-gabarito cardMD:grid-cols-1 cardMD:p-8 ">
              <div>
                <img
                  className="w-auto h-auto bg-contain rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] "
                  src={`${films.data[0].attributes.photo_description.data.attributes.url}`}
                  alt=""
                />
              </div>
              <div ref={divDescriptionFilmRef} className="p-3 rounded-br-lg ">
                <div className="text-center ">
                  <p
                    ref={pRef}
                    className={`inline-block items-center text-slate-200 text-4xl p-4 border border-slate-300 border-opacity-10 rounded-xl  hover:animate-pulse`}
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
              <div className="text-slate-400 inline-block mr-auto w-full col-span-full">
                <div className="">
                  <p className="border-b border-b-slate-900 text-lg rounded-sm mt-8 mb-8">
                    Reviews Recentes de {` `}
                    <span className="text-slate-200 text-xl font-semibold">
                      {films.data[0].attributes.title}
                    </span>
                  </p>
                </div>
              </div>
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
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default FilmView;
