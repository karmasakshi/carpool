import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Grid, Image, Card, Icon, Button} from 'semantic-ui-react'
import fire from './config/fire'

class Results extends Component {

  constructor(props) {

    console.log(0);

    super(props);

    this.state = { results: this.props.results, currentUser: this.props.currentUser };

  }

  componentWillReceiveProps(nextProps){
    
    console.log(2,'recieved props');
    if(this.props != nextProps) {
      this.setState({
        currentUser: nextProps.currentUser,
        results: nextProps.results,
      });
  }
  console.log("props", JSON.stringify(nextProps));
  console.log("fghjkilo", JSON.stringify(this.state.results));
}
  
handleRequest=()=>{
  fire.database().ref().child('users').update({request: "hey a request"}); //CHECK THIS OUT
}

  render() {
   console.log(3);
   console.log('/////;l;;;;;', JSON.stringify(this.state.currentUser));
  
    return (
      <div>
        <Grid container columns={3}>
          {this.state.results.map((user, index) => (
            <Grid.Column key={index}>
              <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{user.firstName} {user.lastName}</Card.Header>
                  <Card.Description>Distance from you: {user.distance} m</Card.Description>
                  <Button inverted color='green' onClick={this.handleRequest}>Request a ride</Button>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    )
  }
}

export default Results;