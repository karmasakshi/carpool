import React, { Component } from 'react';
import fire from './config/fire';
import { Redirect } from 'react-router';
import { Container, Form, Header } from 'semantic-ui-react';

class SignIn extends Component {
  state = {
    user: {
      email: '',
      password: '',
    },
    errors: '',
    isLoading: false
  }


  signInUserWithEmailAndPassword = (event) => {

    if (!this.state.isLoading) {

      this.setState({ isLoading: true });

      fire.auth().signInWithEmailAndPassword(this.state.user.email, this.state.user.password).catch((error) => {

        this.setState({ errors: error.message, isLoading: false });

      });

    }

  }

  updateInputs = (event) => {

    let stateUserCopy = this.state.user;

    stateUserCopy[event.target.name] = event.target.value;

    this.setState({
      user: stateUserCopy
    });

  }

  render() {

    if (this.props.authUser) {

      if (this.props.appUser === null)
        return <Redirect to='/create-profile' />

      else if (this.props.appUser.role === 'guest')
        return <Redirect to='/guest-dashboard' />

      else if (this.props.appUser.role === 'host')
        return <Redirect to='/host-dashboard' />
    }
    else {
      return (
        <Container>

          <Form>
            <Header as='h2'>Sign In</Header>

            {this.state.errors !== '' ? <p id='error'>Error: {this.state.errors}</p> : ''}

            <Form.Field>
              <label htmlFor="email">email</label>
              <input type="email" name='email' id="email" value={this.state.user.email} onChange={this.updateInputs} />
            </Form.Field>

            <Form.Field>
              <label htmlFor="password">password</label>
              <input type="password" name='password' id="password" value={this.state.user.password} onChange={this.updateInputs} />
            </Form.Field>

            <button className={'ui primary button ' + (this.state.isLoading ? 'loading disabled' : '')} onClick={this.signInUserWithEmailAndPassword}>Login</button>

          </Form>

        </Container>
      )
    }
  }
}

export default SignIn;
