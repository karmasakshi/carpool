import React, { Component } from "react";
import "./index.css"
import { Link } from 'react-router-dom'
import {Redirect} from 'react-router-dom'
 
class Home extends Component {
 
  render() {
    var signIntoDashBoard=<Link className="ui green button" id="style" to="/dashboard">Join Now</Link>
    var signUp=<Link className="ui green button" id="style" to="/sign-up">Join Now</Link>

    
    return (
      <div>
        {this.state.authUser ? signIntoDashBoard : signUp}
        <br />
        <p id="tagline">Join Hands for a Greener Tomorrow!</p>
      </div>
    );
  }

}
 
export default Home;