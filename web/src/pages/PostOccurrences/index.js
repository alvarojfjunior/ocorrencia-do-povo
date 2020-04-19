import React, { useState } from 'react';

import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import * as snackBarActions from '../../store/actions/snackbar';

import './styles.css';

import AppBar from '../../components/AppBar';

function PostOccurrences(props) {
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [titlePost, setTitlePost] = useState('');
    const [descriptionPost, setDescriptionPost] = useState('');

    function handlePostOccurrence(e) {
        e.preventDefault();
        props.dispatch(snackBarActions.setSnackbar(true));
        history.push("/");
    }
    
    return (
        <div>
            <AppBar btnPostVisible={false}></AppBar>

            <div className="post-container">
                <h3>Conte ao povo o que acontece na sua região!</h3>
                <form onSubmit={handlePostOccurrence}>
                    <label htmlFor="fname">Seu Nome</label>
                    <input type="text" name="name" placeholder="Álvaro Ferreira" />

                    <label htmlFor="lname">Título da Ocorrência Name</label>
                    <input type="text" name="title" placeholder="Acidente entre dois carros no bairro Funcionários." />

                    <label htmlFor="lname">Descrição da Ocorrência</label>
                    <textarea name="description" placeholder="Hoje pela menhã houve um acidente no bairro Funcionários envolvendo dois carros ..." />
                    
                    <input type="submit" value="Postar!" />
                </form>
            </div>


        </div>
    );
}

export default connect(state => ({state}))(PostOccurrences);