import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Dropdown, Container, Button } from 'semantic-ui-react';
import fire from './config/fire';
import { Redirect } from 'react-router-dom';

class PlanYourWeek extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Sunday: '',
      Monday: '',
      Tuesday: '',
      Wednesday: '',
      Thursday: '',
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      destinationOptions: [],
      createdPlanner: false
    };
  }

  componentDidMount() {
    let destinationOptions = [];

    fire.database().ref('destinations').once('value').then((snapshot) => {
      let destinations = Object.keys(snapshot.val());

      for (var i = 0; i < destinations.length; i++) {
        destinationOptions.push({                          //order in which semantic ui react dropdown uses values
          value: Object.keys(snapshot.val())[i],
          text: Object.keys(snapshot.val())[i]
        });
      }

      this.setState({
        destinationOptions: destinationOptions
      });
    })
  }

  handleChange = (e, { value }, day) => {
    let obj = {};

    obj[day] = e.target.innerText;
    obj[value] = e.target.innerText;

    this.setState(obj);
  }

  submitPlanner() {
    fire.database().ref('/Taxi-Users/' + this.props.appUser.id).update({
      Sunday: this.state.Sunday,
      Monday: this.state.Monday,
      Tuesday: this.state.Tuesday,
      Wednesday: this.state.Wednesday,
      Thursday: this.state.Thursday
    }).then(
      this.setState({
        createdPlanner: true
      })
    )
  }

  render() {
    var today = new Date();
    var dd, ddEnd;
    var mm = String(today.getMonth() + 1); //January is 0!
    var yyyy = today.getFullYear();
    var dayOfTheWeek = today.getDay();

    let days = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6
    }

    if (dayOfTheWeek <= 4) {
      dd = String(today.getDate() - dayOfTheWeek);
      ddEnd = String(today.getDate() - dayOfTheWeek + 4);
    }
    else {
      dd = String(today.getDate() - dayOfTheWeek + 7);
      ddEnd = String(today.getDate() - dayOfTheWeek + 12);    //will not work when it approaches month end -- sort it out 
    }

    if (this.state.createdPlanner)
      return <Redirect to="/options" />
    else {
      return (

        <div>
          <Container>
            <h1> Plan My Week</h1>
            <h1>Time Period: {dd + "/" + mm + "/" + yyyy} to {ddEnd + "/" + mm + "/" + yyyy}</h1>

            {this.state.days.map((day) => (
              <div key={day} className="planner">
                <div><h2 className={day}>{day}</h2></div>
                {days[day] >= dayOfTheWeek ?
                  <Dropdown
                    placeholder='Destination'
                    fluid
                    search
                    selection
                    clearable
                    options={this.state.destinationOptions}
                    onChange={(e) => this.handleChange(e, day)}
                  /> :
                  <Dropdown
                    placeholder='Destination'
                    fluid
                    search
                    selection
                    clearable
                    disabled
                    options={this.state.destinationOptions}
                    onChange={(e) => this.handleChange(e, day)}
                  />
                }
              </div>
            ))}
            <Button primary type="submit" onClick={() => this.submitPlanner()}>Submit</Button>
          </Container>
        </div>
      )
    }
  }
}

export default PlanYourWeek;