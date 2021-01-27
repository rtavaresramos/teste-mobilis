import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

// Your web app's Firebase configuration
const app = firebase.initializeApp({
  apiKey: "AIzaSyA2ec30oQJBGC7zd7eI-QqNZS8Ll5sax4s",
  authDomain: "teste-mobilis.firebaseapp.com",
  databaseURL: "https://teste-mobilis-default-rtdb.firebaseio.com",
  projectId: "teste-mobilis",
  storageBucket: "teste-mobilis.appspot.com",
  messagingSenderId: "218019394086",
  appId: "1:218019394086:web:9cc5f87a69d373a9e8ace7",
  measurementId: "G-CC6WCDJCCG",
});
export const auth = app.auth();
export default app;
