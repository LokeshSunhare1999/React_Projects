import React from 'react';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import Routings from './Router/Routings';

const App = () => {
  return (
    <div className="App">
      <Routings />
      <ToastContainer />
    </div >
  );
}

export default App;