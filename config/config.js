import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA5DT-Fe_0tAJWNYbegqFApDWbRDuSV4Ls",
    authDomain: "myfirstproject-7f1b1.firebaseapp.com",
    databaseURL: "https://myfirstproject-7f1b1.firebaseio.com",
    projectId: "myfirstproject-7f1b1",
    storageBucket: "myfirstproject-7f1b1.appspot.com",
    messagingSenderId: "805130685849",
    appId: "1:805130685849:web:558ba128dbe9e894035708",
    measurementId: "G-MTME5XL0X9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const f = firebase;
  export const data = firebase.database();
  export const auth = firebase.auth();
  export const storage = firebase.storage();