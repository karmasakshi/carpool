import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Grid, Image, Card, Button, Item, Segment } from 'semantic-ui-react'
import fire from './config/fire'
 
class Results extends Component {
 
  constructor(props) {
    super(props);
 
    this.state = {
      usersRequests: [],
      sendReq: [],
      acceptReq: [],
      requestMessageDisplay: null
    };
  }
 
  componentDidMount() {
 
    if (this.props.appUser.role === 'host')
      this.retrieveRequests();
 
  }
 

  sendRequest(index) {
   
    fire.database().ref(`users/` + this.props.results[index].id + '/requests').push({
      id: this.props.appUser.id,
     firstName: this.props.appUser.firstName,
      lastName: this.props.appUser.lastName
    });       //similar to the Array.push method, this sends a copy of our object so that it can be stored in Firebase.
   
    console.log(this.props.appUser.id);
 
    this.setState({
      requestMessageDisplay: this.props.results[index].id
    })
   
  }
 
  retrieveRequests = () => {
 
    var usersRequests = [];
 
    let newRequest = [];
 
    fire.database().ref("users/" + this.props.appUser.id + '/requests').once("value").then((snapshot) => {
      usersRequests = snapshot.val();
 
      for (let userRequest in usersRequests) {
        newRequest.push({
          id: usersRequests[userRequest].id,
          firstName: usersRequests[userRequest].firstName,
          lastName: usersRequests[userRequest].lastName
        });
 
        this.setState({ usersRequests: newRequest });
      }
    });
  }
 
  acceptRequest = (index) => {
 
    fire.database().ref(`users/` + this.state.usersRequests[index].id + '/accept').push({
      id: this.props.appUser.id
    });
  }
 
  declineRequest = (index) => {
 
    fire.database().ref(`users/` + this.props.appUser.id + '/requests/' + this.state.usersRequests[index].id).remove();
 
    var requests = this.state.usersRequests;
 
    var deleteRiderIndex = requests.findIndex(o => o.id === this.state.usersRequests[index].id);
 
    requests.splice(deleteRiderIndex, 1);
 
    this.setState({
      usersRequests: requests
    });
 
  }
 
  render() {
 
    if (this.props.appUser.role === 'host') {
      return (
        <div>
          {this.state.usersRequests.length === 0 ? <h1>Hey {this.props.appUser.firstName}, you currently have no requests</h1> :
            this.state.usersRequests.map((request, index) => (
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
    else if (this.props.appUser.role === 'guest') {
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
                    <br/>
                    <br />
                    { this.state.requestMessageDisplay === this.props.results[index].id? <p className='req'><i className="check icon"></i>Your request has been sent</p>: null}
                  
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