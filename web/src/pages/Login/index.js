import React, { useState } from 'react';

import { connect } from 'react-redux';

import './styles.css';

import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import AppBar from '../../components/AppBar'

function Login(props) {
    const [showSignIn, setShowSignIn] = useState(true);

    const onChangeSiginIn = e => {
        e.preventDefault();
        setShowSignIn(!showSignIn)
    }


    return (
        <div>
            <AppBar />
            <div className="login-container">
                {showSignIn ? <SignIn /> : <SignUp />}
                <button onClick={onChangeSiginIn}>{showSignIn ? 'Ainda não tenho conta' : 'Já possuo conta, entrar!'}</button>
            </div>
        </div >
    );
}

export default connect(state => ({ state }))(Login);