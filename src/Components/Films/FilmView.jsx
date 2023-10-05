import React from 'react';
import { useParams } from 'react-router-dom';
import { Filmes_GET, hostURL_GET } from '../Api/Api';

const FilmView = () => {
  const [films, setFilms] = React.useState(null);
  const { id } = useParams();

  React.useEffect(() => {
    Filmes_GET(`/filmes?filters[slug][$eq]=${id}&populate=photo_description`)
      .then((data) => {
        setFilms(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar filmes:', error);
      });
  }, [id]);
  return (
    <div>
      {films ? (
        <div
          className="pt-16 bg-slate-950 h-[80rem] animate-animeLeft"
          key={films.data[0].id}
        >
          <div className="grid content-center justify-items-center animate-fadeIn">
            <img
              className="w-auto h-[15rem] bg-contain rounded-lg mb-4  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
              src={`${hostURL_GET}${films.data[0].attributes.photo_description.data.attributes.url}`}
              alt=""
            />

            <p className="font-gabarito text-slate-200 text-4xl p-4 border border-slate-300 shadow-[6px_5px_55px_1px_rgba(49,30,217)] rounded-xl">
              {films.data[0].attributes.title}
            </p>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default FilmView;
