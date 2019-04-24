import React, {Component} from 'react';
import {Segment, Grid, Image, Form, Radio} from 'semantic-ui-react';
import Header from './Header';

class CreateProfile extends Component{
  state = {
    user:{
      firstName: '',
      lastName: '',
      email: '',
      role: '', 
      from: ''
    }
  }

  onFormSubmit = (user) => {
    user.preventDefault();
    console.log(this.state.user);
  }

  onInputChange = (user) => {
    user.preventDefault();
    var newUser = this.state.user;
    // newUser[user.target.name] = user.target.value;
     newUser[user.target.name] = user.target.type === 'radio' ? user.target.checked : user.target.value;
     this.setState({
        newUser: user
     })
  }

 // handleChange = (e, { user }) => {this.setState({ user })

  render(){
    const {user} = this.state;
 return(
<div>
  <div>
  <Header />
  </div>

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
            checked= {this.state.role}      //{user.role === 'guest'}
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
