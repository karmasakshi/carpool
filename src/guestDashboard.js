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
      focused: null,
      isUserAvailable: false
    };
  }

  componentDidMount() {
    this.findAvailableHostsByDate(this.state.date)
  }

  componentDidUpdate() {
    if (this.state.isUserAvailable === false) {
      this.findAvailableHostsByDate(this.state.date)
    }
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

  findAvailableHostsByDate(date) {
    let requestArray = [];
    let allUsers = [];

    requestArray = this.updateRequestArray();

    fire.database().ref('users').once('value').then((snapshot) => {
      allUsers = snapshot.val();
      var result = [];

      for (let user in allUsers) {

        var x = allUsers[user];

        if (this.props.appUser.role !== x.role && this.isCloseby(this.props.appUser.lat, this.props.appUser.lng, x.lat, x.lng, 200)) {
          result.push(x);  //should be calculated as per driver available -- feature to be added
        }
      }
      if (allUsers !== []) {
        this.setState({
          results: result,
          requests: requestArray,
          date: date,
          isUserAvailable: true
        })
      }
    }).catch((error) => {
     // console.log(error)
    })
  }



  updateRequestArray() {
    var requestArray = [];

    if (this.props.appUser !== null) {
      fire.database().ref('Requests').orderByChild("guestID").equalTo(this.props.authUser.uid).once('value').then((snapshot) => {
        if (snapshot.val()) {
          Object.values(snapshot.val()).forEach(function (request) {
            requestArray.push({
              hostID: request.hostID,
              dateOfJourney: request.dateOfJourney
            })
          });
        }
        else
          requestArray = [];
      })
    }
    return requestArray;
  }

  sendRequest(hostId, hostFirstName, hostLastName) {

    let requestsArr = this.state.requests;

    fire.database().ref('Requests/').push({
      guestID: this.props.appUser.id,
      guestName: this.props.appUser.firstName + " " + this.props.appUser.lastName,
      dateOfJourney: String(this.state.date._d),
      hostID: hostId,
      hostName: hostFirstName + ' '+ hostLastName,
      isApproved: false
    }).then(() => {
      requestsArr.push({ hostID: hostId, dateOfJourney: this.state.date._d });
      this.setState({
        requests: requestsArr
      })
    }).catch((e) => {
     // console.log(e)
    })
  }

  handleDateChange(date) {
    this.findAvailableHostsByDate(date);
  }

  searchForRequests(hostId) {
    for (var i = 0; i < this.state.requests.length; i++) {
      if((this.state.requests[i].hostID === hostId) && (new Date(this.state.requests[i].dateOfJourney).toDateString() === new Date(this.state.date._d).toDateString())) {
           return true;
      }   
    }
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
                  <Image> <i class="user huge icon"></i> </Image>
                  <Card.Content>
                    <Card.Header>{host.firstName} {host.lastName}</Card.Header>
                    <br />
                    <Button className='styling' color='green' disabled={this.searchForRequests(host.id)} onClick={() => { this.sendRequest(host.id, host.firstName, host.lastName) }}>Request a ride</Button>
                    <br />
                    <br />
                    {this.searchForRequests(host.id) ? <p className='req'><i className="check icon"></i>Your request has been sent</p> : null}
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