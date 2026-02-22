import React from 'react';
import Error from '../Helper/Error';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  name: string;
  value: string;
  setValue?: (value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  width?: string;
  height?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  customStyleDiv?: string;
  customStyleInput?: string;
  labelStyle?: string;
}

const Input = ({
  label,
  type,
  name,
  value,
  setValue,
  onChange,
  error,
  onBlur,
  placeholder,
  width,
  height,
  backgroundImage,
  backgroundPosition,
  customStyleDiv,
  customStyleInput,
  labelStyle,
}: InputProps) => {
  const inputStyle: React.CSSProperties = {
    height: height || 'auto', // Se a altura não for fornecida, use "auto"
    width: width || '',
    backgroundImage: backgroundImage || 'Inherited',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: backgroundPosition || 'initial',
  };
  return (
    <div className={`${customStyleDiv}`}>
      {label ? (
        <label htmlFor={name} className={`${labelStyle}`}>
          {label}
        </label>
      ) : (
        ''
      )}

      <input
        className={`block transition-colors duration-500 border border-solid border-transparent  hover:border hover:border-slate-300 w-[20rem]  p-2 rounded-md bg-gray-800 placeholder:text-[1.125rem] placeholder:translate-y-[0.1rem] placeholder:text-gray-600 text-slate-200 opacity-70 focus:opacity-100	placeholder:italic 
        placeholder:lg:text-base lg:w-[20rem] 
        placeholder:sm:text-base sm:w-[15rem] 
        placeholder:tm:text-sm tm:text-sm ${customStyleInput}`}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder ? placeholder : ''}
        style={inputStyle}
      />
      {error && <Error error={error} />}
    </div>
  );
};

export default Input;
