import React from 'react';

import { connect } from 'react-redux';

import * as snackBarActions from '../../store/actions/snackbar';
import './styles.css';

function Snackbar(props) {

    if (props.state.snackbar.visible) {
        setTimeout(() => {
            props.dispatch(snackBarActions.setSnackbar(false)); 
        }, 2000); 
    }
    
    function handleCloseSnackBar(e) {
        e.preventDefault();
        props.dispatch(snackBarActions.setSnackbar(false));
    }

    return (
        <div className="snackbar-container" style={props.state.snackbar.visible ? {height: "50px"} : {height: "0px"}}>
            <span>Pronto!</span>
	        <button onClick={handleCloseSnackBar}>OK</button>
        </div>
    );
}

export default connect(state => ({ state }))(Snackbar);