import { LoginOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { useFilmById } from '../../hooks/useFilms';
import useWindowDimensions from '../../hooks/useWindowDimension';
import CustomLoading from '../Helper/CustomLoading';
import ModalTrailer from './ModalTrailer';

interface ContentFilmsProps {
  id: string | number;
  name: string;
}

const ContentFilms = ({ id, name }: ContentFilmsProps) => {
  const [activeModal, setActiveModal] = React.useState(false);
  const { width } = useWindowDimensions();
  let hours;
  let minutes;

  function transformMinHours(min: number) {
    hours = Math.floor(min / 60);
    return hours;
  }
  //Incomplete time from hours transformed into minutes
  function transformHoursIntoMinutes(min: number) {
    minutes = min % 60;
    return minutes;
  }

  const { data: film, isError, error, isLoading } = useFilmById(String(id));

  const handleOpenTrailer = (event: any) => {
    if (
      event.type === 'keydown' &&
      event.key !== 'Enter' &&
      event.key !== ' '
    ) {
      return;
    }

    if (event.key === ' ') {
      event.preventDefault();
    }

    if (width > 1000) {
      return setActiveModal(true);
    }
    return window.open(
      `https://www.youtube.com/watch?v=${film.data.attributes.trailer}`,
      '_blank',
    );
  };

  if (isLoading)
    return (
      <div
        className={`flex justify-center pt-4 w-full h-[600px] items-center mx-auto duration-700 cardMD:pb-16 md:px-8 sm:px-4 tm:px-4 duration-400  
`}
      >
        <CustomLoading />
      </div>
    );

  if (isError || error) return <></>;

  return (
    <>
      <div
        className={
          'pt-4 w-auto h-auto lg:w-full lg:px-4 md:w-full sm:w-w-full tm:w-full sduration-700 cardMD:pb-16 md:px-8 sm:px-8 tm:px-4 animate-animeLeft'
        }
      >
        <div className="bg-gray-950 h-auto w-auto rounded-md relative">
          <div>
            {film && (
              <div
                className={`cardMD:rounded-md md:rounded-md sm:rounded-md   ${
                  film
                    ? 'translate-x-0 duration-800 opacity-100'
                    : '-translate-x-40 duration-800 opacity-0'
                }`}
              >
                <div
                  className="relative cursor-pointer after:content-play after:opacity-40 after:hover:opacity-90 after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 rounded-t-md bg-slate-800 lg:rounded-t-md  sm:rounded-md"
                  onClick={handleOpenTrailer}
                  onKeyDown={handleOpenTrailer}
                >
                  <img
                    className="rounded-t-md h-64 w-full opacity-50 object-cover"
                    src={`${film.data.attributes.photo_description.data.attributes.url}`}
                    alt=""
                  />
                </div>

                <div className="flex flex-col p-7 gap-3 ">
                  <h2 className="text-3xl  font-gabarito text-slate-200 font-bold relative mr-1">
                    <Link to={`/filmes/${film.data.attributes.slug}`}>
                      {film.data.attributes.title}{' '}
                    </Link>
                    <span className="font-gabarito text-base text-slate-300 bg-slate-900 rounded-md font-normal p-1 px-2  inline-block align-middle ">
                      {film.data.attributes.year}
                    </span>
                  </h2>
                  <span className="font-gabarito text-base text-slate-500 font-normal">
                    {` ${transformMinHours(
                      film.data.attributes.duration,
                    )}h ${transformHoursIntoMinutes(
                      film.data.attributes.duration,
                    )}min`}
                  </span>
                  <div className="flex flex-row flex-wrap justify-items-start	justify-start text-lg text-slate-600 font-light gap-1 transition-opacity">
                    {film.data.attributes.genres.data.map((genre: any) => (
                      <span
                        className="p-2  bg-slate-900 text-slate-400 text-xs rounded-lg mb-2"
                        key={genre.id}
                      >{`${genre.attributes.title} `}</span>
                    ))}
                  </div>
                  <p className="text-base leading-5 text-slate-400 text-justify font-normal">
                    {film.data.attributes.description}
                  </p>
                  <div className="flex align-middle items-center justify-end text-2xl text-slate-300 font-extralight gap-2">
                    <Link to={`/filmes/${film.data.attributes.slug}`}>
                      <span className="text-slate-300 transition-all hover:text-slate-100 text-lg font-gabarito mr-2 font-medium">
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

      <div>
        {activeModal ? (
          <ModalTrailer
            key={activeModal ? 'active' : 'inactive'}
            setModal={setActiveModal}
            EmbedId={film.data.attributes.trailer}
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default ContentFilms;
