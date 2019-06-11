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
import moment from 'moment';

class GuestDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: [],
      requests: [],
      date: moment().add(1, "day"),
      focused: null
    };
  }

  componentDidMount() {

    this.findRequestedDriversByDate(this.state.date)

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
  FirebaseMessaging() {
    const messaging = fire.messaging();
    messaging.usePublicVapidKey("BH5Gjuahju79-ITrvvJ3cMTSLyBep3VhERmAdLdGvf8rPZjgIfM40Pemd6PkM1GsE_07ZmzqUU2Mape9q3-S9Fk");
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...
      } else {
        console.log('Unable to get permission to notify.');
      }
    });



  }

  deg2rad(deg) {

    return deg * (Math.PI / 180)

  }

  findRequestedDriversByDate(date) {
    let allUsers = [];
    let usersID = [];
    console.log(this.props.appUser);
    fire.database().ref('users').once('value').then((snapshot) => {

      allUsers = snapshot.val();
    }).then(() => {
      var result = [];

      for (let user in allUsers) {

        var x = allUsers[user];

        if (this.props.appUser.role !== x.role && this.isCloseby(this.props.appUser.lat, this.props.appUser.lng, x.lat, x.lng, 200)) {
          result.push(x);  //should be calculated as per driver available -- feature to be added
        }

        if (x.requests) {
          if (x.requests.hasOwnProperty(this.props.appUser.id)) {


            var dateObj = new Date(x.requests[this.props.appUser.id]["dateOfJourney"]);

            if (dateObj.toDateString() === date._d.toDateString()) {
              usersID.push(x.id);
            }
          
        }
      }

      this.setState({
        results: result,
        requests: usersID,
        date: date
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  sendRequest(hostId) {

    let requestsArr = this.state.requests;

    fire.database().ref('users/' + hostId + '/requests/' + this.props.appUser.id).set({
      id: this.props.appUser.id,
      firstName: this.props.appUser.firstName,
      lastName: this.props.appUser.lastName,
      dateOfJourney: this.state.date._d
    }).then(() => {
      requestsArr.push(hostId);
      this.FirebaseMessaging();
      this.setState({
        requests: requestsArr
      })
    }).catch(() => {
      console.log("error message")
    })
  }

  handleDateChange(date) {

    this.findRequestedDriversByDate(date);

  }

  componentWillUnmount() {
    fire.database().ref('users').off();
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