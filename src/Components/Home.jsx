import React from 'react';
import Header from './Header';
import Main from './Main';

const Home = () => {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearchValueChange = (value) => {
    setSearchValue(value);
  };

  return (
    <div className="box-border bg-gray-900 pt-10 m-0  ">
      <Header onSearchValueChange={handleSearchValueChange} />
      <Main searchValue={searchValue} />
    </div>
  );
};

export default Home;
