import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBcbdEtZVOIk5egKQjdLdgrjre6CRAXXbI",
  authDomain: "flashcard-720b2.firebaseapp.com",
  databaseURL: "https://flashcard-720b2.firebaseio.com",
  projectId: "flashcard-720b2",
  storageBucket: "flashcard-720b2.appspot.com",
  messagingSenderId: "538606180499"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
