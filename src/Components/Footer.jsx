import React from 'react';

const Footer = () => {
  return (
    <div className="grid justify-center bg-gray-900 py-3 border-t border-t-gray-400  border-opacity-5">
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
