import { useState } from 'react';
import Header from '../components/Header/Header';
import Intro from '../components/Intro';
import Main from '../components/Main';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValueChange = (value) => {
    setSearchValue(value);
  };

  return (
    <div className="box-border bg-gray-900 m-0 pb-64">
      <Header onSearchValueChange={handleSearchValueChange} />
      <Intro />
      <Main searchValue={searchValue} />
    </div>
  );
};

export default Home;
