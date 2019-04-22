import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Header from './Header';
import Home from './Home';
import "./index.css";
import CreateProfile from "./CreateProfile"
import './Semantic-UI-CSS-master/semantic.min.css';

ReactDOM.render(
    <CreateProfile/>, 
    document.getElementById("root")
  );




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
