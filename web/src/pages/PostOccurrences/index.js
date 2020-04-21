import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import Carousel from 'react-elastic-carousel';

import { firebaseStorage } from '../../config/firebase';
import { firebaseFirestore } from '../../config/firebase';
import * as snackBarActions from '../../store/actions/snackbar';

import './styles.css';

import AppBar from '../../components/AppBar';

function PostOccurrences(props) {
    const history = useHistory();
    const [image1, setImage1] = useState({});
    const [URLImage1, setURLImage1] = useState('');

    const [image2, setImage2] = useState({});
    const [URLImage2, setURLImage2] = useState('');

    const [image3, setImage3] = useState({});
    const [URLImage3, setURLImage3] = useState('');

    const [image4, setImage4] = useState({});
    const [URLImage4, setURLImage4] = useState('');

    const [userName, setUserName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    function handleUploadImages(id) {
        var count = 0;
        if (URLImage1) {
            count++;
            //FAZ UPLOAD E SALVA CAMPO NO BANCO
            const paste = `occurrences/${id}`;
            const name = `${count}`;
            const file = image1;
            firebaseStorage.ref(`${paste}/${name}`).put(file)
                .on("state_changed", () => {
                    firebaseStorage
                        .ref(paste)
                        .child(name)
                        .getDownloadURL()
                        .then(url => {
                            console.log('Salvou imagem no storage!')
                            firebaseFirestore.collection('occorrence').doc(id).update({
                                image1: url,
                            })
                            .then(e => {
                                console.log('Alterou o campo com a imagem')
                            })
                        });
                });
        }



        if (URLImage2) {
            count++;
            //FAZ UPLOAD E SALVA CAMPO NO BANCO
            const paste = `occurrences/${id}`;
            const name = `${count}`;
            const file = image2;
            firebaseStorage.ref(`${paste}/${name}`).put(file)
                .on("state_changed", () => {
                    firebaseStorage
                        .ref(paste)
                        .child(name)
                        .getDownloadURL()
                        .then(url => {
                            console.log(`Url baixada: ${url}`);
                            firebaseFirestore.collection('occorrence').doc(id).update({
                                image2: url,
                            })
                                .then(e => {
                                    console.log('Imagem salva no banco')
                                })
                        });
                });
        }

        if (URLImage3) {
            count++;
            //FAZ UPLOAD E SALVA CAMPO NO BANCO
            const paste = `occurrences/${id}`;
            const name = `${count}`;
            const file = image3;
            firebaseStorage.ref(`${paste}/${name}`).put(file)
                .on("state_changed", () => {
                    firebaseStorage
                        .ref(paste)
                        .child(name)
                        .getDownloadURL()
                        .then(url => {
                            console.log(`Url baixada: ${url}`);
                            firebaseFirestore.collection('occorrence').doc(id).update({
                                image3: url,
                            })
                                .then(e => {
                                    console.log('Imagem salva no banco')
                                })
                        });
                });
        }

        if (URLImage4) {
            count++;
            //FAZ UPLOAD E SALVA CAMPO NO BANCO
            const paste = `occurrences/${id}`;
            const name = `${count}`;
            const file = image4;
            firebaseStorage.ref(`${paste}/${name}`).put(file)
                .on("state_changed", () => {
                    firebaseStorage
                        .ref(paste)
                        .child(name)
                        .getDownloadURL()
                        .then(url => {
                            console.log(`Url baixada: ${url}`);
                            firebaseFirestore.collection('occorrence').doc(id).update({
                                image4: url,
                            })
                                .then(e => {
                                    console.log('Imagem salva no banco')
                                })
                        });
                });
        }
    }

    async function handlePostOccurrence(e) {
        e.preventDefault();
        firebaseFirestore.collection('occorrence').add({
            userName,
            title,
            description,
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            date: Date.now(),
        }).then((docRef) => {
            console.log('Salvou registro!');
            handleUploadImages(docRef.id);
            // GAMBIARA //
            setTimeout(() => {
                props.dispatch(snackBarActions.setSnackbar(true, 'succes', 'Pronto!'));
                history.push("/");
            }, 2500); 
            
        }).catch(error => {
            console.log(error.message)
            props.dispatch(snackBarActions.setSnackbar(true, 'error', 'Erro ao cadastrar, tente mais tarde.'));
        });
    }

    return (
        <div>
            <AppBar btnPostVisible={false}></AppBar>

            <div className="post-container">
                <h3>Conte ao povo o que acontece na sua região!</h3>
                <label htmlFor="fname">Imagens e vídeos</label>
                <Carousel itemsToScroll={2} itemsToShow={2} className="carousel">
                    <div className="item" style={URLImage1 ? { background: `url(${URLImage1}) #642484 center/100% no-repeat` } : {}}>
                        <input
                            type="file"
                            accept="image/*"
                            className="input-upload"
                            onChange={e => {
                                setImage1(e.target.files[0]);
                                setURLImage1(URL.createObjectURL(e.target.files[0]));
                            }} />
                    </div>
                    <div className="item" style={URLImage2 ? { background: `url(${URLImage2}) #642484 center/100% no-repeat` } : {}}>
                        <input
                            type="file"
                            accept="image/*"
                            className="input-upload"
                            onChange={e => {
                                setImage2(e.target.files[0]);
                                setURLImage2(URL.createObjectURL(e.target.files[0]));
                            }} />
                    </div>
                    <div className="item" style={URLImage3 ? { background: `url(${URLImage3}) #642484 center/100% no-repeat` } : {}}>
                        <input
                            type="file"
                            accept="image/*"
                            className="input-upload"
                            onChange={e => {
                                setImage3(e.target.files[0]);
                                setURLImage3(URL.createObjectURL(e.target.files[0]));
                            }} />
                    </div>
                    <div className="item" style={URLImage4 ? { background: `url(${URLImage4}) #642484 center/100% no-repeat` } : {}}>
                        <input
                            type="file"
                            accept="image/*"
                            className="input-upload"
                            onChange={e => {
                                setImage4(e.target.files[0]);
                                setURLImage4(URL.createObjectURL(e.target.files[0]));
                            }} />
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