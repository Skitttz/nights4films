import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import PasswordLostForm from './PasswordLostForm';
import NotFound404 from '../Helper/NotFound404';
import { useUserContext } from '../../Hooks/useUser';

const Login = () => {
  const { login } = useUserContext();
  if (login === true) {
    return <Navigate to="/" />;
  } else if (login === false) {
    return (
      <section>
        <div>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/recuperar" element={<PasswordLostForm />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </div>
      </section>
    );
  } else {
    return <></>;
  }
};

export default Login;
