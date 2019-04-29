import React, { Component} from 'react'
import "./index.css"
import fire, {auth} from './config/fire'
import {BrowserRouter,Switch,Route}from 'react-router-dom' 
import Home from './Home'
import CreateProfile from './CreateProfile';
import SignIn from './SignIn';
import ReactDOM from 'react-dom';


class CreateAccount extends Component {
    state = {
        user:{
          
          email:'',
          
          password:'',
          loggedIn:false
          
        }
    }
    

   onFormSubmit = (user) => {

    user.preventDefault();
   
    
    fire.auth().createUserWithEmailAndPassword(this.state.user.email, this.state.user.password).catch(function(error) {
        // Handle Errors here.
        //var errorCode = error.code;
        //var errorMessage = error.message;
        // ...
      });
   
          console.log(this.state.loggedIn);

      }
      

    handleChange=(user)=>{
        
        const newUser=this.state.user;
        newUser[user.target.name] =  user.target.value;

        this.setState({
            newUser: user
         })
         
        console.log(this.state.user);
    }

render(){
    const {user} = this.state;
   
        return (         
            <div className="container">
            <form className="white">
            <h5>Sign Up</h5>
            <div >
            <label htmlFor="email">email</label>
            <input type="email" name='email' id="email" value={user.email} onChange={this.handleChange}/>
            </div>
            <div className="input">
            <label htmlFor="password">password</label>
            <input type="password" name='password' id="password" value={user.password} onChange={this.handleChange}/>
            </div>
            <div>
            <button onClick={this.onFormSubmit}>Create Account</button>    
            </div>

            </form>
              
            </div>
    );
        }

}




export default CreateAccount;