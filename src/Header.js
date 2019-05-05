import React, {Component } from "react";
import Home from "./Home"
import {BrowserRouter,Switch,Route} from 'react-router-dom' 
import SignIn from "./SignIn"
import CreateAccount from "./CreateAccount"
import HomeHost from "./HomeHost"
import fire from './config/fire'

import Navbar from './Navigation'
import './index.css'
import CreateProfile from './CreateProfile';


class Header extends Component{
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.database=fire.database().ref().child('users');

    // Set some state
    this.state={
      
      lastName:''
          
    };
}
componentDidMount(){
  return fire.database().ref().child('users').once('value').then(function(snapshot) {
    var username = (snapshot.val());
    console.log(username);
    console.log(snapshot);
    console.log("key "+ snapshot.key);
    console.log("Author "+ snapshot.val().role);
    // ...
  });
}



handleInputChange(event) {
  event.preventDefault();
  this.setState({ messageShown: event.target.value })
}
handler(someArg) {
  this.setState({
    someArg: null
  })
  console.log(someArg);
}



  render (){
    const { users } = this.state;
   var test=localStorage.getItem("test");
   console.log(test);
   if(test===true){
     window.location.assign("localhost:3000/host")
   }else{

   
    
     
    return(
      <div>
      <div><h4>the value of {this.state.firstName}{this.state.lastName}{this.state.email}{this.state.role}{this.state.lat}{this.state.lng}{this.state.userUID}</h4></div>


      <BrowserRouter>
      

       <Navbar/>
       <Switch>
         <Route exact path='/signin' component={SignIn} value={test} ourInputFunction={this.handleInputChange}/>
         <Route exact path='/'component={Home}/>
         <Route exact path='/signup' component={CreateAccount}/>
         <Route exact path='/users' component={CreateProfile}/>
       </Switch>
    
      
      </BrowserRouter>
      
      </div>
    );
}
  }
}





export default Header;