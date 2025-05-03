import React from 'react';
import bgIntro from '../assets/bg-wallpaper-intro.jpg';

const Intro = () => {
  return (
    <>
      <div className="absolute -z-1 w-full  ">
        <img
          src={bgIntro}
          alt=""
          className="h-[35rem] object-cover w-full -translate-y-4 "
        />
      </div>
      <div className="max-w-7xl lg:max-w-5xl mx-auto mt-6 pb-[7rem] cardMD:pb-[2rem] tm:pb-[6rem] animate-fadeIn lg:mb-10">
        <div className="ml-8 grid grid-cols-[1fr,350px] cardMD:grid-cols-1 cardMD:p-3 gap-x-10 justify-center mx-auto relative">
          <div className="text-slate-400 font-serif max-w-2xl">
            <h1 className="leading-[1.05] text-7xl sm:text-6xl tm:text-4xl text-slate-200 mb-2 animate-animeDown duration-1000">
              Cada obra tem o seu <span className="font-semibold">poder</span>{' '}
              com suas próprias{' '}
              <span className="font-semibold">
                histórias<span className="text-violet-600">.</span>
              </span>
            </h1>
            <span className="inline-block text-md w-[390px] cardMD:w-[auto] cardMD:text-md text-slate-300 font-roboto mt-2">
              Compartilhe suas experiências, mostre suas reflexões e observe as
              visões de outros amantes do cinema.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
