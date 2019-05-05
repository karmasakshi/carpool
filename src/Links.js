import React from 'react'
import {NavLink} from 'react-router-dom'
import SignIn from './SignIn';
import Header from './Header';
import fire from './config/fire'
var test=localStorage.getItem('Logged');


const Links=()=>{
    fire.auth().onAuthStateChanged(function(user) {
        if (user) {
console.log("Sign In")        } 
else {
          // No user is signed in.
        }
      });



    function signout(){
        localStorage.setItem('Logged',false);
        test=localStorage.getItem('Logged');
        console.log(test);
        fire.auth().signOut().then(function() {
        console.log("Logout Sucessfull");
        }).catch(function(error) {
            console.log(error);
          });

        }
    
    
    
    



    return(
        
    <ul className="right">
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/about'>About</NavLink></li>
    <li><NavLink to='/signup'>Sign Up</NavLink></li>
    
    {test==='true' ?
    <li><NavLink to='/' onClick={signout}>Sign out</NavLink></li>
    :
    <li><NavLink to='/signin'>Sign in</NavLink></li> 
    }



</ul>
)
}

export default Links;
