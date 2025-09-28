import { StarFilled } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import slugify from 'slugify';
import { useFilms } from '../../hooks/useFilms';
import useWindowDimensions from '../../hooks/useWindowDimension';
import { scrollToElementWithOffset } from '../../utils/scroll';
import ContentFilms from './ContentFilms';
import FilmCard from './FilmCard';
import CardsFilmLoading from './Loading/CardsFilm';
import PaginationFilms from './PaginationFilms';

const CardsFilm = ({ searchValue }) => {
  const { isMobile } = useWindowDimensions();
  const [isActive, setIsActive] = useState(null);
  const [filmData, setFilmData] = useState({
    id: null,
    title: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const limitItemPerPage = 9;
  const refScroll = useRef(null);
  const contentFilmRef = useRef(null);
  const mainContainerFilmRef = useRef(null);

  const handleScroll = () => {
    const toContentFilm = () => {
      const contentFilm = contentFilmRef?.current;
      if (isMobile && contentFilm) {
        const offsetHeader = 80;
        scrollToElementWithOffset(contentFilm, offsetHeader);
      }
    };

    const toTopContainerFilm = () => {
      const mainContainerFilm = mainContainerFilmRef?.current;
      if (mainContainerFilm) {
        const offsetHeader = isMobile ? 80 : 500;
        scrollToElementWithOffset(mainContainerFilm, offsetHeader);
      }
    };

    return {
      toContentFilm,
      toTopContainerFilm,
    };
  };

  const scroll = handleScroll();

  // Setar o card do filme
  function handleClick(index) {
    scroll.toContentFilm();
    setIsActive(index);
  }

  // Setar pagina atual -> nova
  function handlePageChange(newPage) {
    scroll.toTopContainerFilm();
    setCurrentPage(newPage);
  }

  //Controla a rolagem para o card ativo.
  useEffect(() => {
    if (isActive !== null) {
      const cardWidth = 175; // Largura de cada card
      const scrollX =
        isActive * cardWidth -
        refScroll.current.offsetWidth / 2 +
        cardWidth / 2;

      refScroll.current.scrollLeft = scrollX;
    }
  }, [isActive]);

  const { data, isLoading, isError, error } = useFilms(
    currentPage,
    searchValue,
    limitItemPerPage,
  );
  if (isLoading) return <CardsFilmLoading />;
  if (isError || error) return null;

  const { films, isEmpty, totalItems } = data;

  const hasFilms = films.length !== 0 && !isEmpty;

  return (
    <div>
      <div
        className="text-slate-200 font-gabarito font-medium text-2xl ml-8 mb-3 border-b-slate-800 border-b cardMD:w-[80%] cardMD:text-lg translate-y-0"
        ref={mainContainerFilmRef}
      >
        <p>Filmes</p>
      </div>
      {hasFilms ? (
        <div
          className="grid grid-cols-[600px,_1fr] justify-center justify-items-center gap-x-4 cardMD:grid-cols-1 
      cardMD:max-w-5xl xl:max-w-6xl lg:max-w-5xl cardMD:justify-center animate-fadeIn"
        >
          <div
            className="grid grid-cols-3 grid-rows-3 cardMD:grid-row-1 cardMD:row-start-1
      cardMD:flex lg:flex-nowrap cardMD:overflow-x-scroll cardMD:scrollbar-thin cardMD:scrollbar-track-slate-800 cardMD:scrollbar-thumb-blue-100 cardMD:scrollbar-track-rounded-full cardMD:scrollbar-thumb-rounded-full cardMD:scrollbar-w-1 cardMD:scroll-smooth
      lg:w-[45rem] md:w-[35rem] sm:w-[25rem] tm:w-[24rem]"
            ref={refScroll}
          >
            {films
              ? films.data.map((film, index) => (
                  <FilmCard
                    key={film.id}
                    id={film.id}
                    setFilmData={setFilmData}
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
              : null}
          </div>
          {filmData.title && films ? (
            <div className="cardMD:row-start-3 w-full" ref={contentFilmRef}>
              <ContentFilms
                key={filmData.id}
                id={filmData.id}
                name={slugify(filmData.title, {
                  lower: true,
                })}
              />
            </div>
          ) : (
            <div className="tm:px-4 lg:px-4 md:px-4 sm:px-4 w-full">
              <div className="animate-animeLeft p-4 flex flex-col justify-center items-center row-start-1 col-start-2 w-full cardMD:col-start-1 cardMD:row-start-3 lg:w-full md:w-full sm:w-full tm:w-full tm:h-[800px] cardMD:h-[700px] rounded-md bg-gray-900 border border-slate-800 border-opacity-30 h-full">
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
            </div>
          )}

          <div className="col-end-2 pb-8">
            {films.length !== 0 && (
              <PaginationFilms
                totalItems={totalItems}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                limitItemPage={9}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex content-center items-center text-yellow-50 text-center text-xl font-bold animate-fadeIn col-span-full row-span-full h-[8.5rem] mx-auto ml-8">
          <p>Ops! Não encontramos nenhum filme correspondente.</p>
        </div>
      )}
    </div>
  );
};

export default CardsFilm;
