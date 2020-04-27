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


    function getMainImage(occurrence) {
        if (occurrence.image1) return occurrence.image1
        else if (occurrence.image2) return occurrence.image2
        else if (occurrence.image3) return occurrence.image3
        else if (occurrence.image4) return occurrence.image4
    }

    if (occurrences.length <= 0) return (<></>)

    else return (
        <div className="list-occurrences-container">
            {occurrences.map(occurrence => (
                <div className="card" key={occurrence.id} onClick={() => history.push("/occurrence/" + occurrence.id)}>
                    <div className="image-container" style={{ background: `url(${getMainImage(occurrence)}) center/100% no-repeat` }} >
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