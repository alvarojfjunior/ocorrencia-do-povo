import React from 'react';

import './styles.css';

import PostOccurences from '../../components/PostOccurrences';
import ListOccurrences from '../../components/ListOccurrences';
import AppBar from '../../components/AppBar';

function Main() {
    return (
        <div>
            <AppBar></AppBar>
            <PostOccurences></PostOccurences>
            <ListOccurrences></ListOccurrences>
        </div>
    );
}

export default Main;
