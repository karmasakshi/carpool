import React from 'react'
import {NavLink} from 'react-router-dom'



const Links=()=>{
return(
<ul className="right">
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/about'>About</NavLink></li>
    <li><NavLink to='/signup'>Sign Up</NavLink></li>
    <li><NavLink to='/signin'>Sign In</NavLink></li>




</ul>


)


}
export default Links;
