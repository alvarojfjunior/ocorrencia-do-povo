import React from 'react';
import Routes from './routes';

import './global.css';
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <Routes></Routes>
    </Provider>
  );
}

export default App;
