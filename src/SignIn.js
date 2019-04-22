import React, {Component} from 'react';


class SignIn extends Component {
    state={


    }

render(){
    return(
            <div className="container">
            <form  classname="white">
            <h5>Sign In</h5>
            <div classname="input">
            <label htmlFor="email">email</label>
            <input type="email" id="email" />
            </div>
            <div classname="input">
            <label htmlFor="password">password</label>
            <input type="password" id="password" />
            </div>
            <div>
                <button className>Login</button>
            </div>

            </form>

            </div>


    );

}

}
export default SignIn;