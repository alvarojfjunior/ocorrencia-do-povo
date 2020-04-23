import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../../assets/logo.png';
import './styles.css';

function AppBar(props) {
    return (
        <div className="loading-container">
            <img src={logo}/>
            <div class="spinner dotted"></div>
        </div>
    );
}

export default connect(state => ({ state }))(AppBar);