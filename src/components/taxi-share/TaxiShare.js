import React, { Component } from "react";
import '../../styles/index.css'
import { Container } from 'semantic-ui-react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import { Icon } from 'semantic-ui-react'
import moment from 'moment';
import fire from "../../config/fire";

class TaxiShare extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: moment(),
      myInfo: {}
    }
  }

  componentDidMount() {
    fire.database().ref("/Taxi-Users/").once('value').then((snapshot) => {
      console.log("i am snapshot", snapshot.val());
    })
  }

  // componentDidUpdate() {
  //   fire.database().ref("/Taxi-Users/"+this.props.appUser.id).once('value').then((snapshot)=>{
  //        this.setState({
  //          myInfo: snapshot.val()
  //        })
  //     })
  // }

  findUsersByDate(date) {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var dayOfWeek = days[date._d.getDay()];
    console.log(dayOfWeek);

    // fire.database.ref("/Taxi-Users/").orderByChild(dayOfWeek).equalTo(this.state.myInfo[dayOfWeek]).once('value').then((snapshot)=>{
    //   console.log(snapshot.val());
    // })
  }

  handleDateChange(date) {
    this.findUsersByDate(date);
    console.log("I am date", date._d.getDay());
    this.setState({
      date: date
    });
  }

  render() {
    return (
      <div>
        <Container>
          <h1> Hey i am taxiShare</h1>
          <SingleDatePicker
            // showClearDate={true}
            customInputIcon={
              <Icon name="calendar alternate outline" size='big' />
            }
            inputIconPosition="after"
            small={true}
            block={false}
            numberOfMonths={1}
            date={this.state.date}
            onDateChange={date => this.handleDateChange(date)}
            focused={this.state.focused}
            onFocusChange={({ focused }) =>
              this.setState({ focused })
            }
            openDirection="down"
            hideKeyboardShortcutsPanel={true}
          />

        </Container>
      </div>
    )
  }
}

export default TaxiShare;