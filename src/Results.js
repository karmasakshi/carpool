import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Grid, Image, Card, Button, Item, Segment } from 'semantic-ui-react'
import fire from './config/fire'

class Results extends Component {

  constructor(props) {

    console.log(0);

    super(props);

    this.state = { currentUser: this.props.currentUser, results: this.props.results, requests: [], acceptRiderUID: undefined, sendReq: [], acceptReq: [] };
  }

  componentDidMount() {
    console.log(" i am componentdidmount()");

    var x = JSON.parse(localStorage.getItem('currentUser'));

    if (x[0].role === "host") {
      this.retrieveRequests();
    }

    console.log(this.state.requests);
    if (localStorage.getItem('currentUser') === '') {
      this.componentDidUpdate();
    }
    else {
      console.log('using data from local storage');
    }
  }

  componentDidUpdate() {

    if (this.state.currentUser === undefined) {

      this.setState({ currentUser: this.props.currentUser });

    }


    if (this.state.results.length === 0 && this.state.currentUser !== undefined && this.props.results.length > 0) {

      this.setState({ results: this.props.results, currentUser: this.props.currentUser });

    }

    if (this.state.acceptRiderUID !== undefined) {

      var currentUserUID = this.props.currentUser[0].uid;
      var currentUserFirstName = this.props.currentUser[0].firstName;
      var currentUserLastName = this.props.currentUser[0].lastName;

      let riderObj = this.state.results.find(o => o.uid === this.state.acceptRiderUID);

      var riderId = riderObj.id;


      const accept = fire.database().ref(`users/` + riderId + '/accepted');
      accept.push({ uid: currentUserUID, firstName: currentUserFirstName, lastName: currentUserLastName });
    }

  }

  sendRequest(index) {

    var currentUserUID = this.props.currentUser[0].uid;
    var currentUserFirstName = this.props.currentUser[0].firstName;
    var currentUserLastName = this.props.currentUser[0].lastName;

    console.log("currentuserUID", currentUserUID);

    const requestsObj = fire.database().ref(`users/` + this.props.results[index].id + '/requesting');

    requestsObj.push({ uid: currentUserUID, firstName: currentUserFirstName, lastName: currentUserLastName });       //similar to the Array.push method, this sends a copy of our object so that it can be stored in Firebase.

    this.state.sendReq[index] = true;
    this.forceUpdate();
  }

  retrieveRequests = () => {

    var x = JSON.parse(localStorage.getItem('currentUser'));
    var id = x[0].id;

    var requests = [];

    let newState = [];

    var query = fire.database().ref("users/" + id + '/requesting');
    query.once("value").then((snapshot) => {
      requests = snapshot.val();
      console.log("i am requests array:", (requests));
      for (let request in requests) {
        newState.push({
          id: request,
          uid: requests[request].uid,
          firstName: requests[request].firstName,
          lastName: requests[request].lastName
        });

        console.log("newState", newState);
        this.setState({ requests: newState });
      }
    });
  }

  acceptRequest = (index) => {
    var acceptedRiderUID = undefined;

    var currentUserUID = this.props.currentUser[0].id;

    console.log(this.state.requests[index].id)

    const queryRider = fire.database().ref(`users/` + currentUserUID + '/requesting/' + this.state.requests[index].id + '/uid');

    queryRider.once("value").then((snapshot) => {
      acceptedRiderUID = snapshot.val();
      console.log("i am rider uid:", acceptedRiderUID);
      console.log("test", typeof (acceptedRiderUID));
      this.setState({ acceptRiderUID: acceptedRiderUID });
    });

    this.state.acceptReq[index] = true;
    this.forceUpdate();
  }

  declineRequest = (index) => {

    var currentUserUID = this.props.currentUser[0].id;
    fire.database().ref(`users/` + currentUserUID + '/requesting/' + this.state.requests[index].id).remove();

    var arr = this.state.requests;

    var rider_index = arr.findIndex(o => o.id === this.state.requests[index].id);

    arr.splice(rider_index, 1);
    console.log("arr after splicing", JSON.stringify(arr));

    this.setState({
      requests: arr
    });

    console.log('Requests array', JSON.stringify(this.state.requests));
  }

  render() {
    console.log(3);
    console.log("other users:", JSON.stringify(this.state.results));

    var x = JSON.parse(localStorage.getItem('currentUser'));

    if (x[0].role === 'host') {
      return (
        <div>
          {this.state.requests.length === 0 ? <h1>Hey {x[0].firstName}, you currently have no requests</h1> :
            this.state.requests.map((request, index) => (
              <Grid key={index} container>
                <Grid.Column width={16}>
                  <Segment.Group>
                    <Segment>
                      <Item.Group>
                        <Item>
                          <Item.Image size='tiny' src='/images/wireframe/image.png' />
                          <Item.Content>
                            <Item.Header as='a'>{request.firstName} {request.lastName}</Item.Header>
                            <Item.Meta>Description</Item.Meta>
                            <Item.Description>
                              <Image src='/images/wireframe/short-paragraph.png' />
                            </Item.Description>
                            <Item.Extra>Additional Details</Item.Extra>
                            <Button color='green' onClick={() => { this.acceptRequest(index) }}>Accept Request</Button>
                            <Button color='red' onClick={() => { this.declineRequest(index) }}>Decline Request</Button>
                            <p className='req'>{this.state.acceptReq[index]? 'Your accept request has been sent': null}</p>
                          </Item.Content>
                        </Item>
                      </Item.Group>
                    </Segment>
                  </Segment.Group>
                </Grid.Column>
              </Grid>

            ))}

        </div>
      )
    }
    else if (x[0].role === 'guest') {
      return (
        <div>
          <Grid container columns={3}>
            {this.props.results.map((user, index) => (
              <Grid.Column key={index}>
                <Card>
                  <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>{user.firstName} {user.lastName}</Card.Header>
                    <Card.Description className="description">Distance from you: {user.distance} m</Card.Description>
                    <br />
                    <Button color='green' onClick={() => { this.sendRequest(index) }}>Request a ride</Button>
                    <br />
                    <br />
                    <p className='req'>{this.state.sendReq[index]? <p><i className="check icon"></i>Your request has been sent</p>: null}</p>
                  </Card.Content>

                </Card>
              </Grid.Column>
            ))}
          </Grid>
        </div>
      )
    }
  }
}

export default Results;

//{this.state.requestSendRecieve[index] === true? <p>your request has been sent!!!</p>: ''}
//return null to prevent rendering