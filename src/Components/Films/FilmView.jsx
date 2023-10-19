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
} from '@ant-design/icons';
import ReviewForms from '../Reviews/ReviewForms';

const FilmView = () => {
  const [films, setFilms] = React.useState(null);
  const { id } = useParams();

  const [modalReview, setModalReview] = React.useState(false);
  const [watch, setWatch] = React.useState(false);
  const [like, setLiked] = React.useState(false);
  const [rate, setRate] = React.useState(0);

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

  const actions = [
    { title: 'Criar Review', onClick: () => setModalReview(!modalReview) },
    { title: 'Adicionar a Lista' },
    { title: 'Compartilhar' },
  ];

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
            <div className="font-gabarito mt-12 content-center justify-items-center  max-w-5xl h-16 bg-transparent border border-blue-950 text-slate-300 rounded-t-lg flex justify-start items-center cardMD:mx-auto">
              <div className="ml-8 grid grid-cols-[1fr,1fr] justify-between mx-auto grid-row-1 w-full">
                <ul className="flex gap-x-8 my-auto">
                  <li
                    className="cursor-pointer"
                    onClick={() => setWatch(!watch)}
                  >
                    {watch ? (
                      <EyeFilled style={{ color: '#68a512' }} />
                    ) : (
                      <EyeOutlined />
                    )}
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => setLiked(!like)}
                  >
                    {like ? (
                      <HeartFilled style={{ color: '#a51f1f' }} />
                    ) : (
                      <HeartOutlined />
                    )}
                  </li>
                  <li className="mr-12 hover:">
                    {/*ConfigProvider da lib React Rate */}
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
                        defaultValue={0}
                        style={{ color: 'rgba(127,76,178)' }}
                      />
                    </ConfigProvider>
                  </li>
                </ul>
                <ul className="flex justify-center gap-x-4  text-slate-300">
                  {actions.map((action, index) => (
                    <li
                      key={index}
                      className="p-2 rounded-md bg-[rgba(47,66,178)] hover:bg-[rgba(46,38,178)] cursor-pointer transition-colors"
                      onClick={action.onClick}
                    >
                      {action.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
