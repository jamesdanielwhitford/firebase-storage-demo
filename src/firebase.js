import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDg3OyiiDuoP79Df0b8yNqijepkoMNsbK8",
    authDomain: "test-37ab7.firebaseapp.com",
    projectId: "test-37ab7",
    storageBucket: "test-37ab7.appspot.com",
    messagingSenderId: "727395954037",
    appId: "1:727395954037:web:a7b5d59e5fae65a8e1373c",
    measurementId: "G-XFSNZ17BRW"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const firestore = firebase.firestore();

export { storage, firestore };
