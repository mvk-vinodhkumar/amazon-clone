// import firebase from "firebase"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQzkltvZziTxwq-CoMWytc8CJO_DyKyLg",
  authDomain: "clone-f1e68.firebaseapp.com",
  projectId: "clone-f1e68",
  storageBucket: "clone-f1e68.appspot.com",
  messagingSenderId: "49519906024",
  appId: "1:49519906024:web:2627527ba9c81b33d34d5d",
  measurementId: "G-H5QC7FGF0P",
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }
