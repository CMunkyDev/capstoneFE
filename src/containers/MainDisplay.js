import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container } from 'semantic-ui-react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

const MainPage = ({}) => {
    return (<Container fluid content={'lol'}/>)
}

function mapStateToProps(state) {
    return {  }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)