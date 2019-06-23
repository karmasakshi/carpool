import firebase from 'firebase'

//<script src="https://www.gstatic.com/firebasejs/5.9.4/firebase.js"></script>

  // Initialize Firebase web app -- refer to the web app with the name 'config'
  const config = {
    apiKey: "AIzaSyBnE0owuEH598Qd_bvJ6xTLHVY-EqXKs4M",
    authDomain: "carpool-d3255.firebaseapp.com",
    databaseURL: "https://carpool-d3255.firebaseio.com",
    projectId: "carpool-d3255",
    storageBucket: "carpool-d3255.appspot.com",
    messagingSenderId: "13033149059"
  };

  const fire=firebase.initializeApp(config);

  export const auth = firebase.auth();  //This exports the auth module of Firebase
  export const database = fire.database(); //This exports the database module of Firebase
  export default fire;
  

