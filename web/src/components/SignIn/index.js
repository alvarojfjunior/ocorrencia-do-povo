import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import './styles.css';
import { firebaseAuth } from '../../config/firebase';
import * as loadingActions from '../../store/actions/loading';
import * as snackBarActions from '../../store/actions/snackbar';

function SignIn(props) {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSignIn = async e => {
        e.preventDefault();
        try {
            props.dispatch(loadingActions.setLoading(true, 'Postando ...'));
            let resultAuth = await firebaseAuth().signInWithEmailAndPassword(email, password);
            props.dispatch(loadingActions.setLoading(true, 'Postando ...'));
            props.dispatch(snackBarActions.setSnackbar(true, 'succes', 'Bem Vindo!'));
            history.push("/");
        } catch (error) {
            props.dispatch(snackBarActions.setSnackbar(true, 'error', error.message));
        }
    }

    return (
        <div className="signin-container">
            <div className="signin-avatar"></div>
            <h3> Entrar </h3>
            <form onSubmit={handleSignIn}>
                <label htmlFor="fname">Email</label>
                <input
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email" />

                <label htmlFor="fname">Senha</label>
                <input
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Senha" />
                <input type="submit" value="Entrar" />
            </form>
        </div>
    );
}

export default connect(state => ({ state }))(SignIn);