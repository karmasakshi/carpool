import React, {Component } from "react";
import Home from "./Home"
import {BrowserRouter,Switch,Route} from 'react-router-dom' 
import SignIn from "./SignIn"
import CreateAccount from "./CreateAccount"
import Navbar from './Navigation'
import './index.css'
import CreateProfile from './CreateProfile';


class Header extends Component{
  constructor(props){
    super(props);
    this.state={
      loggedIn: this.props.loggedIn
  }
  }

render (){
    return(
 
      <BrowserRouter>
      <div className="Header">
       <Navbar/>
       <Switch>
       <Route exact path='/'component={Home}/>
         <Route exact path='/signin' component={SignIn}/>
         <Route exact path='/signup' component={CreateAccount}/>
         <Route exact path="/users" component={CreateProfile} />
       </Switch>
      </div>
      
      </BrowserRouter>
      

    );
}

}



export default Header;