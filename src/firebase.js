import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgWB_v1TeSCMOSAOsb0PaZ5ZMjSBedf-0",
  authDomain: "rm2000app.firebaseapp.com",
  databaseURL: "https://rm2000app.firebaseio.com",
  projectId: "rm2000app",
  storageBucket: "rm2000app.appspot.com",
  messagingSenderId: "182856118453",
  appId: "1:182856118453:web:6b421ccbc1d1b6a7b4cefc",
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
