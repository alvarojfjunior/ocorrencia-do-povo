import React, {useState, ReactDOM} from 'react';

import { connect } from 'react-redux';

import './styles.css';

import * as postActions from '../../store/actions/post';

function PostOccurrences(props) {
    const [userName, setUserName] = useState('');
    const [titlePost, setTitlePost] = useState('');
    const [descriptionPost, setDescriptionPost] = useState('');
    
    return (
        <div>
            <h1>Post form</h1>
        </div>
    );
}

export default connect(state => ({ state }))(PostOccurrences);