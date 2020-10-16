import firebase from "firebase/app";
// import "firebase/firestore";

require("firebase/firestore");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcIF2FL3rie58DNP1aZCEy8GP0Fu8XOlU",
  authDomain: "sevenseas-ed230.firebaseapp.com",
  databaseURL: "https://sevenseas-ed230.firebaseio.com",
  projectId: "sevenseas-ed230",
  storageBucket: "sevenseas-ed230.appspot.com",
  messagingSenderId: "1055011485117",
  appId: "1:1055011485117:web:38474ba4cf83fea467ced4",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
