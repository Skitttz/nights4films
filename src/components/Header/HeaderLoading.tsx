import React from 'react';
import { Link } from 'react-router-dom';

const HeaderSkeleton = () => {
  const openMenuMB = false;
  return (
    <>
      <header className="fixed z-30 w-full top-0 bg-gray-950 shadow-md">
        <nav
          className={`h-16 max-w-7xl mx-auto flex flex-wrap items-center justify-between lg:justify-between lg:max-w-5xl tm:max-w-5xl tm:flex-nowrap tm:gap-4 ${openMenuMB
              ? 'flex-col h-[auto] gap-y-10 mt-4 border-b border-b-purple-900 border-opacity-60 cardMD:animate-animeDown'
              : 'cardMD:flex-row cardMD:animate-animeTop'
            }`}
        >
          <div>
            <Link
              className={`flex items-center select-none  ${openMenuMB ? 'ml-0' : 'ml-7'
                }`}
              to={'/'}
              onClick={() => {
                console.log('');
              }}
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
          <div className="w-[240px] h-[35px] bg-gray-900 animate-pulse rounded mb-1" />
        </nav>
      </header>
      <div className="pb-[2.5rem]" />
    </>
  );
};
export default HeaderSkeleton;
