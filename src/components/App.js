import React, { Component } from 'react';
import './App.css';
import CurrentUser from '../containers/CurrentUser'
import SaveAndDownloadButton from '../containers/SaveAndDownloadButton'
import LoginSignupForm from '../containers/LoginSignupForm'


class App extends Component {
  render() {
    return (
      <div className = "App">
        <div className = "row header-row">
        </div>
        <div className = "row body-row">
        <LoginSignupForm />
        </div>
      </div>
    )
  }
}

export default App;
