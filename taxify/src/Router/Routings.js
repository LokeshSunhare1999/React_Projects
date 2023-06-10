import React from 'react'
import { BrowserRouter, Routes, Route, Link, } from 'react-router-dom';
import Login from '../Screens/Auth/Login';
import * as routes from '../Router/RoutesURL';
import SignUp from '../Screens/Auth/SignUp';

export const Routings = () => {
    <BrowserRouter>
        <Routes>
            <Route path='/' exact element={<Login />}/>
            <Route path={routes.LOGIN} element={<SignUp />}/>
     </Routes>
    </BrowserRouter>
}
