import Intro from '../components/Intro';
import Main from '../components/Main';

const Home = () => {
  return (
    <div className="box-border bg-gray-900 m-0 pb-64 overflow-x-hidden">
      <Intro />
      <Main />
    </div>
  );
};

export default Home;
