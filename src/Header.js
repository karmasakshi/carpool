import React, {Component } from "react";
import Home from "./Home"
import {BrowserRouter,Switch,Route} from 'react-router-dom' 
import SignIn from "./SignIn"
import CreateAccount from "./CreateAccount"
import HomeHost from "./HomeHost"

import Navbar from './Navigation'
import './index.css'
import CreateProfile from './CreateProfile';


class Header extends Component{
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this);
   

    // Set some state
    this.state = {
        messageShown: null
    };
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
   var test=localStorage.getItem("Logged");
   if(test===true){
     return(<HomeHost/>)
   }
   else{
     
    return(
      <BrowserRouter>
      <div className="Header">

       <Navbar/>
       <Switch>
         <Route exact path='/signin' component={SignIn} value={test} ourInputFunction={this.handleInputChange}/>
         <Route exact path='/'component={Home}/>
         <Route exact path='/signup' component={CreateAccount}/>
         <Route exact path='/hostlogin' component={HomeHost}/>
       </Switch>
       <button onClick={this.handler}>test</button>
      </div>
      
      </BrowserRouter>
      

    );
}
  }
  }





export default Header;