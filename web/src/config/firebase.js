import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDMHNtSaXyaCpDu6kBgkqoSNJ6viSSbhfg",
  authDomain: "ocorrenciadopovo-9bcec.firebaseapp.com",
  databaseURL: "https://ocorrenciadopovo-9bcec.firebaseio.com",
  projectId: "ocorrenciadopovo-9bcec",
  storageBucket: "ocorrenciadopovo-9bcec.appspot.com",
  messagingSenderId: "684281651618",
  appId: "1:684281651618:web:017f6b8d40507a926552fb",
  measurementId: "G-RQ2KKTMR13"
};

firebase.initializeApp(firebaseConfig);

export const firebaseFirestore = firebase.firestore();
export const firebaseAuth = firebase.auth;
export const firebaseStorage = firebase.storage();