import React from 'react';
import './styles.css';

import { connect } from 'react-redux';

import ListOccurrences from '../../components/ListOccurrences';
import AppBar from '../../components/AppBar';

function Main(props) {
    return (
        <div>
            <AppBar></AppBar>
            <div className="main-container">
                <ListOccurrences></ListOccurrences>
            </div>
        </div>
    );
}

export default connect(state => ({ state }))(Main);