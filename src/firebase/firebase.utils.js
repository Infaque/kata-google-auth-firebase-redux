import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

  
  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG,
    authDomain: "test-fcm-9a613.firebaseapp.com",
    projectId: "test-fcm-9a613",
    storageBucket: "test-fcm-9a613.appspot.com",
    messagingSenderId: "628221241793",
    appId: "1:628221241793:web:b0f13e967f624783e46740",
    measurementId: "G-6KY4D562JT"
  };
  

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;