import React, { Component } from "react";
import "./index.css"
import {Link} from 'react-router-dom'

class Home extends Component {
  
  render() {
    return (
    <Link className="button btn" to="/signup">Join Now</Link>
    );
  }
}

export default Home;