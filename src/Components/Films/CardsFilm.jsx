import React from 'react';
import { Filmes_GET } from '../Api/Api';
import ContentFilms from './ContentFilms';
import Loading from '../Helper/Loading';
import PaginationFilms from './PaginationFilms';
import FilmCard from './FilmCard';

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
    <div
      className="grid grid-cols-[600px,_1fr] justify-center justify-items-center gap-x-4 cardMD:grid-cols-1 
      cardMD:max-w-5xl cardMD:justify-center"
    >
      <div
        className="grid grid-cols-3 grid-rows-3 cardMD:grid-row-1 cardMD:row-start-2
      cardMD:flex lg:flex-nowrap cardMD:overflow-x-scroll cardMD:scrollbar-thin cardMD:scrollbar-track-slate-800 cardMD:scrollbar-thumb-blue-100 cardMD:scrollbar-track-rounded-full cardMD:scrollbar-thumb-rounded-full cardMD:scrollbar-w-1 
      cardMD:w-[20rem] animate-animeLeft "
      >
        {empty ? (
          <div className="flex content-center items-center text-yellow-50 text-center text-xl font-bold animate-fadeIn col-span-full row-span-full  h-[8.5rem] mx-auto">
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
              setFilmId={setFilmId}
              searchValue={searchValue}
              isActive={isActive}
              index={index}
              title={film.attributes.title}
              image={`${film.attributes.card.data.attributes.url}`}
              width={`${film.attributes.card.data.attributes.width}`}
              height={`${film.attributes.card.data.attributes.height}`}
              onClick={handleClick}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-screen">
            <Loading />
          </div>
        )}
      </div>
      {filmId ? (
        <ContentFilms key={filmId} id={filmId} />
      ) : (
        <div className="p-4 hidden cardMD:block  lg:w-[600px] sm:w-[300px] tm:w-[180px] tm:h-[800px] cardMD:h-[700px] rounded-md opacity-10 bg-gray-900 row-start-1"></div>
      )}

      <div className="col-end-2 pb-24">
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
