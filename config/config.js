import firebase from 'firebase';

var firebaseConfig = {
    //initalise your own configuration from firebase
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const f = firebase;
  export const data = firebase.database();
  export const auth = firebase.auth();
  export const storage = firebase.storage();