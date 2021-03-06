import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './styles.css';

function AppBar(props) {
    return (
        <div className="app-bar">
            <h1>
            <Link to='/'>App dos pets desaparecidos</Link>
            </h1>
            <nav>
                {props.btnPostVisible !== false ? <Link className="button-new-post" to='/post'>OMG! MEU PET SUMIU!</Link> : <></>}
            </nav>
        </div>
    );
}

export default connect(state => ({ state }))(AppBar);