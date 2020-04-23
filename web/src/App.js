import React from 'react';

import Routes from './routes';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import './global.css';

import store from './store';
import Snackbar from './components/Snackbar';
import Loading from './components/Loading';



function App() {
  return (
    <Provider store={store}>
      {
        store.getState().loading.visible ? <Loading /> :
          <div>
            <Routes></Routes>
            <Snackbar></Snackbar>
          </div>
      }
    </Provider>
  );
}

export default App;
