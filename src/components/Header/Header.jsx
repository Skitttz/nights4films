import { UserOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useRef, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import imgLougout from '../../assets/i-logout.png';
import IconSearch from '../../assets/i-search.svg';
import useDebounce from '../../hooks/useDebounce';
import { useUserContext } from '../../hooks/useUser';
import Input from '../Forms/Input';
import CapitalizeLetter from '../Helper/CapitalizeLetter';
import styles from './Header.module.css';
import HeaderSkeleton from './HeaderLoading';

const Header = ({ onSearchValueChange }) => {
  const { pathname } = useLocation();

  const [searchValue, setSearchValue] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const debouncedChange = useDebounce(onSearchValueChange, 300);
  const { data, userLogout, loading } = useUserContext();
  const [openMenuMB, setOpenMenuMB] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const refNav = useRef(null);
  const navigate = useNavigate();

  const isDesktop = window.innerWidth > 768;
  const isDifPathLoginUser = pathname !== '/login';
  const isLoadingHeaderDesktop = loading && isDesktop && isDifPathLoginUser;

  const handleOutsideClick = (event) => {
    if (
      refNav.current &&
      !refNav.current.contains(event.target) &&
      openMenuMB
    ) {
      handleCloseMenu();
    }
  };

  if (openMenuMB) {
    window.addEventListener('click', handleOutsideClick, true);
  } else {
    window.removeEventListener('click', handleOutsideClick, true);
  }
  if (isLoadingHeaderDesktop) {
    return <HeaderSkeleton />;
  }

  const handleLogout = () => {
    userLogout();
    navigate('/login');
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseMenu = () => {
    setIsClosing(true); // ativa a animação de fechar
    setTimeout(() => {
      setIsClosing(false);
      setOpenMenuMB(false);
    }, 250); // Tempo para a animação completar
  };

  const handleToggleMenu = () => {
    if (openMenuMB && !isClosing) {
      handleCloseMenu();
    } else if (!openMenuMB && !isClosing) {
      setOpenMenuMB(true);
    }
  };

  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
    debouncedChange(event.target.value);
  };

  const getAnimationClass = () => {
    if (isClosing) {
      return styles['mobile-animate-animeUp'];
    }
    if (openMenuMB) {
      return styles['mobile-animate-animeDown'];
    }
    return '';
  };

  return (
    <>
      {openModal && (
        <Modal
          title="Deseja sair da sua conta?"
          open={openModal}
          onOk={handleLogout}
          onCancel={() => setOpenModal(false)}
          okText="Desconectar"
          cancelText="Ficar"
          centered
          className="[&>div:first-child>div]:bg-gray-950 [&>div:first-child>div>div]:bg-gray-950 [&>div:first-child>div>div>div]:!text-gray-100 text-gray-100"
          okButtonProps={{
            className:
              'bg-red-800 hover:!bg-red-700 text-white transition-all font-semibold',
          }}
          cancelButtonProps={{
            className:
              'bg-purple-800 hover:!bg-purple-700 border border-purple-700  hover:!border-purple-600 text-gray-200 hover:!text-gray-200 font-semibold transition-all',
          }}
        >
          <p className="text-gray-300">
            Você será desconectado e voltará à tela de login.
          </p>
        </Modal>
      )}
      <header className="fixed z-30 w-full top-0 bg-gray-950 shadow-md">
        <nav
          ref={refNav}
          className={`h-16 max-w-7xl mx-auto flex flex-wrap items-center justify-between lg:justify-between lg:max-w-5xl tm:max-w-5xl tm:flex-nowrap tm:gap-4 overflow-hidden transition-[max-height] duration-600 ease-in-out ${
            openMenuMB || isClosing
              ? `flex-col h-[auto] gap-y-10 mt-4 border-b border-b-purple-900 border-opacity-60 ${getAnimationClass()}`
              : 'cardMD:flex-row'
          }`}
        >
          <div>
            <Link
              className={`flex items-center select-none  ${
                openMenuMB || isClosing ? 'ml-0' : 'ml-7'
              }`}
              to={'/'}
              onClick={() => {
                setSearchValue('');
                if (openMenuMB) {
                  handleCloseMenu();
                }
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
            onClick={handleToggleMenu}
            className={`hidden cardMD:order-1 cardMD:block h-6 w-6 cursor-pointer text-[rgba(107,80,178,.9)] hover:text-[rgba(107,66,178,1)] cardMD:mr-3 transition-transform duration-200 ${
              openMenuMB || isClosing
                ? 'cardMD:mb-4 ml-auto rotate-90'
                : 'rotate-0'
            }`}
          />
          <div
            className={`flex items-center ${
              openMenuMB || isClosing
                ? 'cardMD:block mt-3 mb-3'
                : 'cardMD:hidden'
            }`}
          >
            {onSearchValueChange ? (
              <Input
                type="text"
                name="searchFilme"
                backgroundImage={`url(${IconSearch})`}
                backgroundPosition={'3% 45%'}
                customStyleInput={'indent-7 tm:indent-6 '}
                placeholder={'Digite o nome do filme...'}
                value={searchValue}
                onChange={handleSearchChange}
              />
            ) : (
              ''
            )}
          </div>
          {data ? (
            <div
              className={`${
                openMenuMB || isClosing ? 'cardMD:block' : 'cardMD:hidden'
              }  flex gap-x-2 xm:pr-4`}
            >
              <div
                className={`text-purple-100 font-roboto font-light p-2  ${
                  pathname === '/perfil' ? 'bg-opacity-100' : 'bg-opacity-20'
                } transition-all opacity-90 hover:opacity-100 rounded-lg `}
              >
                <div className="">
                  <p className="text-center">
                    {'Olá, '}
                    <span className="text-slate-200 font-bold">{`${CapitalizeLetter(
                      data.username,
                    )}`}</span>
                  </p>
                </div>
              </div>
              <Link
                to={'/perfil'}
                className="mr-1 tm:mr-0"
                onClick={() => {
                  if (openMenuMB) {
                    handleCloseMenu();
                  }
                }}
              >
                <div
                  className={`text-purple-100 font-roboto font-light p-2 bg-purple-800 hover:bg-opacity-100 ${
                    pathname === '/perfil' ? 'bg-opacity-100' : 'bg-opacity-60'
                  } transition-all opacity-90 hover:opacity-100 rounded-lg `}
                >
                  <div className="flex items-center">
                    <UserOutlined className="mr-1" />
                    <p className="font-bold">{'Meu Perfil '}</p>
                  </div>
                </div>
              </Link>
              <div
                className={`rounded-sm py-2 ${
                  openMenuMB || isClosing
                    ? 'cardMD:block mt-4'
                    : 'cardMD:hidden'
                } `}
              >
                <button
                  type="button"
                  className="cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={handleOpenModal}
                >
                  <img
                    className="cardMD:mx-auto w-[24px] invert-[.99] sepia-[.01] saturate-[0] hue-rotate-[268deg] brightness-[1.05] contrast-100"
                    src={imgLougout}
                    alt=""
                  />
                </button>
              </div>
            </div>
          ) : (
            <Link
              className={` ${
                openMenuMB || isClosing ? 'cardMD:block ' : 'cardMD:hidden'
              }`}
              to={'/login'}
              onClick={() => {
                if (openMenuMB) {
                  handleCloseMenu();
                }
              }}
            >
              <div className=" text-slate-300 hover:text-slate-100 p-2 bg-[rgba(107,46,178)] hover:bg-[rgba(107,20,178)]  rounded-md transition-colors duration-300 font-gabarito mr-4 ">
                <p>Login / Registrar</p>
              </div>
            </Link>
          )}
        </nav>
      </header>
      <div className="pb-[2.5rem]" />
    </>
  );
};

export default Header;
