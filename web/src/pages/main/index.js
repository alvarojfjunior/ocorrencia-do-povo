import React from 'react';
import './styles.css';

import { connect } from 'react-redux';

import ListOccurrences from '../../components/ListOccurrences';
import AppBar from '../../components/AppBar';

function Main(props) {

    const handleAddToHomescreenClick = () => {
        alert(`
          1. Open Share menu
          2. Tap on "Add to Home Screen" button`);
    };
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