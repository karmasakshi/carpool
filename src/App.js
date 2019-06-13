import React, { Component } from 'react';
import Home from './Home'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import SignIn from './SignIn'
import CreateAccount from './CreateAccount'
import Navbar from './Navigation'
import './index.css'
import CreateProfile from './CreateProfile';
import '../node_modules/semantic-ui-css/semantic.min.css';
import fire from './config/fire';
import GuestDashboard from './GuestDashboard';
import HostDashboard from './HostDashboard';
import ErrorBoundary from './ErrorBoundary';

function AuthenticatedRoute({ component: Component, appUser, authUser, ...rest }) {
  console.log('appUser from authnticated route', appUser);
  console.log('authUser from authenticated route', authUser);

  return (
    <Route
      {...rest}
      render={(props) => (authUser !== null && appUser !== null)
        ? <Component {...props} {...rest} />
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

      if (authUser) {

        fire.database().ref('/users/' + authUser.uid).once('value').then((snapshot) => {

          var appUser = (snapshot.val() || null);

          if (appUser) {

            this.setState({ authUser: authUser, appUser: appUser });
            console.log('appUser from inside', appUser);
          } else {
            this.setState({ authUser: authUser, appuser: null })
          }
        });
      }
      else {
        this.setState({ authUser: null, appUser: null });
      }
    });
  }

  componentWillUnmount() {
    fire.database().ref('users').off();
    //fire.database().Unsubscribe();
    //console.log('i am unsubscribe and i was called', fire.database().Unsubscribe);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar authUser={this.state.authUser} appUser={this.state.appUser} />
          <Switch>
            <Route exact path='/' render={() => <Home appUser={this.state.appUser} authUser={this.state.authUser} />} />
            <Route exact path='/sign-in' render={() => <SignIn authUser={this.state.authUser} appUser={this.state.appUser} />} />
            <AuthenticatedRoute exact path='/guest-dashboard' appUser={this.state.appUser} authUser={this.state.authUser} component={GuestDashboard} />} />
            <Route exact path='/host-dashboard' render={() => <HostDashboard appUser={this.state.appUser} authUser={this.state.authUser} />} />
            <Route exact path='/sign-up' render={() => <CreateAccount authUser={this.state.authUser} />} />
            <Route exact path='/create-profile' render={() => <CreateProfile authUser={this.state.authUser} appUser={this.state.appUser} />} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

//<Route exact path='/host-dashboard' render={() => <HostDashboard appUser={this.state.appUser} authUser={this.state.authUser} />} />