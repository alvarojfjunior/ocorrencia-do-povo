import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { firebaseFirestore } from '../../config/firebase';

import './styles.css';
import AppBar from '../../components/AppBar'

function Occurrence(props) {
    const [occurrence, setOccurrence] = useState({});
    
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

    return (
        <div>
            <AppBar></AppBar>
            <div className="occurrence-container">
                <img src="https://cdn-istoedinheiro-ssl.akamaized.net/wp-content/uploads/sites/17/2020/03/cdbab406b5f84549439b68d43f62a7c31154c55a-768x432.jpg" alt="Occurrence" />
                <span>{Moment(occurrence.date).format('DD/MM/YYYY HH:MM')}</span>
                <h2>{occurrence.title}</h2>
                <p>{occurrence.description}</p>
            </div>

        </div>
    );
}

export default connect(state => ({ state }))(Occurrence);