import React, {Component} from 'react';
import fire from './config/fire'; 
import {Redirect} from 'react-router';

class SignIn extends Component{

  constructor(props){
    console.log(0);

    super();

    this.state = {
      user:{
        email:'',
        password:'',
      }, errors: ''
  }
  }

   onFormSubmit = (user) => {
    user.preventDefault();

    fire.auth().signInWithEmailAndPassword(this.state.user.email, this.state.user.password).catch((error)=> {     
            var errorCode = error.code;
            var errorMessage = error.message;

            var errors = '';
           
            errors = errorMessage;
            
            this.setState({errors: errors});
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
      console.log(1);
      if (this.props.log) {   
        return(
           <Redirect to={"/users"}  /> 
        )
      }
         else {   
          return (
              <div className="container">
              <form className="white">
              <h3>Sign In</h3>
              <div>
              {this.state.errors!== ''?<p id='error'>Error: {this.state.errors}</p>:''}
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


