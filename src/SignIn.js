import React, {Component} from 'react';
import Home from './Home';
import fire from './config/fire'; 
import firebase from 'firebase';
import Navbar from './Navigation';
import {Redirect} from 'react-router';

class SignIn extends Component{

  constructor(props){
    super();

    this.state = {
      user:{
        email:'',
        password:'',
        loggedIn: null
      }
  }
  }



   onFormSubmit = (user) => {
    user.preventDefault();

    fire.auth().signInWithEmailAndPassword(this.state.user.email, this.state.user.password).catch(function(error) {     
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
          }); 
      }
      
    handleChange=(user)=>{
      
        const newUser=this.state.user;
        newUser[user.target.name] =  user.target.value;

        this.setState({
            newUser: user
         })
         
        console.log(this.state.user);
    }

render=()=>{
  
    const {user} = this.state;
    var test  =  localStorage.getItem('Logged');
    if (test===true) {    
        return (<Home />
              )      }
       else { 
          
        return (
            <div className="container">
            <form className="white">
            <h5>Sign In</h5>
            <div >
            <label htmlFor="email">email</label>
            <input type="email" name='email' id="email" value={user.email} onChange={this.handleChange}/>
            </div>
            <div className="input">
            <label htmlFor="password">password</label>
            <input type="password" name='password' id="password" value={user.passwordd} onChange={this.handleChange}/>
            </div>
            
    render(){
      const {user} = this.state;
      
      if (this.props.log) {   
        return(
           <Redirect to={"/users"}  /> 
        )
      }
         else {   
          return (
              <div className="container">
              <form className="white">
              <h5>Sign In</h5>
              <div >
              <label htmlFor="email">email</label>
              <input type="email" name='email' id="email" value={user.email} onChange={this.handleChange}/>
              </div>
              <div className="input">
              <label htmlFor="password">password</label>
              <input type="password" name='password' id="password" value={user.passwordd} onChange={this.handleChange}/>
              </div>
            <div>
              <button onClick={this.onFormSubmit}>Login</button>
          </div>
            
            </form>
            </div>
    );
        }




      }


export default SignIn;


