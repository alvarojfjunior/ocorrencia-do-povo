import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import Carousel from 'react-elastic-carousel';

import { firebaseFirestore } from '../../config/firebase';
import * as snackBarActions from '../../store/actions/snackbar';

import './styles.css';

import AppBar from '../../components/AppBar';

function PostOccurrences(props) {
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function handlePostOccurrence(e) {
        e.preventDefault();
        firebaseFirestore.collection('occorrence').add({
            userName,
            title,
            description,
            date: Date.now(),
        }).then(() => {
            props.dispatch(snackBarActions.setSnackbar(true, 'succes', 'Pronto!'));
            history.push("/");
        }).catch(error => {
            console.log(error)
            props.dispatch(snackBarActions.setSnackbar(true, 'error', 'Erro ao cadastrar, tente mais tarde.'));
        });
    }

    function openFindImade() {

    }

    return (
        <div>
            <AppBar btnPostVisible={false}></AppBar>

            <div className="post-container">
                <h3>Conte ao povo o que acontece na sua região!</h3>
                <label htmlFor="fname">Imagens e vídeos</label>
                <Carousel itemsToScroll={2} itemsToShow={2} className="carousel">
                    <div className="item">
                        <input type="file" accept="image/*" visbility="hidden" className="input-upload" />
                    </div>
                    <div className="item">
                        <input type="file" accept="image/*" visbility="hidden" className="input-upload" />
                    </div>
                    <div className="item">
                        <input type="file" accept="image/*" visbility="hidden" className="input-upload" />
                    </div>
                    <div className="item">
                        <input type="file" accept="image/*" visbility="hidden" className="input-upload" />
                    </div>
                </Carousel>
                <form onSubmit={handlePostOccurrence}>
                    <label htmlFor="fname">Seu Nome</label>
                    <input
                        required
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        type="text"
                        placeholder="Álvaro Ferreira" />

                    <label htmlFor="lname">Título da Ocorrência</label>
                    <input
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        placeholder="Acidente entre dois carros no bairro Funcionários." />
                    <label htmlFor="lname">Descrição da Ocorrência</label>
                    <textarea
                        required
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Hoje pela menhã houve um acidente no bairro Funcionários envolvendo dois carros ..." />

                    <input type="submit" value="Postar!" />
                </form>
            </div>


        </div>
    );
}

export default connect(state => ({ state }))(PostOccurrences);