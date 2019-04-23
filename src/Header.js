import React, {Component } from "react";
import Home from "./Home"
import {BrowserRouter,Switch,Route}from 'react-router-dom' 
import SignIn from "./SignIn"
import Navbar from './Navigation'
import './index.css'




class Header extends Component{
render (){
    return(

      <BrowserRouter>
      <div className="Header">
       <Navbar/>
       <Switch>
         <Route exact path='/signin' component={SignIn}/>
         <Route exact path='/'component={Home}/>
       </Switch>
      </div>
      
      </BrowserRouter>
      

    );
}

}



export default Header;