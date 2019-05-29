import React, { Component } from 'react';
import Home from './Home'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignIn from './SignIn'
import CreateAccount from './CreateAccount'
import Navbar from './Navigation'
import './index.css'
import CreateProfile from './CreateProfile';
import '../node_modules/semantic-ui-css/semantic.min.css';
import fire from './config/fire';
import Results from './Results';
import { Redirect } from 'react-router-dom';

class App extends Component {

  state = {
    authUser: null,
    appUser: null,
    otherUsers: []
  };

  getAndUpdateAllUsers(appUser) {

    fire.database().ref('/users').once('value').then((snapshot) => {

      var allUsers = snapshot.val();

      var result = [];

      for (let user of allUsers) {

        if (appUser.uid !== user.id && appUser.role !== user.role && this.isCloseby(appUser.lat, appUser.long, user.lat, user.long, 200)) {

          result.push(user);

        }

      }

      this.setState({ appUser: appUser, otherUsers: result });

    });

  }

  deg2rad(deg) {

    return deg * (Math.PI / 180)

  }

  isCloseby(xLat, xLong, yLat, yLong, delta) {

    var R = 6371;

    var dLat = this.deg2rad(yLat - xLat);
    var dLon = this.deg2rad(yLong - xLong);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(xLat)) * Math.cos(this.deg2rad(yLat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c * 1000;

    if (d <= delta) {

      return true;

    }

  }

  componentDidMount() {

    fire.auth().onAuthStateChanged((authUser) => {

      console.log('Auth state changed: ', authUser);

      if (authUser) {

        this.setState({ authUser: authUser });

        fire.database().ref('/users/' + authUser.uid).once('value').then(function (snapshot) {

          var appUser = (snapshot.val() || null);

          if (!appUser) {

            return <Redirect to='/create-profile' />

          } else {

            this.getAndUpdateAllUsers(appUser);

          }

        });

      } else {

        this.setState({ authUser: null, appUser: null, otherUsers: [] });

      }

    });

  }

  render() {

    return (
      <BrowserRouter>
        <div className='Header'>
          <Navbar authUser={this.state.authUser} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/sign-in' render={() => <SignIn authUser={this.state.authUser} />} />
            <Route exact path='/dashboard' component={() => <Results appUser={this.state.appUser} results={this.state.otherUsers} />} />
            <Route exact path='/sign-up' component={() => <CreateAccount authUser={this.state.authUser} />} />
            <Route exact path='/create-profile' component={() => <CreateProfile authUser={this.state.authUser} appUser={this.state.appUser} />} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    );

  }

}

export default App;