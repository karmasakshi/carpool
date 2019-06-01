import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Grid, Image, Card, Button, Item, Segment } from 'semantic-ui-react'
import fire from './config/fire'

class guestDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      usersRequests: [],
      requestMessageDisplay: null
    };
  }

  componentDidMount() {

  }


  sendRequest(index) {

    fire.database().ref(`users/ + ${this.props.results[index].id} + /requests`).push({
      id: this.props.appUser.id,
      firstName: this.props.appUser.firstName,
      lastName: this.props.appUser.lastName
    });       //similar to the Array.push method, this sends a copy of our object so that it can be stored in Firebase.

    console.log(this.props.appUser.id);

    this.setState({
      requestMessageDisplay: this.props.results[index].id
    })

  }

  render() {

    return (
      <div>
        {console.log('results props', this.props.results)}
        <Grid container columns={3}>
          {console.log("i am reslts props", this.props.results)}
          {this.props.results.map((user, index) => (
            <Grid.Column key={index}>
              <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{user.firstName} {user.lastName}</Card.Header>
                  <br />
                  <Button className='styling' color='green' onClick={() => { this.sendRequest(index) }}>Request a ride</Button>
                  <br />
                  <br />
                  {this.state.requestMessageDisplay === this.props.results[index].id ? <p className='req'><i className="check icon"></i>Your request has been sent</p> : null}

                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    )
  }
}

export default guestDashboard;