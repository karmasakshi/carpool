import React, {Component } from "react";
import Home from "./Home"
import {BrowserRouter,Switch,Route} from 'react-router-dom' 
import SignIn from "./SignIn"
import CreateAccount from "./CreateAccount"
import Navbar from './Navigation'
import './index.css'
import CreateProfile from './CreateProfile';
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Grid, Image, Card, Icon } from 'semantic-ui-react'
import fire from './config/fire'; 

class Results extends Component{
 constructor(props){
     super(props);
 }

 render(){
    console.log(this.props.users);

    let newState = this.props.users;
    
    let CurrentUser=newState.filter((index)=>{
        return index.id==this.props.uid;
    });
   console.log(CurrentUser);

    var lat=CurrentUser.lat;
    var long=CurrentUser.long;
    var doubleLat=parseFloat(lat);
    var doubleLong=parseFloat(long);

     /*
     var lat=CurrentUser[0].lat;
     var long=CurrentUser[0].lng;
     var doubleLat=parseFloat(lat);
     var doubleLong=parseFloat(long);
     */
function deg2rad(deg) {
return deg * (Math.PI/180)
}
     console.log("Old array: " , newState);
     let newArray=newState.filter((index)=>{
       return index.uid!=this.props.uid;
   });
   
      console.log("New Array: " , newArray);
    
     return(
    <div>
    <Grid container columns={3}>
    <Grid.Column>
    <Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
    </Grid.Column>
    <Grid.Column>
    <Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
    </Grid.Column>
    <Grid.Column>
    <Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
    </Grid.Column>
  </Grid>
  </div>
     )
 }
}

export default Results;