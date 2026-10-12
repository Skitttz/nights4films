import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import Loading from "./components/Helper/Loading";
import ProtectedRoute from "./components/Helper/ProtectedRouter";
import ScrollToTop from "./components/ScrollToTop";
import { toastConfig } from "./constants/toast";
import { UserStorage } from "./hooks/useUser";
import { createQueryClient, queryPersistenceOptions } from "./lib/queryClient";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/UserLogin"));
const FilmView = lazy(() => import("./pages/FilmView"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const NotFound404 = lazy(() => import("./pages/NotFound404"));

const queryClient = createQueryClient();

const App: React.FC = () => {
  return (
    <div className="app scroll-smooth">
      <BrowserRouter>
        <PersistQueryClientProvider client={queryClient} persistOptions={queryPersistenceOptions}>
          <UserStorage>
            <div className="font-roboto min-h-screen bg-gray-900 flex flex-col">
              <Header />
              <ToastContainer {...toastConfig} />

              <main className="flex-1">
                <Suspense fallback={<Loading />}>
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
        </PersistQueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
