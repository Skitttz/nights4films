import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import NotFound404 from './Helper/Error404/NotFound404';
import './App.css';
import Footer from './Components/Footer';
import FilmView from './Components/Films/FilmView';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <div className="font-roboto h-[calc(100vh+10rem)] box-border bg-gray-900 m-0">
        <BrowserRouter>
          <Header onSearchValueChange={0} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/filmes/:id" element={<FilmView />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
