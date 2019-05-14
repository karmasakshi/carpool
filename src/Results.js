import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Grid, Image, Card, Icon, Button, Item, Segment} from 'semantic-ui-react'
import fire from './config/fire'

class Results extends Component {

  constructor(props) {
    
    console.log(0);

    super(props);

    this.state = { currentUser: this.props.currentUser, results: this.props.results, requests:[], requestSendRecieve: false};
  }

componentDidMount() {
 console.log(" i am componentdidmount()");
 
 var x = JSON.parse(localStorage.getItem('currentUser'));
 var id=x[0].id;
 
 var requests = [];

let newState = [];

if(x[0].role==="host"){
var query = fire.database().ref("users/"+id+'/requesting');
query.once("value").then((snapshot)=> {
requests = snapshot.val(); // {first:"Ada",last:"Lovelace"}child("requesting").
 console.log("i am requests array:", (requests) );
 for (let request in requests) {
  newState.push({
    id: request,
    uid:requests[request].uid,
    firstName:requests[request].firstName,
    lastName:requests[request].lastName
  
  });
}

 console.log("newState",newState);
 this.setState({requests:newState});
 
});
}
console.log(this.state.requests);
 if(localStorage.getItem('currentUser') === ''){
  this.componentDidUpdate();
 } 
 else 
 {
   console.log('using data from local storage');
 }
}

componentDidUpdate() {
 
  if (this.state.currentUser === undefined) {

    this.setState({currentUser: this.props.currentUser});

  }


  if (this.state.results.length === 0 && this.state.currentUser !== undefined && this.props.results.length > 0) {

    this.setState({results: this.props.results, currentUser: this.props.currentUser});

  }
}

sendRequest(index){
  
  var currentUserUID=this.props.currentUser[0].uid;
  var currentUserFirstName=this.props.currentUser[0].firstName;
  var currentUserLastName=this.props.currentUser[0].lastName;
 
  console.log("currentuserUID",currentUserUID);
 
  const requestsObj = fire.database().ref(`users/`+this.props.results[index].id+'/requesting');

  requestsObj.push({uid: currentUserUID, firstName:currentUserFirstName, lastName:currentUserLastName});       //similar to the Array.push method, this sends a copy of our object so that it can be stored in Firebase.

   this.setState({requestSendRecieve: true});
} 
  
  retrieveRequests=(x)=>{
  
  }

  acceptRequest=(index)=>{
    var requests = [];

    var currentUserUID=this.props.currentUser[0].id;
    var currentUserFirstName=this.props.currentUser[0].firstName;
    var currentUserLastName=this.props.currentUser[0].lastName;
  console.log(this.state.requests[index].id)
  console.log("currentuserUID",currentUserUID);
  console.log("iddd",this.state.requests);
  
  const query = fire.database().ref(`users/`+this.props.currentUser[0].id+'/requesting/'+this.state.requests[index].id+'/uid');
  //var query = fire.database().ref("users/"+this.state.requests[index].id+'/requesting');
  query.once("value").then((snapshot)=> {
  requests = snapshot.val(); // {first:"Ada",last:"Lovelace"}child("requesting").
 console.log("i am requests array:", requests );
});

fire.database().ref("users").equalTo(query).once('value').then((snapshot)=>{
         console.log('//////????', snapshot.val());
});
 
  // acceptRequests.push({uid: currentUserUID, firstName:currentUserFirstName, lastName:currentUserLastName});       //similar to the Array.push method, this sends a copy of our object so that it can be stored in Firebase.
}

  render() {
   console.log(3);
   console.log("other users:", JSON.stringify(this.state.results));
  
   var x = JSON.parse(localStorage.getItem('currentUser')); 
   console.log("role", x[0].role);
   
   if(x[0].role === 'host')
   {
     return(
       <div>
        {this.state.requests.length === 0? <h1>Hey {x[0].firstName}, you currently have no requests</h1>:
       this.state.requests.map((request,index)=>(
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
             <Button color='green' onClick={()=>{this.acceptRequest(index)}}>Accept Request</Button>
           </Item.Content>  
         </Item>
        </Item.Group>
        </Segment>
        </Segment.Group>
        </Grid.Column>
        </Grid>

       ))};
     
    </div>
     )
   }
   else if(x[0].role === 'guest'){
   return (
      <div>
        <Grid container columns={3}>
          {this.props.results.map((user, index) => (
            <Grid.Column key={index}>
              <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{user.firstName} {user.lastName}</Card.Header>
                  <Card.Description>Distance from you: {user.distance} m</Card.Description>
                  <Button color='green' onClick={() => { this.sendRequest(index) }}>Request a ride</Button>
                </Card.Content>
              {this.state.requestSendRecieve === true? <p>your request has been sent!!!</p>: ''}
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