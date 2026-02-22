import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const { pathname } = useLocation();
  return (
    <footer className="w-full bg-gray-900 border-t border-t-gray-400 border-opacity-5 py-4">
      <div className="max-w-7xl lg:max-w-5xl mx-auto px-4 flex items-center justify-center">
        <p className="font-gabarito text-slate-500 text-sm sm:text-base">
          © 2023 - 2026 │ Desenvolvido por
          <a
            className="text-slate-100 ml-1"
            href="https://github.com/Skitttz"
            target="_blank"
            rel="noreferrer noopener"
          >
            skittz
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
