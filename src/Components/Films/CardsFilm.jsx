import React from 'react';
import { Filmes_GET, hostURL_GET } from '../Api/Api';
import ContentFilms from './ContentFilms';
import Loading from '../Helper/Loading';
import PaginationFilms from './PaginationFilms';
const CardsFilm = ({ searchValue }) => {
  const [films, setFilms] = React.useState([]);
  const [isActive, setIsActive] = React.useState(null);
  const [filmId, setFilmId] = React.useState(null);
  const [empty, setEmpty] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const limitItemPerPage = 9;

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  function FilmCard({ title, index, id, image, onClick, width, height }) {
    const activeIndex = index === isActive;
    const lowerSearchValue = searchValue.toLowerCase();
    const ilgatch = title.toLowerCase().includes(lowerSearchValue);
    if (searchValue && searchValue.length > 1 && !ilgatch) {
      return null;
    }
    return (
      <div className={`p-3 lg:w-5/6`}>
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
            width: `${(width - 50) * 0.9}px`,
            height: `${(height - 90) * 0.9}px`,
            cursor: 'pointer',
          }}
        />
      </div>
    );
  }

  React.useEffect(() => {
    const startIndex = (currentPage - 1) * limitItemPerPage;

    const ruleCardItem = `sort=id&populate=card`;
    let ruleFilter = `filters[title][$containsi]=${searchValue}`;
    let rulePagination = `pagination[start]=${startIndex}&pagination[limit]=${limitItemPerPage}`;

    const searchWithFilter = `${ruleFilter}&${ruleCardItem}`;
    const pagination = `${ruleCardItem}&${rulePagination}`;

    Filmes_GET(
      searchValue.length === 0
        ? `/filmes?${pagination}`
        : `/filmes?${searchWithFilter}`,
    )
      .then((data) => {
        setFilms(data);
        if (data.data.length !== 0) {
          setEmpty(false);
        } else {
          setEmpty(true);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar filmes:', error);
      });
    if (searchValue.length !== 0) {
      handlePageChange(currentPage);
    }
  }, [currentPage, searchValue]);

  function handleClick(index) {
    setIsActive(index);
  }

  return (
    <div className="grid grid-cols-[600px,_1fr] justify-center justify-items-center gap-x-4 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 lg:max-w-5xl">
      <div className="grid grid-cols-3 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 lg:justify-items-center md:grid-cols-2 sm:grid-cols-1 animate-animeLeft">
        {empty ? (
          <div className="flex content-center text-yellow-50 text-center text-xl font-bold animate-fadeIn col-span-full row-span-full my-auto">
            <p>Ops! Não encontramos nenhum filme correspondente.</p>
          </div>
        ) : (
          ''
        )}
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
          <div className="bg-gray-950 rounded-md opacity-10"></div>
        </div>
      )}

      <div className="col-end-2">
        {films.length !== 0 && (
          <PaginationFilms
            totalItems={films.meta.pagination.total}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default CardsFilm;
