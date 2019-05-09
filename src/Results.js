import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Grid, Image, Card, Icon, Button} from 'semantic-ui-react'

class Results extends Component {

  constructor(props) {

    console.log(0);

    super(props);

    this.state = { results: this.props.results };

  }

  componentWillReceiveProps(nextProps){
    
    console.log(2);
    if(this.props != nextProps) {
      this.setState({
        results: nextProps.results,
      });
  }
  console.log("props", nextProps);
  console.log("fghjkilo", JSON.stringify(this.state.results));
}
  

  render() {
   console.log(3);
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
                  <Button inverted color='green'>Request a ride</Button>
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