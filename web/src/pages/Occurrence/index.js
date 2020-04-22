import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

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
                <span onClick={() =>setCount(count + 1)}>{occurrence.userName} - {Moment(occurrence.date).format('DD/MM/YYYY HH:MM')}</span>
                <h2>{occurrence.title}</h2>
                <p>{occurrence.description}</p>
                <img src={occurrence.image1} alt="Occurrence" />
            </div>
        </div>
    );
}

export default connect(state => ({ state }))(Occurrence);