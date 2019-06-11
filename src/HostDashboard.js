import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import fire from './config/fire';
import { Grid, Image, Button, Item, Segment } from 'semantic-ui-react'
import { updateLocale } from "../../../Library/Caches/typescript/3.3/node_modules/moment/moment";
import moment from 'moment';
class HostDashboard extends Component {

  constructor(props) {
    super(props);
    console.log('sri varun', this.props)
    this.state = {
      usersRequests: [],
      acceptedRequests: [],
      date: moment().add(1, "day"),

    };
  }




  componentDidUpdate() {
    if (this.state.usersRequests === null) {
      this.retrieveRequests();
    }
  }
  findAcceptedRequesters() {
    var allUsers = [];
    var acceptedRequestersID = [];

    fire.database().ref('users').once('value').then((snapshot) => {

      allUsers = snapshot.val();
    }).then(() => {

      for (let user in allUsers) {

        var x = allUsers[user];
        console.log(x);
        if (x.accept) {
          if (x.accept.hasOwnProperty(this.props.appUser.id)) {
            acceptedRequestersID.push(x.id);
          }
        }
      }
    }).catch(() => {
      console.log("ERROR has occured");
    })

    return acceptedRequestersID;

  }

  acceptRequest = (requesterId, dateOfPickUp) => {
    fire.database().ref(`users/` + requesterId + '/accept/' + this.props.appUser.id).set({
      id: this.props.appUser.id,
      firstName: this.props.appUser.firstName,
      lastName: this.props.appUser.lastName,
      dateOfPickUp: dateOfPickUp
    });
  }

  declineRequest = (requesterId) => {
    fire.database().ref(`users/` + this.props.appUser.id + '/requests/' + requesterId).remove();
    var requests = this.state.usersRequests;
    var deleteRiderIndex = requests.findIndex(o => o.id === requesterId);
    requests.splice(deleteRiderIndex, 1);
    this.setState({
      usersRequests: requests
    });
  }


  retrieveRequests = () => {

    var acceptedRequestersId = [];
    var usersRequests = [];
    var newRequest = [];
    if (this.props.appUser !== null) {
      fire.database().ref("users/" + this.props.appUser.id + '/requests').once("value").then((snapshot) => {
        usersRequests = snapshot.val();
        console.log(this.props.appUser);
        for (let userRequest in usersRequests) {
          newRequest.push({
            id: usersRequests[userRequest].id,
            firstName: usersRequests[userRequest].firstName,
            lastName: usersRequests[userRequest].lastName,
            dateOfJourney: usersRequests[userRequest].dateOfJourney
          });

          acceptedRequestersId = this.findAcceptedRequesters();
          console.log('///', acceptedRequestersId);

          if (this.state.usersRequests !== [])
            this.setState({ usersRequests: newRequest, acceptedRequests: acceptedRequestersId });
        }
      });
    }

  }

  componentWillUnmount() {
    fire.database().ref('users').off();
  }

  render() {
    return (
      <div>
        {this.state.usersRequests.length === 0 ? <h1>Hey, you currently have no requests</h1> :
          this.state.usersRequests.map((requester) => (
            <Grid key={requester.id} container>
              <Grid.Column width={16}>
                <Segment.Group>
                  <Segment>
                    <Item.Group>
                      <Item>
                        <Item.Image size='tiny' src='/images/wireframe/image.png' />
                        <Item.Content>
                          <Item.Header as='a'>{requester.firstName} {requester.lastName}</Item.Header>
                          <Item.Meta>Date of Joruney: {new Date(requester.dateOfJourney).toDateString()}</Item.Meta>
                          <Item.Description>
                            <Image src='/images/wireframe/short-paragraph.png' />
                          </Item.Description>
                          <Item.Extra>Additional Details</Item.Extra>
                          <Button className='styling' color='green' disabled={this.state.acceptedRequests.indexOf(requester.id) !== -1} onClick={() => { this.acceptRequest(requester.id, requester.dateOfJourney) }}>Accept Request</Button>
                          {this.state.acceptedRequests.indexOf(requester.id) !== -1 ? <p className='req'><i className="check icon"></i>Your accept has been sent</p> : null}
                          <Button className='styling' color='red' onClick={() => { this.declineRequest(requester.id) }}>Decline Request</Button>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Segment>
                </Segment.Group>
              </Grid.Column>
            </Grid>
          ))}
      </div>
    );
  }
}

export default HostDashboard;
