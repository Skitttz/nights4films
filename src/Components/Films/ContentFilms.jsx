import React from 'react';
import { Filmes_GET, hostURL_GET } from '../Api/Api';
import ModalTrailer from './modalTrailer';

const ContentFilms = ({ id }) => {
  const [films, setFilms] = React.useState(null);
  const [activeModal, setActiveModal] = React.useState(false);

  React.useEffect(() => {
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
      });
  }, [id]);

  return (
    <>
      <div
        className={`pt-4 w-auto  duration-700 lg:px-32 lg:pb-32 md:px-32 md:pb-32 sm:px-32 sm:pb-32 ${
          films
            ? 'translate-x-0 duration-800 opacity-100'
            : '-translate-x-40 duration-800 opacity-0'
        }`}
      >
        <div className="bg-gray-950 h-auto w-auto rounded-md ">
          {films && (
            <div className="lg:rounded-md md:rounded-md sm:rounded-md">
              <div
                className="relative cursor-pointer after:content-play after:opacity-40 after:hover:opacity-90 after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 rounded-t-md bg-slate-800 lg:rounded-t-md md:rounded-md sm:rounded-md"
                onClick={() => {
                  setActiveModal(true);
                }}
              >
                <img
                  className="rounded-t-md h-64 w-full opacity-50 object-cover"
                  src={`${hostURL_GET}${films.data.attributes.photo_description.data.attributes.url}`}
                  alt=""
                />
              </div>

              <div className="flex flex-col p-7 gap-3 ">
                <h2 className="text-3xl font-gabarito text-slate-200 font-bold relative">
                  {films.data.attributes.title}{' '}
                  <span className="font-gabarito text-base text-slate-300 bg-slate-900 rounded-md font-normal p-1 px-2 absolute right-0 bottom-1  mx-auto">
                    {films.data.attributes.year}
                  </span>
                </h2>
                <span className="font-gabarito text-base text-slate-500 font-normal">
                  {` ${Math.floor(films.data.attributes.duration / 60)}h ${
                    films.data.attributes.duration % 60
                  }min`}
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
              </div>
            </div>
          )}
        </div>
      </div>
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
