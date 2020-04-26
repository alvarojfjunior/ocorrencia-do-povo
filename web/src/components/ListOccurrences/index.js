import React, { useState, useEffect } from 'react'
import Moment from 'moment';
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';


import * as loadingActions from '../../store/actions/loading';

import { firebaseFirestore } from '../../config/firebase';
import './styles.css';

function ListOccurrences(props) {
    const history = useHistory();
    const [occurrences, setOccurrences] = useState([]);
    const [spinner, setSpinner] = useState(true);


    useEffect(() => {
        loadOccurrences()
        console.log('teste')
    }, []);

    function loadOccurrences() {
        props.dispatch(loadingActions.setLoading(true, ''));
        firebaseFirestore.collection("occorrence").orderBy("date", "desc")
            .get()
            .then(function (querySnapshot) {
                var tempOccurrences = [];
                querySnapshot.forEach(function (docs) {
                    tempOccurrences = [...tempOccurrences, { ...docs.data(), id: docs.id }];
                });
                setOccurrences(tempOccurrences);
                props.dispatch(loadingActions.setLoading(false, ''));
                setTimeout(() => {
                    setSpinner(false);
                }, 500);
            })
            .catch((error) => {
                console.log('error', error.message);
            });
            
    }

    return (
        <div className="list-occurrences-container">
            {occurrences.map(occurrence => (
                <div className="card" key={occurrence.id} onClick={() => history.push("/occurrence/" + occurrence.id)}>
                    <div className="image-container" style={{ background: `url(${occurrence.image1}) center/100% no-repeat` }} >
                        <ClipLoader
                            className="spinner"
                            size={100}
                            color={"#642484"}
                            loading={spinner}
                        />
                    </div>
                    <br></br>
                    <span>{Moment(occurrence.date).format('DD/MM/YYYY HH:MM')}</span>
                    <br />
                    <span>Lançado por {occurrence.userName}</span>
                    <h3>{occurrence.title}</h3>
                    <p>{occurrence.description}</p>
                </div>
            ))}
        </div>
    );
}
export default connect(state => ({ state }))(ListOccurrences);