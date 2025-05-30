import { QueryClientProvider } from '@tanstack/react-query';
import { Spin } from 'antd';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import ProtectedRoute from './components/Helper/ProtectedRouter';
import ScrollToTop from './components/ScrollToTop';
import { toastConfig } from './constants/toast';
import { UserStorage } from './hooks/useUser';
import { createQueryClient } from './lib/queryClient';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/UserLogin'));
const FilmView = lazy(() => import('./pages/FilmView'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const NotFound404 = lazy(() => import('./pages/NotFound404'));

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <Spin size="large" />
  </div>
);

const queryClient = createQueryClient();

function App() {
  return (
    <div className="app scroll-smooth">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <UserStorage>
            <div className="font-roboto min-h-screen bg-gray-900 flex flex-col">
              <Header />

              <ToastContainer {...toastConfig} />

              <main className="flex-1">
                <Suspense fallback={<LoadingSpinner />}>
                  <ScrollToTop />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login/*" element={<Login />} />
                    <Route path="/filmes/:id" element={<FilmView />} />
                    <Route
                      path="/perfil"
                      element={
                        <ProtectedRoute>
                          <UserProfile />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<NotFound404 />} />
                  </Routes>
                </Suspense>
              </main>

              <Footer />
            </div>
          </UserStorage>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
