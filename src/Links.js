import React from 'react'
import {NavLink} from 'react-router-dom'
import fire from './config/fire'

function signout(){
    console.log("i am signout function");
    fire.auth().signOut().then(function() {
     
        console.log("you are signed out");
       
       // this.props.history.push('/');
      
    }).catch(function(error) {
        // An error happened.
        console.log(error);
      });
    
    }

const Links=(props)=>{

    return(    
    <div className="container">
    <NavLink to ='/' className="brand-logo">Carpool</NavLink>
    <ul className="right menu">
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/about'>About</NavLink></li>
    {(props.log)? 
    <li><NavLink to='/results'>Plan a Journey</NavLink></li>:
    <li><NavLink to='/signup'>Sign Up</NavLink></li>
    }
    {(props.log) ?
    <li><NavLink to='/' onClick={signout}>Sign out</NavLink></li>
    :
    <li><NavLink to={'/signin'}>Sign in </NavLink></li> 
    }
    </ul>
    </div>
    )
   }

export default Links;