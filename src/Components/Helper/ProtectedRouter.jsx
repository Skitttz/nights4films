import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../Hooks/useUser';

const ProtectedRouter = ({ children }) => {
  const { login } = useUserContext();
  if (login === true) {
    return children;
  } else if (login === false) {
    return <Navigate to="/login" />;
  } else {
    return <></>;
  }
};

export default ProtectedRouter;
