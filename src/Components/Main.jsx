import React from 'react';
import CardsFilm from './Films/CardsFilm';

const Main = ({ searchValue }) => {
  return (
    <div className="mx-auto max-w-5xl pt-24">
      <CardsFilm searchValue={searchValue} />
    </div>
  );
};

export default Main;
