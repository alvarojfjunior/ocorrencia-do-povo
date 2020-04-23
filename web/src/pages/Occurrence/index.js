import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'
import {
    WhatsappShareButton,
    WhatsappIcon,
    FacebookShareButton,
    FacebookIcon,
} from "react-share";


import { firebaseFirestore } from '../../config/firebase';
import * as snackBarActions from '../../store/actions/snackbar';

import './styles.css';
import AppBar from '../../components/AppBar'

function Occurrence(props) {
    const history = useHistory();

    const [occurrence, setOccurrence] = useState({});


    const [count, setCount] = useState(0);
    const [senha, setSenha] = useState('');

    useEffect(() => {
        const { id } = props.match.params;
        loadOccurrence(id);
    }, []);


    function loadOccurrence(id) {
        var tempOccorrence;
        firebaseFirestore.collection("occorrence").doc(id)
            .get()
            .then(function (doc) {
                tempOccorrence = { ...doc.data(), id: doc.id };
                setOccurrence(tempOccorrence);
            })
            .catch((error) => {
                console.log('error', error.message);
            });
    }

    const handleDelete = async (id) => {
        try {
            if (senha === 'arrozcomfeijao') {
                try {
                    const returnFirestore = await firebaseFirestore.collection("occorrence").doc(id).delete();
                    props.dispatch(snackBarActions.setSnackbar(true, 'succes', 'ocorrência deletada!'));
                    history.push("/");
                } catch (error) {
                    props.dispatch(snackBarActions.setSnackbar(true, 'succes', error));
                    setCount(0);
                }
            } else {
                props.dispatch(snackBarActions.setSnackbar(true, 'error', 'Senha incorreta'));
                return;
            }

        } catch (error) {

        }
    }

    if (count > 5)
        return (
            <div>
                <AppBar></AppBar>
                <div className="occurrence-container">
                    <h3>Para deletar, é preciso ser administrador!</h3>
                    <input
                        type="text"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button onClick={() => handleDelete(occurrence.id)}>Deletar</button>
                </div>
            </div>
        )
    else return (
        <div>
            <AppBar></AppBar>
            <div className="occurrence-container">
                <h2>{occurrence.title}</h2>
                <p>{occurrence.description}</p>

                <div className="share-container">
                    <div>
                        <span onClick={() => setCount(count + 1)}>{occurrence.userName} - {Moment(occurrence.date).format('DD/MM/YYYY HH:MM')}</span>
                    </div>
                    <div>
                        <span >Compartilhar</span>
                        <WhatsappShareButton
                            className="share-button"
                            windowWidth="1000"
                            windowHeight="800"
                            children={<WhatsappIcon size={32} round={true} />}
                            url={window.location.href}
                            title={occurrence.title}
                        />
                        <FacebookShareButton
                            className="share-button"
                            windowWidth="1000"
                            windowHeight="800"
                            children={<FacebookIcon size={32} round={true} />}
                            url={window.location.href}
                            quote={occurrence.title}
                        />


                    </div>
                </div>
                {occurrence.image1 ? <img src={occurrence.image1} /> : <></>}
                {occurrence.image2 ? <img src={occurrence.image2} /> : <></>}
                {occurrence.image3 ? <img src={occurrence.image3} /> : <></>}
                {occurrence.image4 ? <img src={occurrence.image4} /> : <></>}
            
            </div>
        </div>

    );
}

export default connect(state => ({ state }))(Occurrence);