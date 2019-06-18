import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import fire from './config/fire'

class Navbar extends Component {

    signOut() {

        fire.auth().signOut();

    }

    render() {

        var guestSignedInMenu = (
            <ul className="right menu">
                <li><NavLink to='/guest-dashboard'>Dashboard</NavLink></li>
                <li><NavLink to='/guest-dashboard/notifications'>Notifications</NavLink></li>
                <li><NavLink to='/' onClick={this.signOut}>Sign out</NavLink></li>
            </ul>
        );

        var hostSignedInMenu = (
            <ul className="right menu">
                <li><NavLink to='/host-dashboard'>Dashboard</NavLink></li>
                <li><NavLink to='/' onClick={this.signOut}>Sign out</NavLink></li>
            </ul>
        )

        var signedOutMenu = (
            <ul className="right menu">
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/sign-up'>Sign Up</NavLink></li>
                <li><NavLink to='/sign-in'>Sign in</NavLink></li>
            </ul>
        );

        var menu = this.props.authUser ? ((this.props.appUser!==null && this.props.appUser.role==='guest')?guestSignedInMenu:hostSignedInMenu) : signedOutMenu;

        return (
            <nav className="ui inverted menu" >
                <div className="container">

                    <NavLink to='/' className="brand-logo">Carpool</NavLink>

                    {menu}

                </div>
            </nav>
        )

    }

}

export default Navbar;