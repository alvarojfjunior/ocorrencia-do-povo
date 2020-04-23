import { combineReducers } from 'redux';

import snackbar from './snackbar';
import loading from './loading';

export default combineReducers ({
    snackbar,
    loading,
})