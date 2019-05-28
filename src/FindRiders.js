import React from 'react'
import { Link} from 'react-router-dom'
import LinksSignOut from './LinksSignOut'

const FindRiders=()=>{
return (
<nav className="nav-wrapper grey darken-3 " >
    
    <div className="container">
    <Link to ='/' className="brand-logo">Carpool</Link>
    <LinksSignOut/>
    </div>
</nav>


)


}
export default FindRiders;