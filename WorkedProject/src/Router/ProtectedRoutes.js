
import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'

const useAuth = () => {
  try {
    const isAuthenticated = localStorage.getItem('Authenticated');
    return Boolean(isAuthenticated === 'true');
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return false;
  }
};

const  ProtectedRoutes = () => {
  const auth=useAuth();
  return auth?<Outlet/>: <Navigate to="/login"/>
}

export default ProtectedRoutes;