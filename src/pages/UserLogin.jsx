import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from '../components/User/LoginForm';
import PasswordLostForm from '../components/User/PasswordLostForm';
import RegisterForm from '../components/User/RegisterForm';
import { useUserContext } from '../hooks/useUser';
import NotFound404 from '../pages/NotFound404';

const LoginRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginForm />} />
    <Route path="/register" element={<RegisterForm />} />
    <Route path="/recuperar" element={<PasswordLostForm />} />
    <Route path="*" element={<NotFound404 />} />
  </Routes>
);

const Login = () => {
  const { login } = useUserContext();

  if (login === true) return <Navigate to="/" />;
  if (login === false) {
    return (
      <section>
        <div>
          <LoginRoutes />
        </div>
      </section>
    );
  }

  return <></>;
};

export default Login;
