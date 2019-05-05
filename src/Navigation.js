import React from 'react'
import Links from './Links'

const Navbar=(props)=>{

return (
<nav className="nav-wrapper grey darken-3 " >
<Links {...props}/>   
</nav>


)


}
export default Navbar;