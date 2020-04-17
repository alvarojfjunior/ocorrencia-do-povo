import React from 'react';

import { connect } from 'react-redux';

import './styles.css';

import * as postActions from '../../store/actions/post';

import PostOccurrences from '../PostOccurrences';

function AppBar(props) {
    return (
        <div className="app-bar">
            <h1>
                <a href="#">Ocorrência do Povo</a>
            </h1>
            <nav>
                <button onClick={() => props.dispatch(postActions.setPost(true))} >REGISTRAR OCORRÊNCIA</button>
            </nav>
        </div>
    );
}

export default connect(state => ({ state }))(AppBar);