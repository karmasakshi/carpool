import React, {Component } from "react";
import Home from "./Home"
import {BrowserRouter,Switch,Route} from 'react-router-dom' 
import SignIn from "./SignIn"
import CreateAccount from "./CreateAccount"
import Navbar from './Navigation'
import './index.css'
import CreateProfile from './CreateProfile';
import '../node_modules/semantic-ui-css/semantic.min.css';
import fire from './config/fire'; 

class Header extends Component{
  
   state = {log: null, users:[]};

   componentDidMount() {
    fire.auth().onAuthStateChanged((user) => {     //to detect when a user is authenticated
      
      if (user) {
        console.log('user has signed in', JSON.stringify(user));

        this.setState({log: true});
        let newState = [];
        
        // application specific token so that you do not have to
        // authenticate with firebase every time a user logs in
        localStorage.setItem('appTokenKey', user.uid);  //user.uid displays the user uid from authentication table

        // store the token
        //this.props.history.push("/users")
        
        fire.database().ref().child('users').orderByChild('userUID').once('value').then(function(snapshot) {
          console.log(snapshot.val());  
          let users = snapshot.val();
         
          for (let user in users) {
            newState.push({
              id: user,
              firstName: users[user].firstName,
              lastName: users[user].lastName,
              role: users[user].role,
              lat: users[user].lat,
              lng: users[user].lng
            });
          }
          });

        console.log(newState);
        this.setState(prevState => ({
          user: {                                   //using spread operator to setState
              ...prevState.user,
              loggedIn: true,
              users: newState
          }
      }))
     } else {
       this.setState({log:false});
     }

 }); 
  } 

  render (){
    return(
      <BrowserRouter>
      <div className="Header">
       <Navbar {...this.state}/>
       <Switch>
       <Route exact path='/'component={Home}/>
       <Route exact path='/signin' render={() => <SignIn {...this.state}/>} />  
       <Route exact path='/signup' component={CreateAccount}/>
       <Route exact path='/users' component={CreateProfile}/>
       <Route render={() => <h1>Page not found</h1>} />
       </Switch>
      </div>
      </BrowserRouter>  
    );
}

}

export default Header;

//So to recap, if you need to pass a prop to a component being rendered by React Router, instead of using Routes component prop, use its render prop passing it an inline function then pass along the arguments to the element you’re creating.
//to prevent unnecessary unmounting and remounting of the entire component