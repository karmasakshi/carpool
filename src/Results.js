import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Grid, Image, Card, Icon } from 'semantic-ui-react'

class Results extends Component {

  constructor(props) {

    console.log(0);

    super(props);

    this.state = { currentUser: undefined, users: [] };

  }

  setUser() {

    let usr = this.props.users.filter((index) => {

      return index.uid === this.props.uid;

    });

    this.setState({ currentUser: usr });
    console.log(this.state.currentUser);

  }

  setOtherUsers() {

    let otherUsers = this.props.users.filter((index) => {

      return ((index.uid !== this.props.uid) && (index.role !== this.state.currentUser.role));

    });

    this.setState({ users: otherUsers });

  }

  componentDidMount() {

    this.componentDidUpdate();

  }


  componentDidUpdate() {

    if (this.state.currentUser === undefined) {

      this.setUser();

    }

    if (this.state.users.length === 0 && this.state.currentUser !== undefined && this.props.users.length > 0) {

      this.setOtherUsers();
      console.log(this.state.currentUser);
    } else {

      this.calcDistance();
    }

  }

  calcDistance() {

   /* var results = [];
    var distance=[];
    var R = 6371;      // km 
    var lat=this.state.currentUser[0].lat;
    var long=this.state.currentUser[0].lng;
    var doubleLat=parseFloat(lat);
    var doubleLong=parseFloat(long);
  
    function deg2rad(deg) {
      return deg * (Math.PI/180)
      }
  
    for(var i=0;i<this.state.users.length;i++){
    var x1 = parseFloat(this.state.users[i].lat)-doubleLat;
    var dLat = deg2rad(x1)  
    var x2 = parseFloat(this.state.users[i].long)-doubleLong;
    var dLon = deg2rad(x2);  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.cos(deg2rad(doubleLat)) * Math.cos(deg2rad(this.state.users[i].lat)) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 
    console.log("a: ",a);
    console.log("C:",c);
    console.log("D", d);
    if(d<200){
      results.push(this.state.users[i]);
      distance.push(this.state.users[i]);
      
    }
    }
    console.log("Results ",results);
*/
  }

  render() {
   
    /*var results=[];   
    //function
        var R = 6371;      // km 
    
      var lat=this.state.currentUser[0].lat;
      var long=this.state.currentUser[0].lng;
      var doubleLat=parseFloat(lat);
      var doubleLong=parseFloat(long);
    
      function deg2rad(deg) {
        return deg * (Math.PI/180)
        }
    
      for(var i=0;i<this.state.users.length;i++){
      var x1 = parseFloat(this.state.users[i].lat)-doubleLat;
      var dLat = deg2rad(x1)  
      var x2 = parseFloat(this.state.users[i].long)-doubleLong;
      var dLon = deg2rad(x2);  
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                      Math.cos(deg2rad(doubleLat)) * Math.cos(deg2rad(this.state.users[i].lat)) * 
                      Math.sin(dLon/2) * Math.sin(dLon/2);  
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; 
      console.log("a: ",a);
      console.log("C:",c);
      console.log("D", d);
      console.log(results.push(d));
      }
      console.log("Results ",results);
    */
    return (
      <div>
        <Grid container columns={3}>
          {this.state.users.map((user, index) => (
            <Grid.Column key={index}>
              <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{user.firstName} {user.lastName}</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      </div>

    )
  }
}

export default Results;