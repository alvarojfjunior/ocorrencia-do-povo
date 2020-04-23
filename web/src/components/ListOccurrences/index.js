import React, { useState, useEffect } from 'react'
import Moment from 'moment';
import { useHistory } from "react-router-dom";

import { firebaseFirestore } from '../../config/firebase';
import './styles.css';

function ListOccurrences() {
    const history = useHistory();
    const [occurrences, setOccurrences] = useState([]);

    useEffect(() => {
        loadOccurrences()
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

    return (
        <div className="list-occurrences-container">
            {occurrences.map(occurrence => (
                <div className="card" key={occurrence.id} onClick={() => history.push("/occurrence/" + occurrence.id)}>
                    <div className="image-container">
                        <img src={occurrence.image1} alt="Image Occurrence" />
                    </div>
                    <br></br>
                    <span>{Moment(occurrence.date).format('DD/MM/YYYY HH:MM')}</span>
                    <br />
                    <span>{occurrence.userName}</span>
                    <h3>{occurrence.title}</h3>
                    <p>{occurrence.description}</p>
                </div>
            ))}
        </div>
    );
}
export default ListOccurrences;