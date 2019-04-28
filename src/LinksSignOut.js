import React from 'react'
import {NavLink} from 'react-router-dom'



const LinksSignOut=()=>{
return(
<ul className="right">
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/about'>About</NavLink></li>
    <li><NavLink to='/'>Sign Out</NavLink></li>
    




</ul>


)


}
export default LinksSignOut;
