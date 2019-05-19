import React from 'react'
import Links from './Links'

const Navbar = (props) => {

    return (
        <nav className="ui inverted menu" >
            <Links {...props} />
        </nav>


    )


}
export default Navbar;