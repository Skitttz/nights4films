import { LoginOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { Filmes_GET } from '../../api/index';
import useWindowDimensions from '../../hooks/useWindowDimension';
import CustomLoading from '../Helper/CustomLoading';
import ModalTrailer from './ModalTrailer';

const ContentFilms = ({ id }) => {
  const [films, setFilms] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [activeModal, setActiveModal] = React.useState(false);
  const { width } = useWindowDimensions();
  let hours, minutes;

  function transformMinHours(min) {
    hours = Math.floor(min / 60);
    return hours;
  }
  //Incomplete time from hours transformed into minutes
  function transformHoursIntoMinutes(min) {
    minutes = min % 60;
    return minutes;
  }

  React.useEffect(() => {
    setLoading(true);
    Filmes_GET(`/filmes/${id}?populate=*`)
      .then(async (data) => {
        if (data) {
          setFilms(data);
        } else {
          console.error('Dados do filme não encontrados ou inválidos.');
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar filmes:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      {loading ? (
        <div
          className={`pt-4 w-auto h-[600px] flex items-center mx-auto duration-700 cardMD:pb-16 md:px-8 sm:px-8 tm:px-0 duration-400  
        `}
        >
          <CustomLoading />
        </div>
      ) : (
        <div
          className={`pt-4 w-auto h-auto lg:w-[40rem] lg:px-2 md:w-[35rem] sm:w-[30rem] tm:w-[19rem] duration-700 cardMD:pb-16 md:px-8 sm:px-8 tm:px-0 animate-animeLeft`}
        >
          <div className="bg-gray-950 h-auto w-auto rounded-md relative">
            <div>
              {films && (
                <div
                  className={`cardMD:rounded-md md:rounded-md sm:rounded-md   ${
                    films
                      ? 'translate-x-0 duration-800 opacity-100'
                      : '-translate-x-40 duration-800 opacity-0'
                  }`}
                >
                  <div
                    className="relative cursor-pointer after:content-play after:opacity-40 after:hover:opacity-90 after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 rounded-t-md bg-slate-800 lg:rounded-t-md  sm:rounded-md"
                    onClick={() => {
                      if (width > 1000) {
                        return setActiveModal(true);
                      }
                      return open(
                        `https://www.youtube.com/watch?v=${films.data.attributes.trailer}`,
                      );
                    }}
                  >
                    <img
                      className="rounded-t-md h-64 w-full opacity-50 object-cover"
                      src={`${films.data.attributes.photo_description.data.attributes.url}`}
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col p-7 gap-3 ">
                    <h2 className="text-3xl  font-gabarito text-slate-200 font-bold relative mr-1">
                      <Link to={`/filmes/${films.data.attributes.slug}`}>
                        {films.data.attributes.title}{' '}
                      </Link>
                      <span className="font-gabarito text-base text-slate-300 bg-slate-900 rounded-md font-normal p-1 px-2  inline-block align-middle ">
                        {films.data.attributes.year}
                      </span>
                    </h2>
                    <span className="font-gabarito text-base text-slate-500 font-normal">
                      {` ${transformMinHours(
                        films.data.attributes.duration,
                      )}h ${transformHoursIntoMinutes(
                        films.data.attributes.duration,
                      )}min`}
                    </span>
                    <div className="flex flex-row flex-wrap justify-items-start	justify-start text-lg text-slate-600 font-light gap-1 transition-opacity">
                      {films.data.attributes.genres.data.map((genre) => (
                        <span
                          className="p-2  bg-slate-900 text-slate-400 text-xs rounded-lg mb-2"
                          key={genre.id}
                        >{`${genre.attributes.title} `}</span>
                      ))}
                    </div>
                    <p className="text-base leading-5 text-slate-400 text-justify font-normal">
                      {films.data.attributes.description}
                    </p>
                    <div className="flex align-middle items-center justify-end  text-2xl text-slate-300 font-extralight mr-2  ">
                      <Link to={`/filmes/${films.data.attributes.slug}`}>
                        <span className="text-slate-400 hover:text-slate-200 text-sm font-gabarito mr-2 font-medium">
                          Ir para página do filme
                        </span>
                        <span>
                          <LoginOutlined />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div>
        {activeModal ? (
          <ModalTrailer
            key={activeModal}
            setModal={setActiveModal}
            EmbedId={films.data.attributes.trailer}
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default ContentFilms;
