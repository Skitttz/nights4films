import PaginationFilms from '../PaginationFilms';
import FilmCardLoading from './FilmCard';

export default function CardsFilmLoading() {
  return (
    <div>
      <div className="text-slate-200 font-gabarito font-medium text-2xl ml-8 mb-3 border-b-slate-800 border-b cardMD:w-[80%] cardMD:text-lg animate-animeDown">
        <p>Filmes</p>
      </div>
      <div
        className="grid grid-cols-[600px,_1fr] justify-center justify-items-center gap-x-4 cardMD:grid-cols-1 
      cardMD:max-w-5xl xl:max-w-6xl lg:max-w-5xl cardMD:justify-center animate-fadeIn h-[733px] w-auto"
      >
        <div
          className="grid grid-cols-3 grid-rows-3 cardMD:grid-row-1 cardMD:row-start-1
      cardMD:flex lg:flex-nowrap cardMD:overflow-x-scroll cardMD:scrollbar-thin cardMD:scrollbar-track-slate-800 cardMD:scrollbar-thumb-blue-100 cardMD:scrollbar-track-rounded-full cardMD:scrollbar-thumb-rounded-full cardMD:scrollbar-w-1 cardMD:scroll-smooth lg:w-[45rem] md:w-[35rem] sm:w-[25rem] tm:w-[24rem]"
        >
          <FilmCardLoading />
        </div>

        <div className="animate-animeLeft p-4 flex flex-col justify-center items-center row-start-1 col-start-2 cardMD:col-start-1 cardMD:row-start-3 lg:w-[40rem] md:w-[35rem] sm:w-[30rem] tm:w-[19rem] tm:h-[800px] cardMD:h-[700px] rounded-md bg-gray-900 border border-transparent border-opacity-30" />
        <div className="col-end-2 pb-8">
          <PaginationFilms
            totalItems={0}
            currentPage={1}
            onPageChange={() => console.log('')}
            limitItemPage={9}
          />
        </div>
      </div>
    </div>
  );
}
