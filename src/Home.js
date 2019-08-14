import React, { Component } from "react";
import "./index.css"
import { Link } from 'react-router-dom'

class Home extends Component {

  render() {
    var signUp = <Link className="ui green button" id="style" to="/sign-up">Join Now</Link>

    return (
      <div id='home'>

        <br />
        {this.props.appUser !== null ? ((this.props.appUser.role === 'guest') ? <Link className="ui green button" id="style" to="/guest-dashboard">Dashboard</Link> : <Link className="ui green button" id="style" to="/host-dashboard">Dashboard</Link>) : signUp}
        <br />
        <p id="tagline">Join Hands for a Greener Tomorrow!</p>
      </div>
    );
  }
}

export default Home;