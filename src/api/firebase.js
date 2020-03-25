import * as firebase from 'firebase'

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

firebase.initializeApp(firebaseConfig);

// const databaseRef = firebase.database().ref();

// export const markersRef = databaseRef.child('markers')

const DB = firebase.firestore()

export const COLLECTIONS = {
  MARKERS: 'markers'
}

export default DB