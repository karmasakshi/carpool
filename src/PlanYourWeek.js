import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Dropdown } from 'semantic-ui-react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class PlanYourWeek extends Component {

  render() {
    const countryOptions = [
      { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
      { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
      { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
      { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
      { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
      { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
      { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
      { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
      { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
      { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
      { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
      { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
      { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
      { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
      { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
      { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
      { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
      { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
      { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
      { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
      { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
      { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
      { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
    ]

    return (
      <React.Fragment>
        <h1> Plan My Week</h1>
        <div className="planner">
          <div><h1 className="sunday"> Sunday </h1></div>
          <div><Dropdown
            placeholder='Select Country'
            fluid
            search
            selection
            options={countryOptions}
          /></div>
          <div><h1 className="monday"> Monday </h1></div>
          <div>Location</div>
          <div><h1 className="tuesday"> Tuesday </h1></div>
          <div>Location</div>
          <div><h1 className="wednesday"> Wednesday </h1></div>
          <div>Location</div>
          <div><h1 className="thursday"> Thursday </h1></div>
          <div>Location</div>
        </div>
      </React.Fragment>
    )
  }
}

export default PlanYourWeek;