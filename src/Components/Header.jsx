import React from 'react';
import Input from './Forms/Input';
import IconSearch from '../Assets/i-search.svg';
import iconGitHub from '../Assets/i-github.svg';
import { NavLink } from 'react-router-dom';

const Header = ({ onSearchValueChange }) => {
  const [searchValue, setSearchValue] = React.useState('');
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    onSearchValueChange(event.target.value);
  };
  return (
    <header className="w-full fixed top-0 bg-gray-950 shadow-md z-50">
      <nav className=" h-20 max-w-5xl mx-auto flex flex-wrap items-center justify-between lg:justify-around lg:max-w-5xl ">
        <div>
          <NavLink className="flex items-center ml-4 " to="/">
            <p className="font-gabarito font-thin text-2xl text-gray-200 ">
              Nights
              <span className="text-[rgba(107,66,178)] p-0.5 px-2 bg-transparent rounded-lg mx-1 font-limelight font-bold shadow-[0px_3px_0px_0px_rgba(107,66,178)]">
                4
              </span>
              <span className="font-gabarito">Films</span>
            </p>
          </NavLink>
        </div>
        <div className="flex items-center ">
          <Input
            type="text"
            name="searchFilme"
            backgroundImage={`url(${IconSearch})`}
            backgroundPosition={`5% 48%`}
            width={250}
            placeholder={'Digite o nome do filme...'}
            value={searchValue} // Valor do input é controlado pelo estado
            onChange={handleSearchChange} // Função para atualizar o estado quando o input muda
          />
        </div>
        <div className="opacity-20 transition-opacity hover:opacity-60">
          <a href="https://github.com/Skitttz" target="_blank" rel="noreferrer">
            <img src={iconGitHub} alt="" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
