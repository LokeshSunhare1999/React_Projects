import React from 'react';

import { Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {
  const isAuthenticated = localStorage.getItem('Authenticated')
  if (isAuthenticated) {
    return true
  } else {
    return false
  }
}

const PublicRoutes = () => {
  const auth = useAuth();
  return auth ? <Navigate to="/master-data" /> : <Outlet />
}

export default PublicRoutes;