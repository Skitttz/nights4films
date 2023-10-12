import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import PasswordLostForm from './PasswordLostForm';
import NotFound404 from '../../Helper/Error404/NotFound404';

const Login = () => {
  return (
    <section>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="recuperar" element={<PasswordLostForm />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
