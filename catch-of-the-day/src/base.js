import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDLqsvPvLrqeq42NgIL1lcPLcNS7I85aYQ',
  authDomain: 'catch-of-the-day-shaderpixel-2.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-shaderpixel-2.firebaseio.com',
}); // create our firebaseApp based on information in firebase

const base = Rebase.createClass(firebaseApp.database()); // create our rebase binding

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
