import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDf6A47iZZA0xDvVh5YCFlG03NV1jFcAag",
    authDomain: "ocorrencia-do-povo.firebaseapp.com",
    databaseURL: "https://ocorrencia-do-povo.firebaseio.com",
    projectId: "ocorrencia-do-povo",
    storageBucket: "ocorrencia-do-povo.appspot.com",
    messagingSenderId: "348209652882",
    appId: "1:348209652882:web:7ce20b859257d9779af24b",
    measurementId: "G-CYQJJ1GHB6"
  };

firebase.initializeApp(firebaseConfig);

export const firebaseFirestore = firebase.firestore();
export const firebaseAuth = firebase.auth;
export const firebaseStorage = firebase.storage();