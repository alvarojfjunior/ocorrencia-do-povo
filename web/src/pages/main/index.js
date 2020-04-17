import React from 'react';
import './styles.css';

import { connect } from 'react-redux';

import PostOccurences from '../../components/PostOccurrences';
import ListOccurrences from '../../components/ListOccurrences';
import AppBar from '../../components/AppBar';

function Main(props) {
    return (
        <div className="main-container">
            <AppBar></AppBar> 
            <ListOccurrences></ListOccurrences>
        </div>
    );
}

export default connect(state => ({ state }))(Main);