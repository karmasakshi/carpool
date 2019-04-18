import React, {Component } from "react";
import Home from "./Home"
import {BrowserRouter,Switch,Route}from 'react-router-dom' 
import SignIn from "./SignIn"
import Navbar from './Navigation'




class Header extends Component{
render (){
    return(

      <BrowserRouter>
      <div className="Header">
       <Navbar/>
      </div>
      </BrowserRouter>

    );
}

}



export default Header;