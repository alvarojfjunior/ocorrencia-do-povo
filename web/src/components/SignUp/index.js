import React, { useState } from 'react';
import { connect } from 'react-redux';
import { firebaseAuth } from '../../config/firebase';

import './styles.css';
import * as snackBarActions from '../../store/actions/snackbar';

function SignUp(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');


    const handleSignUp = async e => {
        e.preventDefault();
        if (password !== reenterPassword) {
            props.dispatch(snackBarActions.setSnackbar(true, 'succes', 'As senhas não coincidem.'));
            return;
        }
        try {
            let  resultAuth = await firebaseAuth().createUserWithEmailAndPassword(email, password);
            await resultAuth.user.updateProfile({displayName: name });
            props.dispatch(snackBarActions.setSnackbar(true, 'succes', 'Cadastrado com sucesso!'));
        } catch (error) {
            props.dispatch(snackBarActions.setSnackbar(true, 'error', error.message));
        }
        
    }

    return (
        <div className="signup-container">
            <div className="signup-avatar"></div>
            <h3> Criar Conta </h3>
            <form onSubmit={handleSignUp}>
                <label htmlFor="fname">Nome</label>
                <input
                    required
                    autoComplete="false"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    placeholder="Nome" />

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

                <label htmlFor="fname">Confirme a senha</label>
                <input
                    required
                    value={reenterPassword}
                    onChange={e => setReenterPassword(e.target.value)}
                    type="password"
                    placeholder="Repita a senha" />


                <input type="submit" value="Entrar" />
            </form>
        </div>
    );
}

export default connect(state => ({ state }))(SignUp);