import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid } from 'semantic-ui-react'
import NotLoggedIn from './template_maker/NotLoggedIn'


class TemplateMaker extends Component {
    constructor (props) {
        super(props)
        this.emptyTemplate = {
            name: ``,
            resources: []
        }
        this.emptyResource = {
            name: ``,
            routes: []
        }
        this.emptyRoute = {
            name: '',
            method: ''
        }

        this.state = {
            page: (this.props.currentUser.id ? 1 : 0),
            template: (this.props.TemplateData ? this.props.TemplateData : this.props.currentTemplate ? {} /*grab from database*/ : this.emptyTemplate)
        }

        this.pageOrder = [
            {name: 'Signup or Login', hash: 'nologin', component: <NotLoggedIn />},
            {name: 'API Basics', hash: 'basics', component: <div/>},
            {name: 'Resources', hash: 'resources', component: <div/>},
            {name: 'Routes', hash: 'routes', component: <div/>}
        ]


    }


    render () {
        return (
            <Grid container>
                {this.pageOrder[this.state.page].component}
            </Grid>
        )
    }
}
function mapStateToProps(state) {
    return { currentUser: state.currentUser}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateMaker)