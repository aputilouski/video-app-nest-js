import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';

const AuthContext = React.createContext();

export const ProvideAuth = ({ children }) => {
  const [auth, setAuth] = React.useState(null);

  React.useEffect(() => {
    axios.defaults.headers.common['authorization'] = auth?.token;
  }, [auth?.token]);

  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);

export const AuthController = () => {
  const location = useLocation();
  const [context] = useAuth();
  return context || location.pathname === '/' ? <Outlet /> : <Navigate to="/" />;
};
