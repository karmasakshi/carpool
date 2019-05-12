import React, { Component} from 'react'
import "./index.css"
import fire from './config/fire'

class CreateAccount extends Component {
    state = {
        user:{          
          email:'',
          password:'',
          loggedIn:false
        }, 
        errors: ''
    }
    
   onFormSubmit = (user) => {

    user.preventDefault(); 
    fire.auth().createUserWithEmailAndPassword(this.state.user.email, this.state.user.password).catch((error)=> {
        // Handle Errors here.
        //var errorCode = error.code;
        var errorMessage = error.message;
        var errors = '';
        errors = errorMessage;
       
        this.setState({errors: errors});
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
            <h3>Sign Up</h3>
            <div>
            {this.state.errors!== ''?<p id='error'>Error: {this.state.errors}</p>:''}
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