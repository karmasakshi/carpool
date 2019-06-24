import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import fire from './config/fire';
import 'firebase'
import { Grid, Image, Button, Item, Segment } from 'semantic-ui-react'
import moment from 'moment';

class HostDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      usersRequests: [],
      isUsersRequestsRetrieved: false,
      acceptedRequests: [],
      isUserAvailable: false,
      date: moment().add(1, "day")
    };
  }

  componentWillMount() {
    var date = new Date(Date.now()).getTime();

    fire.database().ref('Requests/').orderByChild('dateOfJourney').endAt(date).once("value").then((snapshot) => {
      snapshot.forEach(function (child) {
        child.ref.remove();
      })

      this.retrieveRequests();
    }).catch((error) => {
      console.log(error);
    });

  }

  componentDidMount() {
    this.retrieveRequests();
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

  acceptRequest = (requestId) => {
    let acceptedRequests = this.state.acceptedRequests;

    fire.database().ref('Requests/' + requestId).update({
      'isApproved': true
    }).then(() => {
      acceptedRequests.push(requestId);

      this.setState({
        acceptedRequests: acceptedRequests
      })
    }
    );
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

      fire.database().ref("Requests/").orderByChild('hostID').equalTo(this.props.authUser.uid).once("value").then((snapshot) => {
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

    let messaging = fire.messaging();
    let token;

    fire.messaging().requestPermission().then(() => {
       console.log("Have Permission");
       token = messaging.getToken();
       console.log('i am token', token);
       return messaging.getToken();
     }).then(token => {
       console.log("FCM Token:", token);
       //you probably want to send your new found FCM token to the
       //application server so that they can send any push
       //notification to you.
     }).catch(error => {
       if (error.code === "messaging/permission-blocked") {
          console.log("Please Unblock Notification Request Manually");
       } 
       else {
          console.log("Error Occurred", error);
       }
      });
  }

  componentWillUnmount() {
    fire.database().ref('users').off();
    fire.database().ref('Requests').off();
  }

  render() {
    return (
      <div>
        {this.state.usersRequests.length === 0 ? <h1>Hey {this.props.appUser.firstName}, you currently have no requests</h1> :
          this.state.usersRequests.map((requester) => (
            <Grid key={requester.requestId} container>
              <Grid.Column width={16}>
                <Segment.Group>
                  <Segment>
                    <Item.Group>
                      <Item>
                        <Item.Image size='tiny' src='/images/wireframe/image.png' />
                        <Item.Content>
                          <Item.Header>{requester.guestName} </Item.Header>
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