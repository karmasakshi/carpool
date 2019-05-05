import React, { Component} from 'react'
import "./index.css"
import fire from './config/fire'
import { Redirect } from 'react-router';






class SignIn extends Component {
 
   
   
    state = {
        user:{
          
          email:'',
          
          password:'',
          loggedIn:null,

        }
    }
    
    componentDidMount() {

      const usersRef = fire.database().ref('users');   usersRef.on('value', (snapshot) => {
        let users = snapshot.val();
        let newstate = [];
        for (let user in users) {
          newstate.push({
            email: user.email,
            firstname: users[user].firstname,
            lastname: users[user].lastname,
            lat:users[user].lat,
            lng:users[user].lng,
            role:users[user].role
          });
        }
        this.setState({
          users: newstate
        });
      });
  

        fire.auth().onAuthStateChanged((user) => {
            if (user) {
              this.state.user.loggedIn=true;
              console.log(this.state.user.loggedIn);
              localStorage.setItem('Logged',this.state.user.loggedIn);
              this.setState({ loggedIn:true});

            } else {
              this.setState({ loggedIn: false});
              localStorage.setItem('Logged',this.state.user.loggedIn);
              console.log('user has not signed in');
            }

          })
         
    } 
   onFormSubmit = (user) => {    
    user.preventDefault();
    this.setState({ loggedIn: true});
    var test  =  localStorage.getItem('Logged');
    console.log(test, typeof test);
    

    var email=this.state.user.email;
    var password=this.state.user.password;
    fire.auth().signInWithEmailAndPassword(email, password).then(function(user){
      


    }).catch(function(error) {
            
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

    if (test==="true") { 
      localStorage.setItem('Logged',false);
      return <Redirect to='/' />      
      
      
      }
     
      
          
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
