import React from 'react';

const Button = ({ children, customStyle, ...props }) => {
  const defaultStyle = `bg-slate-900 hover:bg-slate-500 transition-colors hover:text-slate-800 text-slate-300 py-4 px-8 rounded-lg`;
  return (
    <button
      {...props}
      className={customStyle ? `${customStyle}` : ` ${defaultStyle}`}
    >
      {children}
    </button>
  );
};

export default Button;
