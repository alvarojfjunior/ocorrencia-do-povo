import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { Slide, Fade } from 'react-slideshow-image';

import logo from '../../assets/logo.png';
import * as loadingActions from '../../store/actions/loading';

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

    const [slideImages, setSlideImages] = useState([]);
    const slideProperties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: false,
        indicators: true
    }

    useEffect(() => {
        const { id } = props.match.params;
        loadOccurrence(id);
    }, []);


    async function loadOccurrence(id) {
        props.dispatch(loadingActions.setLoading(true, ''));
        const doc = await firebaseFirestore.collection("occorrence").doc(id).get();
        var tempOccorrence = { ...doc.data(), id: doc.id };
        var tempImages = [''];
        if (tempOccorrence.image1)
            tempImages.push(tempOccorrence.image1);
        if (tempOccorrence.image2)
            tempImages.push(tempOccorrence.image2);
        if (tempOccorrence.image3)
            tempImages.push(tempOccorrence.image3);
        if (tempOccorrence.image4)
            tempImages.push(tempOccorrence.image4);

        tempImages.shift();

        setSlideImages(tempImages);
        setOccurrence(tempOccorrence);
        props.dispatch(loadingActions.setLoading(false, ''));
    }


    const handleDelete = async (id) => {
        try {
            if (senha === 'arrozcomfeijao') {
                try {
                    const returnFirestore = await firebaseFirestore.collection("occorrence").doc(id).delete();
                    props.dispatch(snackBarActions.setSnackbar(true, 'succes', 'ocorrência deletada!'));
                    history.push("/");
                } catch (error) {
                    setCount(0);
                    props.dispatch(snackBarActions.setSnackbar(true, 'succes', error));
                }
            } else {
                props.dispatch(snackBarActions.setSnackbar(true, 'error', 'Senha incorreta'));
                return;
            }

        } catch (error) {

        }
    }


    const SlideShow = () => {
        if (slideImages.length > 0)
            return (
                <div>
                    <Fade {...slideProperties}>
                        {slideImages.map((image) => {
                            return (
                                <div key={image} style={{ maxHeight: '350px' }}>
                                    <div style={{ background: `url(${occurrence.image1}) center/100% no-repeat` }}>
                                        <img src={image} />
                                    </div>
                                </div>
                            )
                        })}
                    </Fade>
                </div>
            )
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
    else if (!occurrence.id) { return (<></>) }
    else return (
        <div>
            <AppBar></AppBar>
            <div className="occurrence-container">
                <div className="slide-container">
                    <SlideShow />
                    <h2>{occurrence.title}</h2>
                    <div>
                        <span onClick={() => setCount(count + 1)}>Lançado por {occurrence.userName} - {Moment(occurrence.date).format('DD/MM/YYYY HH:MM')}</span>
                    </div>
                </div>

                <div className="share-container">
                    <div>
                        <span >Compartilhar</span>
                    </div>
                    <div>
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

                <p>{occurrence.description}</p>

            </div>
        </div>

    );
}

export default connect(state => ({ state }))(Occurrence);