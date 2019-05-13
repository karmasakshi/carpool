import React, {Component} from 'react';
import {Segment, Grid, Image, Form, Radio} from 'semantic-ui-react';
import fire from './config/fire';
import {Redirect} from 'react-router';

class CreateProfile extends Component{
 constructor(){
   super();
   
   this.state = {
    user:{
      userUID: localStorage.getItem('appTokenKey'),
      firstName: '',
      lastName: '',
      email: '',
      role: null,
      lat: null, 
      lng: null
    },
    disabled: false, 
    allowed: "loading"
  }   
  
 }

 componentDidMount(){
   var uid= localStorage.getItem('appTokenKey');

  fire.database().ref().child('users').orderByChild('userUID').equalTo(uid).once('value').then((snapshot)=>{

    var x = snapshot.val();
    console.log(x);
    try{
    if(Object.keys(x).length>0)
    {
      this.setState({
        allowed: "home"
      });
    }
   }catch(err){
    this.setState({
      allowed: "form"
    })
  }
  });
 }
 
  onFormSubmit = (e) => {
    
    e.preventDefault();  //we need to prevent the default behavior of the form, which if we don't will cause the page to refresh when you hit the submit button
   
    
    const {user} = this.state;

    const usersRef = fire.database().ref(`users`);

    const newUser = {                      //here we grab the item the user typed in (as well as their username) from the state, and package it into an object so we ship it off to our Firebase database.
      userUID: localStorage.getItem('appTokenKey'),
      firstName: user.firstName,
      lastName: user.lastName, 
      email: user.email,
      role: user.role,
      lat: user.lat,
      lng: user.lng
    }

    usersRef.push(newUser);       //similar to the Array.push method, this sends a copy of our object so that it can be stored in Firebase.
    this.setState({ firstName: '', lastName: '', email: '', role: '', lat: 0, lng: 0, disabled: true}); //to empty the object after use, so that an additional object can be added
  
   console.log(this.state.user);
 }

  onInputChange = (user) => {
    console.log(this.state.user);
    user.preventDefault();
    const newUser = this.state.user;
     newUser[user.target.name] = user.target.value; 
     this.setState({
        user: newUser
     })
  }

  getLocation = ()=>{
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position){
         console.log(position);
         var lat = position.coords.latitude;
         var lng = position.coords.longitude;
          console.log(lat);
          console.log(lng);
        
          var state = this.state;
          state.user.lat = lat;  //check whether this is fine?
          state.user.lng = lng;

          this.setState({
           state
          });

        }.bind(this));
        console.log(this.state.user);
    } else {
       alert("Geolocation is not supported by this browser.");
    }
  } 

  render(){
    const {user} = this.state;
      if(this.state.allowed === 'loading'){
        return(
          <h1>Loading...</h1>
        )
      }
      else if(this.state.allowed === "home")
      {
        return(<Redirect to={'/results'} />)
      }
      else if(this.state.allowed === "form"){
      return(
        <div>
          <Grid>
           <Grid.Column width={6}>
             <h1> Create Profile </h1>
             <Image src='' size='medium' centered bordered/>
           </Grid.Column>
           <Grid.Column width={8}> 
           <br />
           <br />
               <Segment>
               <Form>
                <Form.Group widths='equal'>
                  <Form.Input fluid name='firstName' type="text" onChange={this.onInputChange} value={user.firstName} label='First name' placeholder='First name' required/>
                  <Form.Input fluid name='lastName' type="text" onChange={this.onInputChange} value={user.lastName} label='Last name' placeholder='Last name' required/>
                  </Form.Group>
                  
                  <Form.Field>
                  <Form.Input name='email' onChange={this.onInputChange} type="email" value={user.email} label='Email' placeholder='joe@schmoe.com' required/>
                  </Form.Field>
        
                  <Form.Group inline>
                  <label>User Role</label>
                  <Form.Radio
                    label='Host'
                    value= 'host' 
                    name='role'
                    type="radio"
                    id="host"
                    checked= {user.role === 'host'}      
                    onChange={(e) => {// copy state, modify copy, set state to modified copy
                                      var state = this.state; state.user.role = e.target.value; this.setState(state)}}
                  ></Form.Radio>
                  <Form.Radio
                    label='Guest'
                    value='guest'
                    name='role'
                    type="radio"
                    id="guest"
                    checked= {user.role === 'guest'}     
                    onChange={(e) => {var state = this.state; state.user.role = e.target.value; this.setState(state)}}
                  ></Form.Radio>
                  </Form.Group>
        
                  <Form.Button onClick={this.getLocation}>Get My Location</Form.Button>
        
                <Form.Button type="submit" onClick={this.onFormSubmit} >Submit</Form.Button>
                </Form>
                </Segment>
               
           </Grid.Column>
          </Grid>
          </div>
         )
      }
}
}

export default CreateProfile; 
//against form button disabled={this.state.disabled},  if(!this.state.disabled)