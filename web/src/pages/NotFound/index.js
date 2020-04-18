import React from 'react';

import { connect } from 'react-redux';

import './styles.css';

function NotFound(props) {
    
    return (
        <div>
            <h1>Ops, esta rota não existe!</h1>
        </div>
    );
}

export default connect(state => ({ state }))(NotFound);