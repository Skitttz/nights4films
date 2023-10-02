import React from 'react';
import Card from '../../Assets/card-teste.svg';
import { Filmes_GET, hostURL_GET } from '../Api/Api';
import ContentFilms from './ContentFilms';
import Loading from '../Helper/Loading';

const CardsFilm = ({ searchValue }) => {
  const [films, setFilms] = React.useState([]);
  const [isActive, setIsActive] = React.useState(null);
  const [filmId, setFilmId] = React.useState(null);

  function FilmCard({ title, index, id, image, onClick, width, height }) {
    const activeIndex = index === isActive;

    const lowerSearchValue = searchValue.toLowerCase();
    const ilgatch = title.toLowerCase().includes(lowerSearchValue);
    if (searchValue && searchValue.length > 1 && !ilgatch) {
      return null;
    }

    const isSearchActive = !!searchValue && ilgatch;

    return (
      <div className={`p-3 lg:w-5/6  `}>
        <img
          onClick={() => {
            onClick(index);
            setFilmId(id);
          }}
          className={`rounded-2xl transition ease-in-out delay-600 hover:shadow-[0px_1px_12px_4px_rgba(130,166,237,0.1)] hover:border border-sky-200 border-opacity-10 hover:scale-110 	${
            activeIndex ? 'active' : ' '
          }`}
          src={image}
          alt={title}
          style={{
            width: `${width - 20}px`,
            height: `${height - 90}px`,
            cursor: 'pointer',
          }}
        />
      </div>
    );
  }

  React.useEffect(() => {
    Filmes_GET(`/filmes?sort=id&populate=card`)
      .then((data) => {
        setFilms(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar filmes:', error);
      });
  }, []);

  function handleClick(index) {
    setIsActive(index);
  }

  return (
    <div className="grid grid-cols-[600px,_1fr] justify-center justify-items-center gap-4 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1   lg:max-w-5xl">
      <div className="grid grid-cols-3 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 lg:justify-items-center md:grid-cols-2 sm:grid-cols-1 ">
        {films.length !== 0 ? (
          films.data.map((film, index) => (
            <FilmCard
              key={film.id}
              id={film.id}
              index={index}
              title={film.attributes.title}
              image={`${hostURL_GET}${film.attributes.card.data.attributes.url}`}
              width={`${film.attributes.card.data.attributes.width}`}
              height={`${film.attributes.card.data.attributes.height}`}
              onClick={handleClick}
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
      {filmId ? (
        <ContentFilms key={filmId} id={filmId} />
      ) : (
        <div className="p-4 lg:hidden">
          <div className="bg-gray-950  rounded-md opacity-10"></div>
        </div>
      )}
    </div>
  );
};

export default CardsFilm;
