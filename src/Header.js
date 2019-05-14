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
import Results from './Results';
import ProtectedRoute from './protectedRoute';

class Header extends Component{
  
   state = {log: null, users:[], uid: localStorage.getItem("appTokenKey"), currentUser:[], results: []};

   componentDidMount() {
    fire.auth().onAuthStateChanged((user) => {     //to detect when a user is authenticated

      if (user) {
        console.log('user has signed in', JSON.stringify(user));

        let newState = [];

        // application specific token so that you do not have to
        // authenticate with firebase every time a user logs in
        localStorage.setItem('appTokenKey', user.uid);  //user.uid displays the user uid from authentication table

        // store the token
        //this.props.history.push("/users")
        
        fire.database().ref().child('users').orderByChild('userUID').once('value').then((snapshot)=> {
          console.log('users', snapshot.val());  
          let users = snapshot.val();
         
          for (let user in users) {
            newState.push({
              id: user,
              firstName: users[user].firstName,
              lastName: users[user].lastName,
              role: users[user].role,
              lat: users[user].lat,
              lng: users[user].lng,
              uid:users[user].userUID
            });
          }

          let usr = newState.filter((index) => {

            return index.uid == user.uid;
      
          });
          console.log("currentUser:", JSON.stringify(usr));

          if(usr.length>0)  //if profile is created by user, this will be executed, else no
          {
            let otherUsers = newState.filter((index) => {

            return ((index.uid !== this.state.uid) && (index.role !== usr[0].role));
            });
 
           var lat=usr[0].lat;
           var long=usr[0].lng;
           var doubleLat=parseFloat(lat);
           var doubleLong=parseFloat(long);

           function deg2rad(deg) {
            return deg * (Math.PI/180)
          }

          let results = [];
            for(var i=0;i<otherUsers.length;i++){
              var R = 6371; // km 
              var x1 = parseFloat(otherUsers[i].lat)-doubleLat;
              console.log("x1",x1);
              var dLat = deg2rad(x1)  
              var x2 = parseFloat(otherUsers[i].lng)-doubleLong;
              var dLon = deg2rad(x2);
              console.log("x2",x2);
  
              var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                              Math.cos(deg2rad(doubleLat)) * Math.cos(deg2rad(otherUsers[i].lat)) * 
                              Math.sin(dLon/2) * Math.sin(dLon/2);  
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
              var d = R * c; 
            console.log("a: ",a);
            console.log("C:",c);
            console.log("D", d);
              
            console.log(results.push({id: otherUsers[i].id, uid: otherUsers[i].userUID, firstName: otherUsers[i].firstName, lastName: otherUsers[i].lastName, distance: d, role: otherUsers[i].role}));
            console.log("Results ",results);
            console.log("Testdd",this.state.results);
          }
    
            this.setState({results: results});
            
          }

          this.setState({
            users: newState, log: true, currentUser: usr
          })
         // console.log(this.state.currentUser[0].id);
          localStorage.setItem('currentUser', JSON.stringify(this.state.currentUser));
          });
     } 
     else {
       this.setState({log:false});
     }

 }); 
  } 

  render (){
    return(
      <BrowserRouter>
      <div className="Header">
       <Navbar log={this.state.log}/>
       <Switch>
       <Route exact path='/'component={Home}/>
       <Route exact path='/signin' render={() => <SignIn log={this.state.log}/>} />
       <Route exact path='/results' render={() => <Results currentUser={this.state.currentUser} results={this.state.results}/>} />
       <Route exact path='/signup' render={() => <CreateAccount log={this.state.log}/>} />
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

// 
//component={Results} currentUser={this.state.currentUser} results={this.state.results}