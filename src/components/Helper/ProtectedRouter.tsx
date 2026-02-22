import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUser';

const ProtectedRouter = ({ children }: { children: React.ReactNode }) => {
  const { login } = useUserContext();
  if (login === true) {
    return <>{children}</>;
  } else if (login === false) {
    return <Navigate to="/login" />;
  } else {
    return <></>;
  }
};

export default ProtectedRouter;
