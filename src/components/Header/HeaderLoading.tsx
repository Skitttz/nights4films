import { Link } from 'react-router-dom';

const HeaderSkeleton = () => {
  return (
    <>
      <header aria-busy="true" className="fixed z-30 w-full top-0 bg-gray-950 shadow-md">
        <nav
          className="h-16 max-w-7xl mx-auto flex items-center justify-between lg:max-w-5xl tm:gap-4 px-4"
        >
          <div>
            <Link
              className="flex items-center select-none ml-2"
              to={'/'}
            >
              <p className="font-gabarito font-thin text-2xl text-gray-200 ">
                Nights
                <span className="text-[rgba(107,66,178)] p-0.5 px-2 bg-transparent rounded-lg mx-1 font-limelight font-bold shadow-[0px_3px_0px_0px_rgba(107,66,178)] hover:animate-wiggle">
                  4
                </span>
                <span className="font-gabarito">Films</span>
              </p>
            </Link>
          </div>
          <div role="status" aria-label="Carregando conta" className="h-[35px] w-[240px] shrink-0 animate-pulse rounded-md bg-gray-900 motion-reduce:animate-none cardMD:h-8 cardMD:w-8" />
        </nav>
      </header>
      <div className="pb-[2.5rem]" />
    </>
  );
};
export default HeaderSkeleton;
