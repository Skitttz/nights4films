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
  // width,
  height,
  backgroundImage,
  backgroundPosition,
}) => {
  const inputStyle = {
    height: height || 'auto', // Se a altura não for fornecida, use "auto"
    // width: width || 'auto',
    backgroundImage: backgroundImage || 'initial',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: backgroundPosition || 'initial',
  };
  return (
    <div className={'flex justify-center items-center'}>
      {label ? (
        <label htmlFor="" className="">
          {label}
        </label>
      ) : (
        ''
      )}

      <input
        className="block transition-colors duration-500 border border-solid border-transparent hover:border hover:border-slate-300 w-[20rem]  p-2 rounded-md bg-gray-800 indent-7 placeholder:text-[1.125rem] placeholder:translate-y-[0.1rem] placeholder:text-gray-600 text-slate-200 opacity-70 focus:opacity-100	placeholder:italic 
        placeholder:lg:text-base lg:w-[20rem] 
        placeholder:sm:text-base sm:w-[14rem] 
        placeholder:tm:text-sm tm:indent-5 tm:w-[8rem] tm:text-sm"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder ? placeholder : ''}
        style={inputStyle}
      />
      {error}
    </div>
  );
};

export default Input;
