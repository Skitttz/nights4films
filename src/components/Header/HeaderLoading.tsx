import { LoadingOutlined } from '@ant-design/icons';
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
          <div role="status" aria-label="Verificando sua conta" className="flex items-center gap-2 text-sm text-slate-400">
            <LoadingOutlined spin aria-hidden="true" className="text-purple-300" />
            <span className="cardMD:sr-only">Verificando sua conta...</span>
          </div>
        </nav>
      </header>
      <div className="pb-[2.5rem]" />
    </>
  );
};
export default HeaderSkeleton;
