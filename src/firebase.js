import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDnVdKNpUTf-6rN1OBfc6_4Yx5lpsLsVG4",
    authDomain: "portfolio-79f24.firebaseapp.com",
    projectId: "portfolio-79f24",
    storageBucket: "portfolio-79f24.appspot.com",
    messagingSenderId: "248452412061",
    appId: "1:248452412061:web:0fed216e01a029c69b5a74",
    measurementId: "G-DZV7NMDJYF"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
