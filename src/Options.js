import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Grid, Icon, Container } from 'semantic-ui-react'
import fire from './config/fire';

class Options extends Component {

    constructor(props) {
        super(props);

        this.state={
            currentWeek: null,
            databaseWeek: null
        }
    }

    componentDidMount() {
        let currentWeek = this.calculateWeek();
        var databaseWeek;

        fire.database().ref('/Taxi-Users/'+ this.props.appUser.id + "/week").once('value').then((snapshot)=>{
           databaseWeek = snapshot.val();    

           this.setState({
            currentWeek: currentWeek,
            databaseWeek: databaseWeek
           })
        }).catch((error)=>{
            console.log(error)
        })
    }

    calculateWeek=()=>{
        var today = new Date();
        var dd, ddEnd;
        var mm = String(today.getMonth() + 1); //January is 0!
        var yyyy = today.getFullYear();
        var dayOfTheWeek = today.getDay();
        var week;
    
        if (dayOfTheWeek <= 4) {
          dd = String(today.getDate() - dayOfTheWeek);
          ddEnd = String(today.getDate() - dayOfTheWeek + 4);
        }
        else {
          dd = String(today.getDate() - dayOfTheWeek + 7);
          ddEnd = String(today.getDate() - dayOfTheWeek + 12);    //will not work when it approaches month end -- sort it out 
        }
    
        week = dd + "/" + mm + "/" + yyyy + " to " + ddEnd + "/" + mm + "/" + yyyy; 
    
        return week;
      }

    render() {
        console.log(this.state.currentWeek);
        console.log(this.state.databaseWeek);

        return (
            <React.Fragment>
                <Container className="linksContainer">
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Icon name='taxi' size="massive" />
                                {this.state.databaseWeek === this.state.currentWeek? 
                                <a href='/taxi-share'><h2> Taxi Share <Icon name='arrow right' /></h2></a>: 
                                <a href='/taxi-share/plan-my-week'><h2> Taxi Share <Icon name='arrow right' /></h2></a>
                                }
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name='car' size="massive" />
                                {this.props.appUser.role === 'guest' ?
                                    <NavLink to='/guest-dashboard'><h2> Car Share to Office <Icon name='arrow right' /></h2></NavLink> :
                                    <NavLink to='/host-dashboard'><h2> Car Share to Office <Icon name='arrow right' /></h2></NavLink>}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }
}

export default Options;