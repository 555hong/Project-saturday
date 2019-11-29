import firebase from 'firebase';
const config={
apiKey: "AIzaSyDpZnMv0pQDD-XQvpJamxhbe3-AWK06wgk",
authDomain: "convert-my-project.firebaseapp.com",
databaseURL: "https://convert-my-project.firebaseio.com",
projectId: "convert-my-project",
storageBucket: "convert-my-project.appspot.com",
messagingSenderId: "242730141146",
appId: "1:242730141146:web:9ffc279a35c25b1b152ce3",
measurementId: "G-GK5PJVT0RP"
}
const Firebase = firebase.initializeApp(config);
export default Firebase;