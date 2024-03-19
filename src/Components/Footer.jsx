import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  let { pathname } = useLocation();
  return (
    <div
      className={`grid justify-center items-center ${
        pathname === '/' ? 'bg-gray-900' : 'bg-slate-950'
      } py-3 border-t border-t-gray-400 border-opacity-5 cardMD:h-auto z-1`}
    >
      <p className="font-gabarito text-slate-500">
        © 2023 - 2023 │ Desenvolvido por
        <a
          className="text-slate-100"
          href="https://github.com/Skitttz"
          target="_blank"
          rel="noreferrer"
        >
          {' '}
          skittz
        </a>
      </p>
    </div>
  );
};

export default Footer;
