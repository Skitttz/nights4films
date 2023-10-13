import React from 'react';
import Input from './Forms/Input';
import IconSearch from '../Assets/i-search.svg';
import useDebounce from '../Hooks/useDebounce';
import imgLougout from '../Assets/i-logout.png';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../Hooks/useUser';

const Header = ({ onSearchValueChange }) => {
  const [searchValue, setSearchValue] = React.useState('');
  const debouncedChange = useDebounce(onSearchValueChange, 300);
  const { data, userLogout } = useUserContext();
  const navigate = useNavigate();

  function handleLogout() {
    userLogout();
    navigate('/login');
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    debouncedChange(event.target.value);
  };

  return (
    <>
      <header className="fixed z-1 w-full top-0 bg-gray-950 shadow-md z-50  ">
        <nav className=" h-16 max-w-5xl mx-auto flex flex-wrap items-center justify-between lg:justify-around lg:max-w-5xl tm:justify-center tm:max-w-5xl tm:flex-nowrap tm:gap-4 ">
          <div>
            <Link
              className="flex items-center ml-7 tm:ml-2"
              to={'/'}
              onClick={() => {
                setSearchValue('');
                handleSearchChange();
              }}
            >
              <p className="font-gabarito font-thin text-2xl text-gray-200 sm:text-lg">
                Nights
                <span className="text-[rgba(107,66,178)] p-0.5 px-2 bg-transparent rounded-lg mx-1 font-limelight font-bold shadow-[0px_3px_0px_0px_rgba(107,66,178)] hover:animate-wiggle">
                  4
                </span>
                <span className="font-gabarito">Films</span>
              </p>
            </Link>
          </div>
          <div className="flex items-center">
            {onSearchValueChange ? (
              <Input
                type="text"
                name="searchFilme"
                backgroundImage={`url(${IconSearch})`}
                backgroundPosition={`3% 45%`}
                customStyleInput={'indent-7'}
                placeholder={'Digite o nome do filme...'}
                value={searchValue} // Valor do input é controlado pelo estado
                onChange={handleSearchChange} // Função para atualizar o estado quando o input muda
              />
            ) : (
              ''
            )}
          </div>
          {data ? (
            <div className="flex gap-x-2">
              <Link to={'/'}>
                <div className="text-purple-300 font-roboto p-2 bg-purple-800 opacity-90 hover:opacity-100 rounded-lg ">
                  <div className="bg-purple-800">
                    <p>
                      {`Olá, `}
                      <span className="text-slate-200 font-bold">{`${data.username}`}</span>
                    </p>
                  </div>
                </div>
              </Link>
              <div className=" rounded-sm py-2">
                <a className="cursor-pointer" onClick={handleLogout}>
                  <img
                    className="w-[24px] invert-[.99] sepia-[.01] saturate-[0] hue-rotate-[268deg] brightness-[1.05] contrast-100"
                    src={imgLougout}
                    alt=""
                  />
                </a>
              </div>
            </div>
          ) : (
            <Link to={'/login'}>
              <div className=" text-slate-300 hover:text-slate-100 p-2 bg-[rgba(107,46,178)] hover:bg-[rgba(107,20,178)]  rounded-md transition-colors duration-300 font-gabarito mr-4">
                <p>Login / Registrar</p>
              </div>
            </Link>
          )}
        </nav>
      </header>
      <div className="pb-[2.5rem]"></div>
    </>
  );
};

export default Header;
