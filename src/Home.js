import React, { Component } from "react";
import "./index.css"
import {Link} from 'react-router-dom'

class Home extends Component {
  
  render() {
    return (
    <Link className="ui green button" id="style" to="/signup">Join Now</Link>
    );
  }
}

export default Home;