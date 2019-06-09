import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Grid, Image, Card, Button, Item, Segment } from 'semantic-ui-react'
import fire from './config/fire'


class Host extends Component {
  state = {
    usersRequests: [],
    sendReq: [],
    acceptReq: [],
    requestMessageDisplay: null
  };

  componentDidMount() {
    if (this.props.appUser.role === 'host')
      this.retrieveRequests();

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



  render() {
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
    );
  }
}




export default Host;