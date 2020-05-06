import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { connect } from 'react-redux';

import './styles.css';

function Loading(props) {
    return (
        <div className="loading-container" style={props.state.loading.visible ? {height: '100%'} : {height: '0'}}>
            <ClipLoader
                className="spinner"
                size={200}
                color={"#642484"}
                loading={props.state.loading.visible}
            />
        </div>
    );
}

export default connect(state => ({ state }))(Loading);