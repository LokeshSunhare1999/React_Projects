import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjunyDBsXkOaQdiTSKIJd7WqrNl7pmeJQ",
  authDomain: "react-authentication-63c9a.firebaseapp.com",
  projectId: "react-authentication-63c9a",
  storageBucket: "react-authentication-63c9a.appspot.com",
  messagingSenderId: "268497912752",
  appId: "1:268497912752:web:3bf2d35d7dfc18e84e8c75",
  measurementId: "G-MKQ2BGLREG"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth(app);
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.
FacebookAuthProvider();