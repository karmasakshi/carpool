import React, {Component } from "react";
import Home from "./Home"
import {BrowserRouter,Switch,Route} from 'react-router-dom' 
import SignIn from "./SignIn"
import CreateAccount from "./CreateAccount"
import Navbar from './Navigation'
import './index.css'
import CreateProfile from './CreateProfile';
import '../node_modules/semantic-ui-css/semantic.min.css';

class Header extends Component{

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