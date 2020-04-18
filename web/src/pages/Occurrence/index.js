import React from 'react';

import { connect } from 'react-redux';

import './styles.css';

import AppBar from '../../components/AppBar'

function Occurrence(props) {

    return (
        <div>
            <AppBar></AppBar>
            <div className="occurrence-container">
                <div className="box-imgs">
                <img className="main-img" src="https://cdn-istoedinheiro-ssl.akamaized.net/wp-content/uploads/sites/17/2020/03/cdbab406b5f84549439b68d43f62a7c31154c55a-768x432.jpg" alt="Logo" />
                <img className="main-img" src="https://cdn-istoedinheiro-ssl.akamaized.net/wp-content/uploads/sites/17/2020/03/cdbab406b5f84549439b68d43f62a7c31154c55a-768x432.jpg" alt="Logo" />
                </div>
            
            </div>
        </div>
    );
}

export default connect(state => ({ state }))(Occurrence);