import React, { Component} from 'react'
import "./index.css"
import fire from './config/fire'
import {BrowserRouter,Switch,Route}from 'react-router-dom' 
import Home from './Home'
import LinksSignOut from './LinksSignOut';
import HomeHost from './HomeHost';
import {NavLink} from 'react-router-dom'
import Header from './Header'





class SignIn extends Component {
constructor(props){
    super(props)    

}

   
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
              console.log('user has signed in');
              this.setState({ loggedIn: true});
            } else {
              this.setState({ loggedIn: false});
              console.log('user has not signed in');
            }
                localStorage.setItem('Logged',this.state.user.loggedIn);

          })
         
    } 
   onFormSubmit = (user) => {
    user.preventDefault();

    var email=this.state.user.email;
    var password=this.state.user.password;
    fire.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            
          });          
    
   
          

      }
      
      signOut =()=>{
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          console.log('you are logged out successfully');
        }).catch(function(error) {
          // An error happened.
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
            
            <div>
              <button onClick={this.onFormSubmit}>Login</button>
          </div>
            
            </form>
            </div>


    );
        }

}


}


export default SignIn;
