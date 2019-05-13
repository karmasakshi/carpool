import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import fire from './config/fire'

const ProtectedRoute = ({component: Component, ...rest}) =>
{
return(
    <Route {...rest} render={(props)=>{
        var user = fire.auth().currentUser;

        if (user) {
            return <Component {...props}/>
        } else {
      
        return <Redirect to={
            {
                pathname: "/",
                state: {from:props.location}
             }
             } />
     }
    }
} />
);
}

export default ProtectedRoute;