import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  customStyle?: string;
}

const Button = ({ children, customStyle, ...props }: ButtonProps) => {
  const defaultStyle = `bg-slate-900 hover:bg-slate-500 transition-colors hover:text-slate-800 text-slate-300 py-4 px-8 rounded-lg`;
  const classNameButton = customStyle
    ? `${customStyle} disabled:opacity-60`
    : `${defaultStyle} disabled:opacity-60`
  return (
    <button
      {...props}
      className={
        classNameButton
      }
    >
      {children}
    </button>
  );
};

export default Button;
