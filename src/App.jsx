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
import UserProfile from './Components/User/UserProfile';
import ProtectedRouter from './Components/Helper/ProtectedRouter';
import ScrollToTop from './Components/ScrollToTop';

function App() {
  return (
    <div className="App scroll-smooth">
      <BrowserRouter>
        <UserStorage>
          <div className="font-roboto h-[calc(100vh+25rem)] cardMD:h-[calc(100vh+60rem)] tm:[calc(100vh+80rem)] box-border bg-gray-900 m-0 flex flex-col">
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
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login/*" element={<Login />} />
                <Route path="/filmes/:id" element={<FilmView />} />
                <Route path="*" element={<NotFound404 />} />

                <Route
                  path="/perfil"
                  element={
                    <ProtectedRouter>
                      <UserProfile />
                    </ProtectedRouter>
                  }
                />
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
