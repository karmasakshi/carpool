import React, { Component} from 'react'
import "./index.css"
import fire, {auth} from './config/fire'
import {BrowserRouter,Switch,Route}from 'react-router-dom' 
import Home from './Home'
import HomeHost from './HomeHost'




class CreateAccount extends Component {
    state = {
        user:{
          
          email:'',
          
          password:'',
          loggedIn:false
          
        }
    }
    

   onFormSubmit = (user) => {
    var email=this.state.user.email;
    var password=this.state.user.password;
    user.preventDefault();
   
    
    fire.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
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
    if (this.state.loggedIn===true) {
        return (
         <HomeHost/>
        )
      } else { 
        return (
    
   
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
}




export default CreateAccount;