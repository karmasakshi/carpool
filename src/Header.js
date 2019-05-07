import React, {Component } from "react";
import Home from "./Home"
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import SignIn from "./SignIn"
import CreateAccount from "./CreateAccount"
import Navbar from './Navigation'
import './index.css'
import CreateProfile from './CreateProfile';
import '../node_modules/semantic-ui-css/semantic.min.css';
import fire from './config/fire';
 var lat;
 var long;
 var doubleLat;
 var doubleLong;
 var results=[];
 
/*{
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(doubleLat-parseFloat(newArray.lat));  // deg2rad below
            var dLon = deg2rad(doubleLong-parseFloat(newArray.long)); 
            var a = 
              Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(deg2rad(doubleLat)) * Math.cos(deg2rad(parseFloat(newArray.lat)) * 
              Math.sin(dLon/2) * Math.sin(dLon/2)
              ; 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in km
            return d;  
          }

*/




class Header extends Component{
 
   state = {log: null, users:[]};
 
   
   componentDidMount() {
    fire.auth().onAuthStateChanged((user) => {     //to detect when a user is authenticated
     
      if (user) {
        console.log('user has signed in', JSON.stringify(user));
 
        this.setState({log: true});
        let newState = [];
       
        // application specific token so that you do not have to
        // authenticate with firebase every time a user logs in
        localStorage.setItem('appTokenKey', user.uid);  //user.uid displays the user uid from authentication table
 
        // store the token
        //this.props.history.push("/users")
       
        fire.database().ref().child('users').once('value').then(function(snapshot) {
          console.log(snapshot.val()); 
          let users = snapshot.val();
        
         for (let user in users) {
            newState.push({
              id: user,
              firstName: users[user].firstName,
              lastName: users[user].lastName,
              lat: users[user].lat,
              long: users[user].lng,
              uid:users[user].userUID
            });
          } 
          console.log("NewSTATE:::: ",newState);
          let CurrentUser=newState.filter(function(index){
             return  index.uid==user.uid;
          });
          lat=CurrentUser[0].lat;
          long=CurrentUser[0].long;
          console.log("long ",long);
          doubleLat=parseFloat(lat);
          doubleLong=parseFloat(long);
          console.log("CurrentUser ",CurrentUser);
          function deg2rad(deg) {
            return deg * (Math.PI/180)
          }
         
         
          
         
          
          let newArray=newState.filter(function(index){
            return index.uid!=user.uid;
        });
          for(var i=0;i<newArray.length;i++){
           
            var R = 6371; // km 
            var x1 = parseFloat(newArray[i].lat)-doubleLat;
            var dLat = deg2rad(x1)  
            var x2 = parseFloat(newArray[i].long)-doubleLong;
            var dLon = deg2rad(x2);  
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                            Math.cos(deg2rad(doubleLat)) * Math.cos(deg2rad(newArray[i].lat)) * 
                            Math.sin(dLon/2) * Math.sin(dLon/2);  
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; 
          console.log("a: ",a);
          console.log("C:",c);
          console.log("D", d);
          console.log(results.push(d));
          console.log("Results ",results);
          

        }

           console.log("New Array: " , newArray);
           
           
          });
          
         
        this.setState(prevState => ({
          user: {                                   //using spread operator to setState
              ...prevState.user,
              loggedIn: true,
              users: newState
          }
      }))
     } else {
       this.setState({log:false});
     }
 
});
  }

  

  
 
  render (){
    

 

    
    return(
      

      <BrowserRouter>
      <div className="Header">
       <Navbar {...this.state}/>
       <Switch>
       <Route exact path='/'component={Home}/>
       <Route exact path='/signin' render={() => <SignIn {...this.state}/>} /> 
       <Route exact path='/signup' component={CreateAccount}/>
       <Route exact path='/users' component={CreateProfile}/>
       <Route render={() => <h1>Page not found</h1>} />
       </Switch>
      </div>
      </BrowserRouter> 
    );
}
 
}



export default Header;
 
//So to recap, if you need to pass a prop to a component being rendered by React Router, instead of using Routes component prop, use its render prop passing it an inline function then pass along the arguments to the element you’re creating.
//to prevent unnecessary unmounting and remounting of the entire component
  