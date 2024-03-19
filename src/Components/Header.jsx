import React from 'react';
import Input from './Forms/Input';
import IconSearch from '../Assets/i-search.svg';
import useDebounce from '../Hooks/useDebounce';
import imgLougout from '../Assets/i-logout.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { useUserContext } from '../Hooks/useUser';
import { UserOutlined } from '@ant-design/icons';
import CapitalizeLetter from './Helper/CapitalizeLetter';

const Header = ({ onSearchValueChange }) => {
  const { pathname } = useLocation();

  const [searchValue, setSearchValue] = React.useState('');
  const debouncedChange = useDebounce(onSearchValueChange, 300);
  const { data, userLogout } = useUserContext();
  const [openMenuMB, setOpenMenuMB] = React.useState(false);
  const refNav = React.useRef(null);
  const navigate = useNavigate();

  function handleLogout() {
    userLogout();
    navigate('/login');
  }

  const handleOutsideClick = (event) => {
    if (
      refNav.current &&
      !refNav.current.contains(event.target) &&
      openMenuMB
    ) {
      setOpenMenuMB(false);
    }
  };

  if (openMenuMB) {
    window.addEventListener('click', handleOutsideClick, true);
  } else {
    window.removeEventListener('click', handleOutsideClick, true);
  }

  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
    debouncedChange(event.target.value);
  };

  return (
    <>
      <header className={`fixed z-30 w-full top-0 bg-gray-950 shadow-md`}>
        <nav
          ref={refNav}
          className={`h-16 max-w-7xl mx-auto flex flex-wrap items-center justify-between lg:justify-between lg:max-w-5xl tm:max-w-5xl tm:flex-nowrap tm:gap-4 ${
            openMenuMB
              ? 'flex-col h-[auto] gap-y-10 mt-4 border-b border-b-purple-900 border-opacity-60 cardMD:animate-animeDown'
              : 'cardMD:flex-row cardMD:animate-animeTop'
          }`}
        >
          <div>
            <Link
              className={`flex items-center select-none  ${
                openMenuMB ? 'ml-0' : 'ml-7'
              }`}
              to={'/'}
              onClick={() => {
                setSearchValue('');
              }}
            >
              <p className="font-gabarito font-thin text-2xl text-gray-200 ">
                Nights
                <span className="text-[rgba(107,66,178)] p-0.5 px-2 bg-transparent rounded-lg mx-1 font-limelight font-bold shadow-[0px_3px_0px_0px_rgba(107,66,178)] hover:animate-wiggle">
                  4
                </span>
                <span className="font-gabarito">Films</span>
              </p>
            </Link>
          </div>
          <FiMenu
            onClick={() => setOpenMenuMB(!openMenuMB)}
            className={` hidden cardMD:order-1 cardMD:block h-6 w-6 cursor-pointer text-[rgba(107,80,178,.9)] hover:text-[rgba(107,66,178,1)] cardMD:mr-3 ${
              openMenuMB ? 'cardMD:mb-4 ml-auto' : ''
            }`}
          ></FiMenu>
          <div
            className={`flex items-center ${
              openMenuMB ? 'cardMD:block mt-3 mb-3' : 'cardMD:hidden'
            }`}
          >
            {onSearchValueChange ? (
              <Input
                type="text"
                name="searchFilme"
                backgroundImage={`url(${IconSearch})`}
                backgroundPosition={`3% 45%`}
                customStyleInput={'indent-7 tm:indent-6 '}
                placeholder={'Digite o nome do filme...'}
                value={searchValue} // Input value is controlled by the state
                onChange={handleSearchChange} // Update the state when the input changes
              />
            ) : (
              ''
            )}
          </div>
          {data ? (
            <div
              className={`${
                openMenuMB ? 'cardMD:block' : 'cardMD:hidden'
              }  flex gap-x-2 xm:pr-4`}
            >
              <div
                className={`text-purple-100 font-roboto font-light p-2  ${
                  pathname === '/perfil' ? 'bg-opacity-100' : 'bg-opacity-20'
                } transition-all opacity-90 hover:opacity-100 rounded-lg `}
              >
                <div className="">
                  <p className="text-center">
                    {`Olá, `}
                    <span className="text-slate-200 font-bold">{`${CapitalizeLetter(
                      data.username,
                    )}`}</span>
                  </p>
                </div>
              </div>
              <Link to={'/perfil'} className="mr-1 tm:mr-0">
                <div
                  className={`text-purple-100 font-roboto font-light p-2 bg-purple-800 hover:bg-opacity-100 ${
                    pathname === '/perfil' ? 'bg-opacity-100' : 'bg-opacity-60'
                  } transition-all opacity-90 hover:opacity-100 rounded-lg `}
                >
                  <div className="flex items-center">
                    <UserOutlined className="mr-1" />
                    <p className="font-bold">{`Meu Perfil `}</p>
                  </div>
                </div>
              </Link>
              <div
                className={`rounded-sm py-2 ${
                  openMenuMB ? 'cardMD:block mt-4' : 'cardMD:hidden'
                } `}
              >
                <a className="cursor-pointer" onClick={handleLogout}>
                  <img
                    className="cardMD:mx-auto w-[24px] invert-[.99] sepia-[.01] saturate-[0] hue-rotate-[268deg] brightness-[1.05] contrast-100"
                    src={imgLougout}
                    alt=""
                  />
                </a>
              </div>
            </div>
          ) : (
            <Link
              className={` ${openMenuMB ? 'cardMD:block ' : 'cardMD:hidden'}`}
              to={'/login'}
            >
              <div className=" text-slate-300 hover:text-slate-100 p-2 bg-[rgba(107,46,178)] hover:bg-[rgba(107,20,178)]  rounded-md transition-colors duration-300 font-gabarito mr-4 ">
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
