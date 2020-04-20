import React, { useState, useEffect } from 'react'
import Moment from 'moment';
import { useHistory } from "react-router-dom";

import { firebaseFirestore } from '../../config/firebase';
import './styles.css';

function ListOccurrences() {
    const history = useHistory();
    const [occurrences, setOccurrences] = useState([]);

    useEffect(() => {
        loadOccurrences();
    }, []);

    function loadOccurrences() {
        firebaseFirestore.collection("occorrence").orderBy("date", "desc")
            .get()
            .then(function (querySnapshot) {
                var tempOccurrences = [];
                querySnapshot.forEach(function (docs) {
                    tempOccurrences = [...tempOccurrences, { ...docs.data(), id: docs.id }];
                });
                setOccurrences(tempOccurrences);
            })
            .catch((error) => {
                console.log('error', error.message);
            });
    }

    function handleClickCard(id) {
        history.push("/occurrence/" + id);
    }

    return (
        <div className="list-occurrences-container">
            {occurrences.map(occurrence => (
                <div className="card" key={occurrence.id}>
                    <img onClick={() => handleClickCard(occurrence.id)} src="https://i.em.com.br/Fdst2peHsPbETiGHXwWYI8dcIe0=/675x0/smart/imgsapp.em.com.br/app/noticia_127983242361/2020/04/18/1139958/20200418162728396739i.jpeg" alt="Logo" />
                    <span>{Moment(occurrence.date).format('DD/MM/YYYY HH:MM')}</span>
                    <h3 onClick={() => handleClickCard(occurrence.id)}>{occurrence.title}</h3>
                    <p>{occurrence.description}</p>
                </div>
            ))}
        </div>
    );
}
export default ListOccurrences;