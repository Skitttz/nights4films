import React from 'react';
import Head from '../Head';
import Img404 from '../../assets/404.svg';

const NotFound404 = () => {
  return (
    <div>
      <Head title=" » Error 404" />
      <div className="font-gabarito pt-12 grid justify-center items-center content-center text-slate-200 relative animate-animeLeft">
        <div className="mb-3">
          <p className="text-base text-center absolute top-18 left-1/2 transform -translate-x-1/2 ">
            <span className="text-7xl cardMD:text-3xl font-extrabold block ">
              Error 404
            </span>
            Oops! Página não encontrada
          </p>
          <img className="w-[38rem]" src={Img404} alt="" />
        </div>
        <div className="inline-block text-center">
          <a
            className="py-2 px-4 bg-orange-600 rounded-md opacity-90 hover:opacity-100"
            href="/"
          >
            Leve-me de volta para a página inicial
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;
