import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SaveAndDownloadButton from '../containers/SaveAndDownloadButton'
import LoginSignupForm from '../containers/LoginSignupForm'
import MainDisplay from '../containers/MainDisplay'
import { BrowserRouter, Route, Switch, Link, withRouter } from 'react-router-dom'
import { getUserTemplates, updateCurrentUser } from '../actions'

class App extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    if (!this.props.currentUser.id) this.props.updateUser()
  }

  render() {
    return (
      <div>
        <style>
          {`
            html > body {background-color: #2185d0}
          `}
        </style>
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
    )
  }
}

function mapStateToProps(state) {
  return { userTemplates: state.userTemplates, currentUser: state.currentUser }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateUser: updateCurrentUser, getTemplates: getUserTemplates }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))