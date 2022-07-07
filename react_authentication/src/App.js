import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UserRoute from './components/UserRoute';
import { useDispatch } from "react-redux"
import { auth } from "./firebase"
import { setUser } from './redux/action';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <UserRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/resetPassword" component={ResetPassword} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
