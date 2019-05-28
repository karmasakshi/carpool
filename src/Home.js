import React, { Component } from "react";
import "./index.css"
import { Link } from 'react-router-dom'
 
class Home extends Component {
 
  render() {
    return (
      <div>
        <Link className="ui green button" id="style" to="/sign-up">Join Now</Link>
        <br />
        <p id="tagline">Join Hands for a Greener Tomorrow!</p>
      </div>
    );
  }
}
 
export default Home;