import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8DAH8g1aG3mc8TvJnvc98RzOvY87hpIE",
  authDomain: "instagramsecond-f716d.firebaseapp.com",
  databaseURL: "https://instagramsecond-f716d.firebaseio.com",
  projectId: "instagramsecond-f716d",
  storageBucket: "instagramsecond-f716d.appspot.com",
  messagingSenderId: "56132712685",
  appId: "1:56132712685:web:361a267cf80cd4953ef4e4",
  measurementId: "G-G9TZX94JH4"
};
  const fireBaseApp=firebase.initializeApp(firebaseConfig);
  const db=fireBaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();

  export {db,auth,storage};