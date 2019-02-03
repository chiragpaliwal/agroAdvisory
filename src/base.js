import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB4LakYTW_7AHmrqjnbVhXxEctC-C0sLP8",
    authDomain: "agro-advisory.firebaseapp.com",
    databaseURL: "https://agro-advisory.firebaseio.com",
    projectId: "agro-advisory",
    storageBucket: "agro-advisory.appspot.com",
    messagingSenderId: "840434668150"
});

const base = Rebase.createClass(firebaseApp.database());

//named export
export { firebaseApp };

//default export

export default base;