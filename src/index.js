import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import "./index.css";
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

/*//Cloud Functions
    makeUppercase = functions.database.ref('/Requests/{requestId}').onCreate((snapshot, context) => {
    var requestKey = context.params.requestId;
    console.log('request key', requestKey);
    console.log('i was pushed into database now', snapshot.val())
  });
  */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
