import React, {Component } from "react";
import Home from "./Home"




class Header extends Component{
render (){
    return(
       <header>
       <div>
        <h1>CarPool</h1>
        <ul className="header">
          <li><a href="/">Home</a></li>
          <li><a href="/About">About</a></li>
          <li><a href="/">Sign In</a></li>
          <li><a href="/">Sign Out</a></li>
          
        </ul>
        <div className="content">
        
        </div>
      </div>
      </header>

    );
}

}



export default Header;