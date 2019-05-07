import React, {Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Grid, Image, Card, Icon } from 'semantic-ui-react'

class Results extends Component{
 state={currentUser: undefined, users: this.props.users};

 componentDidMount(){
    
    let usr=this.props.users.filter((index)=>{
        return index.uid==this.props.uid;
    });

    let otherUsers=this.props.users.filter((index)=>{
        return index.uid!=this.props.uid;
    });

    this.setState({currentUser: usr, users: otherUsers});
 }

 render(){

   console.log(this.state.currentUser);
   console.log(this.state.users);
   

     /*
     var lat=CurrentUser[0].lat;
     var long=CurrentUser[0].lng;
     var doubleLat=parseFloat(lat);
     var doubleLong=parseFloat(long);
     */
     function deg2rad(deg) {
     return deg * (Math.PI/180)
     }

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