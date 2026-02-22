import { StarFilled } from '@ant-design/icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import slugify from 'slugify';
import { useFilms } from '../../hooks/useFilms';
import useWindowDimensions from '../../hooks/useWindowDimension';
import useDebounce from '../../hooks/useDebounce';
import { scrollToElementWithOffset } from '../../utils/scroll';
import IconSearch from '../../assets/i-search.svg';
import ContentFilms from './ContentFilms';
import FilmCard from './FilmCard';
import FilmCardLoading from './Loading/FilmCard';
import PaginationFilms from './PaginationFilms';

const CardsFilm = () => {
  const { isMobile } = useWindowDimensions();
  const [isActive, setIsActive] = useState<string | number | null>(null);
  const [filmData, setFilmData] = useState<{ id: string | number | null; title: string | null }>({
    id: null,
    title: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const limitItemPerPage = 9;
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const debouncedChange = useDebounce((value: string) => setQuery(value), 300);
  const refScroll = useRef<HTMLDivElement>(null);
  const contentFilmRef = useRef<HTMLDivElement>(null);
  const mainContainerFilmRef = useRef<HTMLDivElement>(null);

  const toContentFilm = () => {
    const contentFilm = contentFilmRef.current;
    if (isMobile && contentFilm) {
      const offsetHeader = 80;
      scrollToElementWithOffset(contentFilm, offsetHeader);
    }
  };

  const toTopContainerFilm = () => {
    const mainContainerFilm = mainContainerFilmRef.current;
    if (mainContainerFilm) {
      const offsetHeader = isMobile ? 80 : 500;
      scrollToElementWithOffset(mainContainerFilm, offsetHeader);
    }
  };

  // Setar o card do filme
  const handleClick = useCallback((index: string | number) => {
    toContentFilm();
    setIsActive(index);
  }, [isMobile]);

  // Setar pagina atual -> nova
  const handlePageChange = useCallback((newPage: number) => {
    if (filmData.id === null) {
      toTopContainerFilm();
    }
    setCurrentPage(newPage);
  }, [isMobile, filmData.id]);

  //Controla a rolagem para o card ativo.
  useEffect(() => {
    if (isActive !== null && refScroll.current && typeof isActive === 'number') {
      const cardWidth = 175; // Largura de cada card
      const scrollX =
        isActive * cardWidth -
        refScroll.current.offsetWidth / 2 +
        cardWidth / 2;

      refScroll.current.scrollLeft = scrollX;
    }
  }, [isActive]);

  const { data, isLoading, isError, error, isSuccess, isFetching } = useFilms(
    currentPage,
    query,
    limitItemPerPage,
  );
  const films = data?.films;
  const isEmpty = data?.isEmpty ?? false;
  const totalItems = data?.totalItems ?? 0;
  const hasFilms = Boolean(films && films.data && films.data.length > 0);

  return (
    <div>
      <div
        className="text-slate-200 font-gabarito font-medium text-2xl ml-8 mb-3 border-b-slate-800 border-b cardMD:w-[80%] cardMD:text-lg translate-y-0"
        ref={mainContainerFilmRef}
      >
        <div className="flex items-center gap-12 tm:flex-col tm:items-start tm:gap-y-2">
          <p>Filmes</p>

        </div>
      </div>
      <div className="flex items-center ml-8 mb-4 mt-2">
        <input
          aria-label="Buscar filmes"
          className="block transition-colors duration-300 border border-transparent hover:border-slate-500 w-[20rem] sm:w-[14rem] p-1 bg-gray-800 placeholder:text-sm placeholder:text-gray-500 text-slate-200 text-sm opacity-80  focus:ring-1 focus:ring-slate-500 tm:w-full indent-6 rounded-md focus-visible:outline-none"
          style={{
            backgroundImage: `url(${IconSearch})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '8px 50%',
            backgroundSize: '14px 14px',
          }}
          type="text"
          name="searchFilmeInline"
          placeholder="Digite o nome do filme"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            debouncedChange(e.target.value);
          }}
        />
      </div>
      <div
        className="grid grid-cols-1 desktop:grid-cols-[600px,_1fr] justify-center justify-items-center gap-x-4 
      cardMD:max-w-5xl xl:max-w-6xl lg:max-w-5xl cardMD:justify-center animate-fadeIn overflow-x-hidden"
      >
        <div
          className="grid grid-cols-3 grid-rows-3 cardMD:grid-row-1 cardMD:row-start-1
      cardMD:flex lg:flex-nowrap cardMD:overflow-x-scroll cardMD:scrollbar-thin cardMD:scrollbar-track-slate-800 cardMD:scrollbar-thumb-blue-100 cardMD:scrollbar-track-rounded-full cardMD:scrollbar-thumb-rounded-full cardMD:scrollbar-w-1 cardMD:scroll-smooth
      lg:w-[45rem] md:w-[35rem] sm:w-[25rem] tm:w-[24rem]"
          ref={refScroll}
        >
          {(isLoading || (isFetching && !data)) ? (
            <FilmCardLoading />
          ) : hasFilms
            ? films.data.map((film: any) => (
              <FilmCard
                key={film.id}
                id={film.id}
                setFilmData={setFilmData as any}
                isActive={isActive}
                title={film.attributes.title}
                image={`${film.attributes.card.data.attributes.url}`}
                width={`${film.attributes.card.data.attributes.width}`}
                height={`${film.attributes.card.data.attributes.height}`}
                onClick={handleClick}
              />
            ))
            : (
              <div className="flex content-center items-center text-yellow-50 text-center text-xl font-bold animate-fadeIn col-span-full row-span-full h-[8.5rem] mx-auto ml-8 tm:ml-0">
                <p>Ops! Não encontramos nenhum filme correspondente.</p>
              </div>
            )}
        </div>
        {filmData.title && films && filmData.id ? (
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
          {hasFilms && films.data.length !== 0 && (
            <PaginationFilms
              totalItems={totalItems}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              limitItemPage={limitItemPerPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardsFilm;
