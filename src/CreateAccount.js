import React, { Component } from 'react'
import "./index.css"
import fire from './config/fire'
import { Redirect } from 'react-router';
import { Container, Form, Header } from 'semantic-ui-react';

class CreateAccount extends Component {

  state = {
    user: {
      email: '',
      password: ''
    },
    errors: '',
    isLoading: false,
    isUserAvailable: false
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ isUserAvailable: true });
    }

  }

  createUserWithEmailAndPassword = (user) => {

    user.preventDefault();

    if (!this.state.isLoading) {

      this.setState({ isLoading: true });

      fire.auth().createUserWithEmailAndPassword(this.state.user.email, this.state.user.password).catch((error) => {

        this.setState({ errors: error.message, isLoading: false });
      });

    }

  }

  updateInputs = (event) => {

    let stateUserCopy = this.state.user;

    stateUserCopy[event.target.name] = event.target.value;

    this.setState({
      user: stateUserCopy
    })

  }

  render() {
    if (this.props.authUser) {
      return <Redirect to='/create-profile' />
    }
    else {

      return (
        <Container>
          <Form>
            <br />
            <Header as='h2'>Sign Up</Header>

            {this.state.errors !== '' ? <p id='error'>Error: {this.state.errors}</p> : ''}

            <Form.Field>
              <label htmlFor="email">email</label>
              <input type="email" name='email' id="email" value={this.state.user.email} onChange={this.updateInputs} />
            </Form.Field>

            <Form.Field>
              <label htmlFor="password">password</label>
              <input type="password" name='password' id="password" value={this.state.user.password} onChange={this.updateInputs} />
            </Form.Field>

            <button className={'ui primary button ' + (this.state.isLoading ? 'loading disabled' : '')} onClick={this.createUserWithEmailAndPassword}>Create Account</button>

          </Form>
        </Container>
      );
    }
  }
}

export default CreateAccount;