import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import "./index.css";
import App from './App';
import functions from 'firebase-functions';
import exports from 'exports';
import fire from './config/fire';

// The Firebase Admin SDK to access the Firebase Realtime Database.
import admin from 'firebase-admin';
admin.initializeApp();

// Realtime Database under the path /messages/:pushId/original


ReactDOM.render(
  <App />,
  document.getElementById("root")
);

//var dt = new Date();
//dt.setDate( dt.getDate() - 1 );

//var db = fire.database();
//exports.deleteRequests = functions.database.ref('/Requests/').orderByChild('dateOfJourney').endAt(dt).onDelete();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
