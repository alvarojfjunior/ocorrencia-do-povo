import React from 'react';

import Routes from './routes';
import { Provider } from 'react-redux';
import AddToHomescreen from 'react-add-to-homescreen';

import './global.css';

import store from './store';
import Snackbar from './components/Snackbar';


function App() {

  return (
    <Provider store={store}>
      <Routes></Routes>
      <Snackbar></Snackbar>
    </Provider>
  );
}

export default App;
