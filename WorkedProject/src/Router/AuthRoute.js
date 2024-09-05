import React from 'react';
import { Route, Navigate } from 'react-router-dom';
const unAuthorizedRoutes = ['/', '/signup']

const AuthRoutes = ({ component, path }) => {

    const isAuthenticated = localStorage.getItem('Authenticated');

    if (!isAuthenticated) {
        if (!unAuthorizedRoutes.includes(path)) {
            return <Navigate to='/' />
        } else {
            return <Route exact path={path} component={component} />
        }
    }
    if (isAuthenticated) {
        if (unAuthorizedRoutes.includes(path)) {
            return <Navigate to='/not-found' />
        }
        else {
            return <Route exact path={path} component={component} />
        }
    }
}

export default AuthRoutes