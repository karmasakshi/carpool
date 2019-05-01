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
  
   state = {log: null};

   updateThisInSignIn=()=>{
    
   }

   componentDidMount() {
    fire.auth().onAuthStateChanged((user) => {     //to detect when a user is authenticated

    // alert();
      
      if (user) {
        console.log('user has signed in', JSON.stringify(user));

        this.setState({log: true});
        
        // application specific token so that you do not have to
        // authenticate with firebase every time a user logs in
        localStorage.setItem('appTokenKey', user.uid);  //user.uid displays the user uid from authentication table

        // store the token
        //this.props.history.push("/users")
        
        this.setState(prevState => ({
          user: {                                   //using spread operator to setState
              ...prevState.user,
              loggedIn: true
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
         <Route exact path='/signin' component={SignIn}/>
         <Route exact path='/signup' component={CreateAccount}/>
         <Route exact path='/users' component={CreateProfile}/>
       </Switch>
      </div>
      
      </BrowserRouter>
      

    );
}

}



export default Header;