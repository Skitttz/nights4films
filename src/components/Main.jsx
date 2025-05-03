import React from 'react';
import CardsFilm from './Films/CardsFilm';

const Main = ({ searchValue }) => {
  return (
    <div className="mx-auto max-w-7xl lg:max-w-5xl ">
      <CardsFilm searchValue={searchValue} />
    </div>
  );
};

export default Main;
