import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIbLxJuqtvB10aRuLsnNPKura_ul4MnL8",
  authDomain: "fir-auth-133c1.firebaseapp.com",
  projectId: "fir-auth-133c1",
  storageBucket: "fir-auth-133c1.appspot.com",
  messagingSenderId: "944070929375",
  appId: "1:944070929375:web:81e13b039b1d9167bb726a"
};

const firebaseDB = firebase.initializeApp(firebaseConfig);

const db = firebaseDB.database().ref();
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export { auth, googleAuthProvider, facebookAuthProvider, db };



// import firebase from "firebase/app";
// import "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBjunyDBsXkOaQdiTSKIJd7WqrNl7pmeJQ",
//   authDomain: "react-authentication-63c9a.firebaseapp.com",
//   projectId: "react-authentication-63c9a",
//   storageBucket: "react-authentication-63c9a.appspot.com",
//   messagingSenderId: "268497912752",
//   appId: "1:268497912752:web:3bf2d35d7dfc18e84e8c75",
//   measurementId: "G-MKQ2BGLREG"
// };

// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth(app);
// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// const facebookAuthProvider = new firebase.auth.
// FacebookAuthProvider();

// export {auth, googleAuthProvider, facebookAuthProvider};


////////////////////////

