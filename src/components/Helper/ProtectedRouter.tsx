import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUser';
import SessionFeedback from './SessionFeedback';

const ProtectedRouter = ({ children }: { children: React.ReactNode }) => {
  const { login } = useUserContext();
  const location = useLocation();
  if (login === true) {
    return <>{children}</>;
  } else if (login === false) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  } else {
    return <SessionFeedback />;
  }
};

export default ProtectedRouter;
