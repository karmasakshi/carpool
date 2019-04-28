import React, {Component} from 'react';
import {Segment, Grid, Image, Form, Radio} from 'semantic-ui-react';
import fire from './config/fire';
import firebase from 'firebase';
import {BrowserRouter,Switch,Route} from 'react-router-dom' 
import Home from './Home';
import ReactDOM from 'react-dom' 

class CreateProfile extends Component{
  state = {
    user:{
      firstName: '',
      lastName: '',
      email: '',
      role: null, 
      from: '',
      users:[]
    } 
   
  }

  onFormSubmit = (user) => {
    user.preventDefault();  //we need to prevent the default behavior of the form, which if we don't will cause the page to refresh when you hit the submit button
    const usersRef = fire.database().ref('users');//we need to carve out a space in our Firebase database where we'd like to store all of the items that people are bringing to the potluck. We do this by calling the ref method and passing in the destination we'd like them to be stored (items).

    const newUser = {                      //here we grab the item the user typed in (as well as their username) from the state, and package it into an object so we ship it off to our Firebase database.
      firstName: this.state.user.firstName,
      lastName: this.state.user.lastName, 
      email: this.state.user.email,
      role: this.state.user.role,
      from: this.state.user.from
    }
    usersRef.push(newUser);       //similar to the Array.push method, this sends a copy of our object so that it can be stored in Firebase.
    this.setState({ firstName: '', lastName: '', email: '', role: '', from: '' }); //to empty the object after use, so that an additional object can be added

    console.log(this.state.user);
  }

  onInputChange = (user) => {
    user.preventDefault();
    const newUser = this.state.user;
    // newUser[user.target.name] = user.target.value;
     newUser[user.target.name] = user.target.type === 'radio' ? user.target.checked : user.target.value;
     this.setState({
        newUser: user
     })
  }


  render(){
    const {user} = this.state;
 return(
<div>

  <Grid>
   <Grid.Column width={6}>
     <h1> Create Profile </h1>
     <Image src='https://source.unsplash.com/random' size='medium' centered bordered/>
   </Grid.Column>
   <Grid.Column width={8}> 
   <br />
   <br />
       <Segment>
       <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid name='firstName' onChange={this.onInputChange} value={user.firstName} label='First name' placeholder='First name' />
          <Form.Input fluid name='lastName' onChange={this.onInputChange} value={user.lastName} label='Last name' placeholder='Last name' />
          </Form.Group>
          
          <Form.Field>
          <Form.Input name='email' onChange={this.onInputChange} value={user.email} label='Email' placeholder='joe@schmoe.com' />
          </Form.Field>

          <Form.Group inline>
          <label>User Role</label>
          <Form.Radio
            label='Host'
            value= 'host' 
            name='role'
            type='radio'
            checked= {this.state.role}       //{user.role === 'host'}
            onChange={this.onInputChange}
          />
          <Form.Radio
            label='Guest'
            value='guest'
            name='role'
            type='radio'
            checked= {this.state.role}     // {user.role === 'guest'}
            onChange={this.onInputChange}
          />
          </Form.Group>

          <Form.TextArea name='from' onChange={this.onInputChange} value={user.from} label='From' placeholder='Tell us from where would you leave...' />
        
        <Form.Button onClick={this.onFormSubmit}>Submit</Form.Button>
        </Form>
        </Segment>
       
   </Grid.Column>
  </Grid>
  </div>
 )
}
}

export default CreateProfile; 
