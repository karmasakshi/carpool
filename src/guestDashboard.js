import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Grid, Image, Card, Button } from 'semantic-ui-react'
import fire from './config/fire'
import { Form, Container } from 'semantic-ui-react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import { Icon } from 'semantic-ui-react'

class GuestDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: [],
      requests: [],
      date: null,
      focused: null
    };
  }

  componentDidMount() {
    let allUsers = [];
    let usersID = [];

    fire.database().ref('users').once('value').then((snapshot) => {

      allUsers = snapshot.val();
    }).then(() => {
      var result = [];

      for (let user in allUsers) {

        var x = allUsers[user];

        if (this.props.appUser.role !== x.role && this.isCloseby(this.props.appUser.lat, this.props.appUser.lng, x.lat, x.lng, 200)) {
          result.push(x);
        }

        if (x.requests) {
          if (x.requests.hasOwnProperty(this.props.appUser.id)) {
            usersID.push(x.id);
          }
        }
      }

      this.setState({
        results: result,
        requests: usersID
      })
    }).catch(() => {
      console.log("error has occured")
    })
  }

  isCloseby(xLat, xLong, yLat, yLong, delta) {

    var R = 6371;

    var dLat = this.deg2rad(yLat - xLat);
    var dLon = this.deg2rad(yLong - xLong);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(xLat)) * Math.cos(this.deg2rad(yLat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c * 1000;

    if (d <= delta) {

      return true;

    }
  }


  deg2rad(deg) {

    return deg * (Math.PI / 180)

  }

  sendRequest(hostId) {

    let requestsArr = this.state.requests;

    fire.database().ref('users/' + hostId + '/requests/' + this.props.appUser.id).set({
      id: this.props.appUser.id,
      firstName: this.props.appUser.firstName,
      lastName: this.props.appUser.lastName,
      dateOfJourney: String(this.state.date._d)
    }).then(() => {
      requestsArr.push(hostId);

      this.setState({
        requests: requestsArr
      })
    }).catch(() => {
      console.log("error message")
    })       //similar to the Array.push method, this sends a copy of our object so that it can be stored in Firebase.

  }

  handleDateChange(date) {

    this.setState({
      date: date
    });

  }

  render() {
    return (
      <div>
         <Container>
          <Form.Group>
            <label name="departureDate">Departure Date: </label>
            <SingleDatePicker
              // showClearDate={true}
              customInputIcon={
                <Icon name="calendar alternate outline" size='big' />
              }
              inputIconPosition="after"
              small={true}
              block={false}
              numberOfMonths={1}
              date={this.state.date}
              onDateChange={date => this.handleDateChange(date)}
              focused={this.state.focused}
              onFocusChange={({ focused }) =>
                this.setState({ focused })
              }
              openDirection="down"
              hideKeyboardShortcutsPanel={true}
            />
          </Form.Group>
          <br />
        <Grid columns={4}>
          {this.state.results.map((host) => (
            <Grid.Column key={host.id}>
              <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{host.firstName} {host.lastName}</Card.Header>
                  <br />
                  <Button className='styling' color='green' disabled={this.state.requests.indexOf(host.id) !== -1} onClick={() => { this.sendRequest(host.id) }}>Request a ride</Button>
                  <br />
                  <br />
                  {this.state.requests.indexOf(host.id) !== -1 ? <p className='req'><i className="check icon"></i>Your request has been sent</p> : null}
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
        </Container>
      </div>
    )
  }
}

export default GuestDashboard;