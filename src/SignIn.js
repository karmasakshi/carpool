import React, { Component} from 'react'
import "./index.css"
import fire from './config/fire'
import {BrowserRouter,Switch,Route}from 'react-router-dom' 
import Home from './Home'




class SignIn extends Component {
    state = {
        user:{
          
          email:'',
          
          password:'',
          loggedIn:null,
          
        }
    }
    componentDidMount() {

        fire.auth().onAuthStateChanged((user) => {
            if (user) {
              this.setState({ loggedIn: true })
            } else {
              this.setState({ loggedIn: false })
            }
          })
    } 

   onFormSubmit = (user) => {

    user.preventDefault();
   
    
    fire.auth().signInWithEmailAndPassword(this.state.user.email, this.state.user.password).catch(function(error) {
            
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            
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
    if (this.state.loggedIn==true) {
        return (
         <Home/>
        )
      } else { 
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
            <input type="password" name='password' id="password" value={user.password} onChange={this.handleChange}/>
            </div>
            <div>
                <button onClick={this.onFormSubmit}>Login</button>
            </div>

            </form>

            </div>


    );
        }

}
renderComponent() {
    if (this.state.loggedIn) {
      return (
       <Home/>
      )
    } else {
      return (
        <p>not working</p>
      );
    }
  }

}
export default SignIn;