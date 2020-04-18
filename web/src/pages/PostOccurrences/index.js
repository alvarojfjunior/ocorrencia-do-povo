import React, { useState } from 'react';

import { connect } from 'react-redux';

import './styles.css';

import AppBar from '../../components/AppBar';

function PostOccurrences(props) {
    const [userName, setUserName] = useState('');
    const [titlePost, setTitlePost] = useState('');
    const [descriptionPost, setDescriptionPost] = useState('');

    return (
        <div>
            <AppBar btnPostVisible={false}></AppBar>

            <div className="post-container">
                <form>
                    <label htmlFor="fname">Nome</label>
                    <input type="text" name="name" placeholder="Seu nome" />

                    <label htmlFor="lname">Título da Ocorrência Name</label>
                    <input type="text" name="title" placeholder="Título da Ocorrência" />

                    <label htmlFor="lname">Descrição da Ocorrência</label>
                    <textarea name="description" placeholder="Título da Ocorrência" />
                    
                    <input type="submit" value="Postar Ocorrência" />
                </form>
            </div>


        </div>
    );
}

export default connect(state => ({state}))(PostOccurrences);