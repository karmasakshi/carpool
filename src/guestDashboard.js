import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Grid, Image, Card, Button, Item, Segment } from 'semantic-ui-react'
import fire from './config/fire'

class GuestDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pushAppUserRequest: null,
      results: [],
      requests: []
    };
  }

  componentWillMount() {
    let allUsers = [];

    fire.database().ref('users').once('value').then((snapshot) => {

      allUsers = snapshot.val();

    }).then(() => {
      var result = [];

      for (let user in allUsers) {

        var x = allUsers[user];

        if (this.props.appUser.role !== x.role && this.isCloseby(this.props.appUser.lat, this.props.appUser.lng, x.lat, x.lng, 200)) {
          result.push(x);
        }

      }

      this.setState({
        results: result
      })
    }).catch(() => {
      console.log("error has occured")
    })

    var arr = [];     
      
      fire.database().ref('users/'+this.state.results[0].id+'/requests'+this.props.appUser.id).then((snapshot)=>{
        arr.push(this.state.results[0].id);

        console.log("hey i am finally working", snapshot.val());
         
        
        this.setState({
          requests: arr
        })
        console.log("i am requests array", this.state.requests);
      
      
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

  sendRequest(index) {

    let requestsArr = this.state.requests;

    fire.database().ref('users/' + this.state.results[index].id + '/requests/'+this.props.appUser.id).set({
      id: this.props.appUser.id,
      firstName: this.props.appUser.firstName,
      lastName: this.props.appUser.lastName
    }).then(() => {
      requestsArr.push(this.state.results[index].id);

      this.setState({
        requests: requestsArr
      })
    }).catch(() => {
      console.log("error message")
    })       //similar to the Array.push method, this sends a copy of our object so that it can be stored in Firebase.

  }


  render() {

    return (
      <div>
        <Grid container columns={3}>
          {this.state.results.map((host, index) => (
            <Grid.Column key={index}>
              <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{host.firstName} {host.lastName}</Card.Header>
                  <br />
                  <Button className='styling' color='green' disabled={this.state.requests.indexOf(this.state.results[index].id) !== -1} onClick={() => { this.sendRequest(index) }}>Request a ride</Button>
                  <br />
                  <br />
                  {this.state.requests.indexOf(this.state.results[index].id) !== -1 ? <p className='req'><i className="check icon"></i>Your request has been sent</p> : null}
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    )
  }
}

export default GuestDashboard;