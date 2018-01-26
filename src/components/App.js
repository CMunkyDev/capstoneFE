import React, { Component } from 'react';
import './App.css';
import CurrentUser from '../containers/CurrentUser'
import SaveAndDownloadButton from '../containers/SaveAndDownloadButton'
import LoginSignupForm from '../containers/LoginSignupForm'
import MainDisplay from '../containers/MainDisplay'
import { BrowserRouter, Route, Switch, Link, withRouter } from 'react-router-dom'


class App extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <div className = "App">
        <div className = "row header-row">
        </div>
        <div className = "row body-row">
        <BrowserRouter>
          <Switch>
            <Route path='/login'
              render={(props) => <LoginSignupForm form='login'/>}
            />
            <Route path='/signup'
              render={(props) => <LoginSignupForm form='signup'/>}
            />
            <Route path='/' render={(props) => <MainDisplay />} />
          </Switch>
        </BrowserRouter>
        </div>
      </div>
    )
  }
}

export default withRouter(App);
