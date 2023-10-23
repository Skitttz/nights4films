import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import NotFound404 from './Components/Helper/NotFound404';
import './App.css';
import Footer from './Components/Footer';
import FilmView from './Components/Films/FilmView';
import Header from './Components/Header';
import Login from './Components/User/Login';
import { UserStorage } from './Hooks/useUser';
import { ToastContainer, Slide } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <div className="font-roboto h-[calc(100vh+25rem)] cardMD:h-[calc(100vh+40rem)] box-border bg-gray-900 m-0 flex flex-col">
            <Header onSearchValueChange={0} />
            <ToastContainer
              position="top-center"
              transition={Slide}
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login/*" element={<Login />} />
                <Route path="/filmes/:id" element={<FilmView />} />
                <Route path="*" element={<NotFound404 />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
