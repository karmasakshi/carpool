import React, { Component } from 'react';



const MyContext = React.createContext();  //first we will make a new context

//then create a provider component
class MyProvider extends Component {
  state = {
    name: 'i am react'
  }
  render() {
    return (
      <MyContext.Provider value={{ state: this.state }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export { MyContext, MyProvider }