import React from 'react'
import {Link} from 'react-router-dom'
import Links from './Links'
import {Header} from './Header'

const Navbar=()=>{
   
return (
<nav className="nav-wrapper grey darken-3 " >
    
    <div className="container">
    <Link to ='/' className="brand-logo">Carpool</Link>
    <Links/>
    
    </div>
</nav>


)


}
export default Navbar;