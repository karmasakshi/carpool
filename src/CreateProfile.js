import React, { Component } from 'react';
import { Segment, Grid, Form, Container, Icon, Header } from 'semantic-ui-react';
import fire from './config/fire';
import { Redirect } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'

class CreateProfile extends Component {

  state = {
    user: {
      firstName: '',
      lastName: '',
      role: null,
      lat: null,
      lng: null,
      taxiUser: null
    },
    createdProfile: false,
    acceptedPicture: null
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
      taxiUser: this.state.user.taxiUser,
      id: this.props.authUser.uid
    })

    this.props.getAppUserAfterRegistration(this.state.user);

    //var storageRef = fire.storage().ref();
    //var userRef = storageRef.child(this.props.authUser.uid);

    // userRef.put(this.state.acceptedPicture[0]).then(function (snapshot) {
    //   console.log('Uploaded a blob or file!');
    // });
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

  savePictureToState(userPicture) {
    this.setState({ acceptedPicture: userPicture });
  }

  render() {
    const maxSize = 5048576;

    if (this.state.createdProfile === true && this.state.user.role === 'guest') {
      return <Redirect to='/options' />
    }
    else if (this.state.createdProfile === true && this.state.user.role === 'host') {
      return <Redirect to='/options' />
    }
    else {
      return (
        <div>
          <Container>
            <br />
            <Grid>
              <Grid.Column width={6}>
                <h1> Create Profile </h1>
                <br />
                <Dropzone onDrop={acceptedFiles => {
                  this.savePictureToState(acceptedFiles);
                }} multiple={false} accept='image/*' minSize={0}
                  maxSize={maxSize}>
                  {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                    const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                    return (
                      <section className="container">
                        <div {...getRootProps({ className: 'dropzone' })}>
                          <input {...getInputProps()} />
                          {!isDragActive && <div>
                            <Icon name='upload' size='huge' />
                            <Header content="Drop 'n' Drop Image Here, or click to select files" />
                          </div>}
                          {isDragActive && !isDragReject && <p className='dropzone--isActive'>you are good to go</p>}
                          {isDragReject && "File type not accepted, sorry!"}
                          {isFileTooLarge && (
                            <div>
                              File is too large.
                             </div>
                          )}
                        </div>
                      </section>
                    )
                  }
                  }
                </Dropzone>
              </Grid.Column>
              <Grid.Column width={8}>
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

                    <Form.Group inline>
                      <label>Do you use taxi for office purposes</label>
                      <Form.Radio
                        label='Yes'
                        value='Yes'
                        name='taxiUser'
                        type="radio"
                        id="taxiUser"
                        checked={this.state.user.taxiUser === 'Yes'}
                        onChange={(e) => {// copy state, modify copy, set state to modified copy
                          var state = this.state; state.user.taxiUser = e.target.value; this.setState(state)
                        }}
                      ></Form.Radio>
                      <Form.Radio
                        label='No'
                        value='No'
                        name='taxiUser'
                        type="radio"
                        id="notTaxiUser"
                        checked={this.state.user.taxiUser === 'No'}
                        onChange={(e) => { var state = this.state; state.user.taxiUser = e.target.value; this.setState(state) }}
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