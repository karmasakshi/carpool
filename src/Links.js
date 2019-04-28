import React from 'react'
import {NavLink} from 'react-router-dom'
import SignIn from './SignIn';
import Header from './Header';

const Links=(props)=>{
    return(
<ul className="right">
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/'>About</NavLink></li>
    <li><NavLink to='/signup'>Sign Up</NavLink></li>
    <li><NavLink to='/signin'>Sign In</NavLink></li>
</ul>
)
}

export default Links;
