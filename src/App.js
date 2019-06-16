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
import GuestDashboard from './GuestDashboard';
import HostDashboard from './HostDashboard';
import { MyProvider } from './Context.js';

function AuthenticatedRoute({ component: Component, appUser, authUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (authUser !== null && appUser !== null)
        ? <Component appUser={appUser} authUser={authUser} {...rest} />
        : <Redirect to='/sign-in' />} />
  )
}

class App extends Component {

  state = {
    authUser: null,
    appUser: null
  };

  componentDidMount() {

    fire.auth().onAuthStateChanged((authUser) => {

      console.log('authUser', authUser);

      if (authUser) {

        fire.database().ref('/users/' + authUser.uid).once('value').then((snapshot) => {

          var appUser = (snapshot.val() || null);

          if (appUser) {

            this.setState({ authUser: authUser, appUser: appUser });
            console.log("2");

          } else {
            this.setState({ authUser: null, appuser: null })
          }



        });

      }

      else {

        this.setState({ authUser: null, appUser: null });

      }

    });

  }

  componentWillUnmount() {
    fire.database().ref('users').off();  //prevents callback from executing after promise is executed

  }

  render() {
    return (
      <MyProvider appUser={this.state.appUser} authUser={this.state.authUser}>
        <BrowserRouter>
          <div>
            <Navbar authUser={this.state.authUser} appUser={this.state.appUser} />
            <Switch>
              <Route exact path='/' component={() => <Home appUser={this.state.appUser} authUser={this.state.authUser} />} />
              <Route exact path='/sign-in' component={() => <SignIn authUser={this.state.authUser} appUser={this.state.appUser} />} />
              <AuthenticatedRoute exact path='/guest-dashboard' component={GuestDashboard} appUser={this.state.appUser} authUser={this.state.authUser} />} />
              <AuthenticatedRoute exact path='/host-dashboard' component={HostDashboard} appUser={this.state.appUser} authUser={this.state.authUser} />} />
              <Route exact path='/sign-up' component={() => <CreateAccount authUser={this.state.authUser} />} />
              <Route exact path='/create-profile' component={() => <CreateProfile authUser={this.state.authUser} appUser={this.state.appUser} />} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
      </MyProvider>

    );
  }
}

export default App;