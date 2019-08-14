import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class TaxiShare extends Component {

  constructor(props) {
    
  }

  componentDidMount() {   //should be async componentDidMount() in case of messaging
    
  }

  componentDidUpdate() {
    
  }


  render() {
    return (
      <div>
        <Container>
         <h1> Hey i am taxiShare</h1>
        </Container>
      </div>
    )
  }
}

export default TaxiShare;