import React, {Component} from 'react';
import Home from './Home';
import fire from './config/fire'; 
import firebase from 'firebase';
import Navbar from './Navigation';


class SignIn extends Component{
constructor(){
  super();
  this.state = {
    user:{
      email:'',
      password:'',
      loggedIn: false
    }
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

render(){
    const {user} = this.state;

    if (this.state.user.loggedIn==true) {
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
}

export default SignIn;
