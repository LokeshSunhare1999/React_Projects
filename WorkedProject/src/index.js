import React from 'react';
import App from './App';
import * as serviceWorker from './serviceworker';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createRoot } from "react-dom/client";
import { ThemeProvider } from '@mui/material';
import { theme } from './assets/Theme/Theme'
import './index.css';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);

serviceWorker.unregister();