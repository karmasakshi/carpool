import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import fire from './config/fire';
import { Grid, Image, Button, Item, Segment } from 'semantic-ui-react'
import moment from 'moment';
import * as functions from 'firebase-functions';

class HostDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      usersRequests: [],
      isUsersRequestsRetrieved: false,
      acceptedRequests: [],
      isUserAvailable: false,
      date: moment().add(1, "day"),
    };
  }

  componentDidMount() {
    this.retrieveRequests();
    this.clearOldRequests();
  }


  componentDidUpdate() {
    if (this.state.isUsersRequestsRetrieved === false) {
      this.retrieveRequests();
    }
  }

  findAcceptedRequests(usersRequests) {

    let acceptedRequests = [];

    usersRequests.forEach(function (request) {
      if (request.isApproved === true) {
        acceptedRequests.push(request.requestId);
      }
    })
    return acceptedRequests;
  }

  clearOldRequests=()=>{
    console.log('i am working');
  }


  acceptRequest = (requestId) => {
    fire.database().ref('Requests/' + requestId).update({
      'isApproved': true
    })
  }

  declineRequest = (requestId) => {
    var usersRequests = this.state.usersRequests;

    fire.database().ref('Requests/' + requestId).remove();

    var x = usersRequests.filter(function (request) {
      return request.requestId !== requestId;
    })
    this.setState({
      usersRequests: x
    })
  }

  retrieveRequests = () => {

    var acceptedRequests = [];
    var usersRequests = [];
    var requestIds = [];
     
    if (this.props.appUser !== null) {

      fire.database().ref("Requests/").orderByChild('hostID').equalTo(this.props.appUser.id).once("value").then((snapshot) => {
        if (snapshot.val()) {
          usersRequests = Object.values(snapshot.val());
          requestIds = Object.keys(snapshot.val());
        }
        else {
          usersRequests = [];
          requestIds = [];
        }

        if (requestIds !== []) {
          for (var i = 0; i < requestIds.length; i++) {
            usersRequests[i].requestId = requestIds[i];
          }
        }

        acceptedRequests = this.findAcceptedRequests(usersRequests);

        if (this.state.usersRequests !== [])
          this.setState({ isUsersRequestsRetrieved: true, usersRequests: usersRequests, acceptedRequests: acceptedRequests });
      })
    }
  }

  componentWillUnmount() {
    fire.database().ref('users').off();
    fire.database().ref('Requests').off();
  }

  render() {
    return (
      <div>
        {this.state.usersRequests.length === 0 ? <h1>Hey, you currently have no requests</h1> :
          this.state.usersRequests.map((requester) => (
            <Grid key={requester.requestId} container>
              <Grid.Column width={16}>
                <Segment.Group>
                  <Segment>
                    <Item.Group>
                      <Item>
                        <Item.Image size='tiny' src='/images/wireframe/image.png' />
                        <Item.Content>
                          <Item.Header as='a'>{requester.guestName} </Item.Header>
                          <Item.Description>
                            <Image src='/images/wireframe/short-paragraph.png' />
                          </Item.Description>
                          <Item.Extra>{new Date(requester.dateOfJourney).toDateString()}</Item.Extra>
                          <Button className='styling' color='green' disabled={this.state.acceptedRequests.indexOf(requester.requestId) !== -1}
                            onClick={() => { this.acceptRequest(requester.requestId) }}>Accept Request</Button>
                          <Button className='styling' color='red' disabled={this.state.acceptedRequests.indexOf(requester.requestId) !== -1} onClick={() => { this.declineRequest(requester.requestId) }}>Decline Request</Button>
                          {this.state.acceptedRequests.indexOf(requester.requestId) !== -1 ? <p className='req'><i className="check icon"></i>Your accept has been sent</p> : null}
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

//disabled = { this.state.acceptedRequests.indexOf(requester.requestId) !== -1 }
//