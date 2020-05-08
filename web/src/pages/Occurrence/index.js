import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { Fade } from 'react-slideshow-image';
import { IoMdOptions } from 'react-icons/io';
import { confirmAlert } from 'react-confirm-alert';
import { firebaseAuth } from '../../config/firebase';

import 'react-confirm-alert/src/react-confirm-alert.css';
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

    const [uid, setUid] = useState('');
    const [occurrence, setOccurrence] = useState({});

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
        firebaseAuth().onAuthStateChanged(user => {
            setUid(user.uid)
        });

        if (!uid) {
            setUid('1')
        }

        console.log(uid)
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


    const handleDenounce = id => {
        props.dispatch(snackBarActions.setSnackbar(true, 'succes', 'Pronto, denúncia em análise'));
    }

    const handleEdit = id => {
        history.push("/post");
    }

    const handleDelete = async (id) => {
        confirmAlert({
            title: 'Deseja excluir esta ocorrência?',
            message: 'Tem certeza disto?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                        try {
                            const returnFirestore = await firebaseFirestore.collection("occorrence").doc(id).delete();
                            props.dispatch(snackBarActions.setSnackbar(true, 'succes', 'ocorrência deletada!'));
                            history.push("/");
                        } catch (error) {
                            props.dispatch(snackBarActions.setSnackbar(true, 'succes', error));
                        }
                    }
                },
                {
                    label: 'Não',
                    onClick: () => { }
                }
            ]
        });
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
                                        <img data-action='share/whatsapp/share' src={image} />
                                    </div>
                                </div>
                            )
                        })}
                    </Fade>
                </div>
            )
    }

    if (!occurrence.id) { return (<></>) }
    else return (
        <div>
            <AppBar></AppBar>
            <div className="occurrence-container">
                <div className="occurrence-options">
                    <div></div>
                    <div className="drop-down-container">
                        <div className="dropdown">
                            <IoMdOptions className="icon" />
                            <div className="dropdown-content">
                                <p onClick={() => handleDenounce(occurrence.id)}>Denunciar</p>
                                {occurrence.uid === uid ? <p onClick={() => handleEdit(occurrence.id)}>Editar</p> : <></>}
                                {occurrence.uid === uid ? <p onClick={() => handleDelete(occurrence.id)}>Excluir</p> : <></>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide-container">
                    <SlideShow />
                    <h2>{occurrence.title}</h2>
                    <div>
                        <span>Lançado por {occurrence.userName} - {Moment(occurrence.date).format('DD/MM/YYYY HH:MM')}</span>
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
                            separator=" "
                            url={window.location.href}
                            title={`*${occurrence.title}*`}
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