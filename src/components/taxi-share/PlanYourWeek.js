import React, { Component } from "react";
import '../../styles/index.css'
import { Dropdown, Container, Button } from 'semantic-ui-react';
import fire from '../../config/fire';
import { Redirect } from 'react-router-dom';

class PlanYourWeek extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      Sunday: '',
      Monday: '',
      Tuesday: '',
      Wednesday: '',
      Thursday: '',
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      destinationOptions: [],
      week: null,
      createdPlanner: false
    };

    this.submitPlanner = this.submitPlanner.bind(this);
  }

  componentDidMount() {
    let destinationOptions = [];

    let week = this.calculateWeek();

    fire.database().ref('destinations').once('value').then((snapshot) => {
      let destinations = Object.keys(snapshot.val());

      for (var i = 0; i < destinations.length; i++) {
        destinationOptions.push({                          //order in which semantic ui react dropdown uses values
          value: Object.keys(snapshot.val())[i],
          text: Object.keys(snapshot.val())[i]
        });
      }

      this.setState({
        destinationOptions: destinationOptions,
        week: week
      });
    })
  }

  calculateWeek = () => {
    var today = new Date();
    var dd, ddEnd;
    var mm = String(today.getMonth() + 1); //January is 0!
    var yyyy = today.getFullYear();
    var dayOfTheWeek = today.getDay();
    var week;

    if (dayOfTheWeek <= 4) {
      dd = String(today.getDate() - dayOfTheWeek);
      ddEnd = String(today.getDate() - dayOfTheWeek + 4);
    }
    else {
      dd = String(today.getDate() - dayOfTheWeek + 7);
      ddEnd = String(today.getDate() - dayOfTheWeek + 12);    //will not work when it approaches month end -- sort it out 
    }

    week = dd + "/" + mm + "/" + yyyy + " to " + ddEnd + "/" + mm + "/" + yyyy;

    return week;
  }

  handleChange = (e, { value }, day) => {
    let obj = {};

    obj[day] = e.target.innerText;
    obj[value] = e.target.innerText;   //value is used by code of semantic ui react dropdown 

    this.setState(obj);
  }

  submitPlanner() {
    fire.database().ref('/Taxi-Users/' + this.props.appUser.id).update({
      Sunday: this.state.Sunday,
      Monday: this.state.Monday,
      Tuesday: this.state.Tuesday,
      Wednesday: this.state.Wednesday,
      Thursday: this.state.Thursday,
      week: this.state.week
    }).then(
      this.setState({
        createdPlanner: this.state.week
      })
    )
  }

  render() {
    let { value } = this.state;

    let days = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6
    }

    let dayOfTheWeek = new Date().getDay();

    if (this.state.createdPlanner === this.state.week)
      return <Redirect to="/taxi-share" />
    else {
      return (
        <div>
          <Container>
            <h1> Plan My Week</h1>
            <h1>Time Period: {this.state.week}</h1>

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
                    onChange={(e) => this.handleChange(e, { value }, day)}
                  /> :
                  <Dropdown
                    placeholder='Destination'
                    fluid
                    search
                    selection
                    clearable
                    disabled
                    options={this.state.destinationOptions}
                    onChange={(e) => this.handleChange(e, { value }, day)}
                  />
                }
              </div>
            ))}
            <Button primary type="submit" onClick={this.submitPlanner}>Submit</Button>
          </Container>
        </div>
      )
    }
  }
}

export default PlanYourWeek;