import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import "./index.css";
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { auth } from 'firebase';
//const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
//const admin = require('firebase-admin');
//admin.initializeApp();

// Realtime Database under the path /messages/:pushId/original


ReactDOM.render(
  <App />,
  document.getElementById("root")
);







// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
