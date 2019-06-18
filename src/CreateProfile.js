import React, { Component } from 'react';
import { Segment, Grid, Image, Form, Icon, Header, Radio, Container } from 'semantic-ui-react';
import fire from './config/fire';
import { Redirect } from 'react-router-dom'

class CreateProfile extends Component {

  state = {
    user: {
      firstName: '',
      lastName: '',
      role: null,
      lat: null,
      lng: null,
    },
    createdProfile: false
  }

  createProfile = (event) => {

    event.preventDefault();

    this.setState({ createdProfile: true });

    fire.database().ref('/users/' + this.props.authUser.uid).set({
      firstName: this.state.user.firstName,
      lastName: this.state.user.lastName,
      role: this.state.user.role,
      lat: this.state.user.lat,
      lng: this.state.user.lng,
      id: this.props.authUser.uid
    })

    this.props.getAppUserAfterRegistration(this.state.user);

  }

  updateInputs = (event) => {

    let stateUserCopy = this.state.user;

    stateUserCopy[event.target.name] = event.target.value;

    this.setState({
      user: stateUserCopy
    });

  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {

        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        var state = this.state;
        state.user.lat = lat;
        state.user.lng = lng;

        this.setState({
          state
        });

      }.bind(this));

    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  render() {
    if (this.state.createdProfile === true && this.state.user.role === 'guest') {
      return <Redirect to='/guest-dashboard' />
    }
    else if (this.state.createdProfile === true && this.state.user.role === 'host') {
      return <Redirect to='/host-dashboard' />
    }
    else {
      return (
        <div>
          <Container>
            <Grid>
              <Grid.Column width={6}>
                <h1> Create Profile </h1>
              </Grid.Column>
              <Grid.Column width={8}>
                <br />
                <br />
                <Segment>
                  <Form>
                    <Form.Group widths='equal'>
                      {this.state.firstNameValid}
                      <Form.Input fluid name='firstName' type="text" onChange={this.updateInputs} value={this.state.user.firstName} label='First name' placeholder='First name' required />
                      {this.state.lastNameValid}
                      <Form.Input fluid name='lastName' type="text" onChange={this.updateInputs} value={this.state.user.lastName} label='Last name' placeholder='Last name' required />
                    </Form.Group>

                    <Form.Group inline>
                      <label>User Role</label>
                      <Form.Radio
                        label='Host'
                        value='host'
                        name='role'
                        type="radio"
                        id="host"
                        checked={this.state.user.role === 'host'}
                        onChange={(e) => {// copy state, modify copy, set state to modified copy
                          var state = this.state; state.user.role = e.target.value; this.setState(state)
                        }}
                      ></Form.Radio>
                      <Form.Radio
                        label='Guest'
                        value='guest'
                        name='role'
                        type="radio"
                        id="guest"
                        checked={this.state.user.role === 'guest'}
                        onChange={(e) => { var state = this.state; state.user.role = e.target.value; this.setState(state) }}
                      ></Form.Radio>
                    </Form.Group>

                    <Form.Button onClick={this.getLocation}>Get My Location</Form.Button>

                    <Form.Button type="submit" disabled={this.state.user.firstName === '' || this.state.user.lastName === '' || this.state.user.lng === null || this.state.user.lat === null || this.state.user.role === null} onClick={this.createProfile} >Submit</Form.Button>
                  </Form>
                </Segment>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      );
    }
  }
}

export default CreateProfile;


/*
import Dropzone from 'react-dropzone'
<br />
              <Icon name='upload' size='huge'/>
              <Header content="Drop Image Here"/>
              <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <section className="container">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                  </section>
                )}
              </Dropzone>
              */