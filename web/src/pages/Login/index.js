import React, { useState } from 'react';

import { connect } from 'react-redux';

import './styles.css';

import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';

function Login(props) {
    const [showSignIn, setShowSignIn] = useState(true);

    const onChangeSiginIn = e => {
        e.preventDefault();
        setShowSignIn(!showSignIn)
    }


    return (
        <div className="login-container">
            {showSignIn ? <SignIn /> : <SignUp /> }
            <button onClick={onChangeSiginIn}>{showSignIn ? 'Ainda não tenho conta' : 'Já possuo conta, entrar!' }</button>
        </div>
    );
}

export default connect(state => ({ state }))(Login);