import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { Fade } from 'react-slideshow-image';
import { IoMdOptions } from 'react-icons/io';
import { BsFillHeartFill } from 'react-icons/bs';
import { confirmAlert } from 'react-confirm-alert';
import { firebaseAuth } from '../../config/firebase';

import 'react-confirm-alert/src/react-confirm-alert.css';
import * as loadingActions from '../../store/actions/loading';
import clapingHands from '../../assets/claping-hands.png';

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
    const [user, setUser] = useState({});
    const [occurrence, setOccurrence] = useState({});

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const [countLikes, setCountLikes] = useState(0);


    const [slideImages, setSlideImages] = useState([]);
    const slideProperties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: false,
        indicators: true
    }



    useEffect(() => {
        const { id } = props.match.params;
        loadUser();
        loadOccurrence(id);
        loadComments(id);
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

        setCountLikes(tempOccorrence.countLikes);
        props.dispatch(loadingActions.setLoading(false, ''));
    }


    const loadUser = async () => {
        await firebaseAuth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                setUid(user.uid);
            }
        });
    }


    const handleDenounce = id => {
        props.dispatch(snackBarActions.setSnackbar(true, 'succes', 'Pronto, denúncia em análise'));
    }

    const handleEdit = id => {
        history.push(`/post/${occurrence.id}`);
    }

    const handleMakeComment = async e => {
        console.log(occurrence.id);
        console.log(user.displayName);
        console.log(comment);
        const resultFirestoreAdd = await firebaseFirestore.collection('comments').add({
            occurrence: occurrence.id,
            userName: user.displayName ? user.displayName : 'Anônimo',
            comment: comment,
            date: Date.now(),
        });
        setComment('');
        props.dispatch(snackBarActions.setSnackbar(true, 'succes', 'Pronto!'));
        setComments([(await resultFirestoreAdd.get()).data(), ...comments]);
    }

    const handleDelete = id => {
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

    const handleLike = async () => {
        await firebaseFirestore.collection('occorrence').doc(occurrence.id).update({
            'countLikes': countLikes + 1,
        });
        setCountLikes(countLikes + 1);
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


    function loadComments(id) {
        firebaseFirestore.collection("comments").where("occurrence", "==", id).orderBy("date", "desc")
            .get()
            .then(function (querySnapshot) {
                var tempComments = [];
                querySnapshot.forEach(function (docs) {
                    tempComments = [...tempComments, { ...docs.data(), id: docs.id }];
                });
                setComments(tempComments);
            })
            .catch((error) => {
                console.log('error', error.message);
            });
    }

    const Comments = (e) => {
        return (
            <div className="list-container">
                {comments.map(comment => (
                    <div className="comment-item" key={comment.id}>
                        <h5>{`${comment.userName} - ${Moment(occurrence.date).format('DD/MM/YYYY HH:MM')}`}</h5>
                        <p>{comment.comment}</p>
                    </div>
                ))}
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
                    <div>
                        <img src={clapingHands} onClick={handleLike} />
                        <div><span style={countLikes >= 10 ? {paddingLeft: '7px'} : {}}>{countLikes}</span></div>
                    </div>
                </div>
                <p>{occurrence.description}</p>
                <div className="comments-container">
                    Comentários:
                <div className="form">
                        <textarea
                            required
                            rows="4"
                            value={comment}
                            onChange={e => setComment(e.target.value)}></textarea>
                        <div>
                            <div></div>
                            <button onClick={handleMakeComment}>Comentar</button>
                        </div>
                    </div>
                    <Comments />
                </div>
            </div>
        </div>

    );
}

export default connect(state => ({ state }))(Occurrence);