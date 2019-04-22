import React from 'react'
import {NavLink} from 'react-router-dom'
import SignIn from './SignIn';

const Links=()=>{
return(
<ul className="right">
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/'>About</NavLink></li>
    <li><NavLink to='/'>Sign Up</NavLink></li>
    <li><NavLink to='/'>Sign In</NavLink></li>




</ul>


)


}
export default Links;
