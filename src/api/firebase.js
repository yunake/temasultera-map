import * as firebase from 'firebase'
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseConfig = {
  apiKey: "AIzaSyCbBfRISSy3q2qT9qD_p96CvkoCSq2KPDg",
  authDomain: "chult-map.firebaseapp.com",
  databaseURL: "https://chult-map.firebaseio.com",
  projectId: "chult-map",
  storageBucket: "chult-map.appspot.com",
  messagingSenderId: "643217035072",
  appId: "1:643217035072:web:cc1f3717cbc060849ab4a5",
  measurementId: "G-0JJX22XY3V"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();

/** See the signature above to find out the available providers */
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
 
/** Create the FirebaseAuth component wrapper */
export const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth,
});

const DB = firebase.firestore()

export default DB