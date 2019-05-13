import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Grid, Image, Card, Icon, Button, Item, Segment} from 'semantic-ui-react'
import fire from './config/fire'

class Results extends Component {

  constructor(props) {
    
    console.log(0);

    super(props);

    this.state = { currentUser: this.props.currentUser, results: this.props.results };
  }
 
 
  /*
  componentWillReceiveProps(nextProps){

    console.log(2,'recieved props');
    if(this.props.currentUser !== nextProps.currentUser) {   //nextProps is the latest props it recioeves from parent component
      this.setState({
        
        results: nextProps.results,
        currentUser: nextProps.currentUser
      });
  }
  console.log("props", JSON.stringify(nextProps));
  console.log("i am form componentWillRecieveProps: ", JSON.stringify(this.state.currentUser));
  console.log("fghjkilo", JSON.stringify(this.state.results));
}
*/

componentDidMount() {
 console.log(" i am componentdidmount()");

 if(localStorage.getItem('currentUser') === ''){
  this.componentDidUpdate();
 } 
 else 
 {
   console.log('using data from local storage');
 }
}

/*
componentWillUpdate(nextProps, nextState){
localStorage.getItem('currentUser') && this.setState({
  currentUser: localStorage.getItem('currentUser'),
  results: JSON.parse(localStorage.getItem('results'))
})
}*/

componentDidUpdate() {
  console.log("i was called again");
  
  /*
  if (this.state.currentUser === undefined) {

    this.setState({currentUser: this.props.currentUser});

  }
*/

  if (this.state.results.length === 0 && this.state.currentUser !== undefined && this.props.results.length > 0) {

    this.setState({results: this.props.results, currentUser: this.props.currentUser});

  }
}

handleRequest=()=>{
 // fire.database().ref().child('users').update({request: "hey a request"}); //CHECK THIS OUT
}

  render() {
   console.log(3);
  // console.log('/////;l;;;;;', JSON.stringify(this.state.currentUser[0].role));
   console.log("other users:", JSON.stringify(this.state.results));
  
   var x = JSON.parse(localStorage.getItem('currentUser')); 
   console.log("role", x[0].role);
   
   if(x[0].role === 'host')
   {
     return(
       <div>
       <h1> Hey, you have logged in as host. you will shortly see the list of requests</h1>
     <Grid container>
     <Grid.Column width={16}>
      <Segment.Group>
      <Segment>
      <Item.Group>
      <Item>
      <Item.Image size='tiny' src='/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>Header</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          <Image src='/images/wireframe/short-paragraph.png' />
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>
   
   </Item.Group>
   </Segment>
   </Segment.Group>
   </Grid.Column>
   </Grid>
    </div>
     )
   }
   else{
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
}

export default Results;