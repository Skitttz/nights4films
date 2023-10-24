import React from 'react';
import { Filmes_GET } from '../Api/Api';
import ContentFilms from './ContentFilms';
import Loading from '../Helper/Loading';
import PaginationFilms from './PaginationFilms';
import FilmCard from './FilmCard';
import { StarFilled } from '@ant-design/icons';

const CardsFilm = ({ searchValue }) => {
  const [films, setFilms] = React.useState([]);
  const [isActive, setIsActive] = React.useState(null);
  const [filmId, setFilmId] = React.useState(null);
  const [empty, setEmpty] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const limitItemPerPage = 9;
  const refScroll = React.useRef(null);

  // Setar o card do filme
  function handleClick(index) {
    setIsActive(index);
  }

  // Setar pagina atual -> nova
  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  //Trata de filtrar filmes diretamente pela API e tambem entregar os filmes relacionados a sua respectiva pagina
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

  //Controla a rolagem para o card ativo.
  React.useEffect(() => {
    if (isActive !== null) {
      const cardWidth = 175; // Largura de cada card
      const scrollX =
        isActive * cardWidth -
        refScroll.current.offsetWidth / 2 +
        cardWidth / 2;

      refScroll.current.scrollLeft = scrollX;
    }
  }, [isActive]);

  return (
    <div className="animate-animeDown duration-[3000ms]">
      <div className="text-slate-200 font-gabarito font-medium text-2xl ml-8 mb-3 border-b-slate-800 border-b cardMD:w-[80%] cardMD:text-lg">
        <p>Filmes</p>
      </div>
      {films.length !== 0 ? (
        <div
          className="grid grid-cols-[600px,_1fr] justify-center justify-items-center gap-x-4 cardMD:grid-cols-1 
      cardMD:max-w-5xl cardMD:justify-center "
        >
          <div
            className="grid grid-cols-3 grid-rows-3 cardMD:grid-row-1 cardMD:row-start-1
      cardMD:flex lg:flex-nowrap cardMD:overflow-x-scroll cardMD:scrollbar-thin cardMD:scrollbar-track-slate-800 cardMD:scrollbar-thumb-blue-100 cardMD:scrollbar-track-rounded-full cardMD:scrollbar-thumb-rounded-full cardMD:scrollbar-w-1 cardMD:scroll-smooth
      lg:w-[45rem] md:w-[35rem] sm:w-[25rem] tm:w-[18rem]"
            ref={refScroll}
          >
            {empty ? (
              <div className="flex content-center items-center text-yellow-50 text-center text-xl font-bold animate-fadeIn col-span-full row-span-full  h-[8.5rem] mx-auto">
                <p>Ops! Não encontramos nenhum filme correspondente.</p>
              </div>
            ) : (
              ''
            )}
            {films
              ? films.data.map((film, index) => (
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
              : ''}
          </div>
          {filmId ? (
            <div className="cardMD:row-start-3">
              <ContentFilms key={filmId} id={filmId} />
            </div>
          ) : (
            <div className=" animate-animeLeft p-4 flex flex-col justify-center items-center row-start-1 col-start-2 w-full cardMD:col-start-1 cardMD:row-start-3 lg:w-[40rem] md:w-[35rem] sm:w-[30rem] tm:w-[19rem] tm:h-[800px] cardMD:h-[700px] rounded-md bg-gray-900 border border-slate-800 border-opacity-30">
              <p className="flex flex-col items-center font-gabarito border-b border-b-slate-400 text-xl text-slate-300 p-2 rounded-md ">
                Selecione o Filme
                <span className="text-xs text-slate-500">
                  será exibido aqui
                </span>
              </p>
              <p className="text-2xl text-slate-300 hover:text-yellow-400 transition-colors hover:animate-pulse">
                <StarFilled />
              </p>
            </div>
          )}

          <div className="col-end-2 pb-8">
            {films.length !== 0 && (
              <PaginationFilms
                totalItems={films.meta.pagination.total}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                limitItemPage={9}
              />
            )}
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default CardsFilm;
