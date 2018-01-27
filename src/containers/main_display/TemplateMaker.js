import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid } from 'semantic-ui-react'
import NotLoggedIn from './template_maker/NotLoggedIn'
import BasicApiData from './template_maker/BasicApiData'


class TemplateMaker extends Component {
    constructor (props) {
        super(props)

        this.emptyTemplate = {
            name: ``,
            resources: [this.emptyResource]
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
            page: 0,
            template: (this.props.TemplateData ? this.props.TemplateData : this.props.currentTemplate ? {} /*grab from database*/ : this.emptyTemplate)
        }

        this.templateFunctions = {
            addResource: this.addResource.bind(this),
            removeResource: this.removeResource.bind(this),
            addRoute: this.addRoute.bind(this),
            removeRoute: this.removeRoute.bind(this)
        }

    }

    getCurrentPage () {
        let pages = [
            { name: 'API Basics', hash: 'basics', component: <BasicApiData template={this.state.template} templateFunctions={this.templateFunctions} /> },
            { name: 'Resources', hash: 'resources', component: <div >PAGE 1</div> },
            { name: 'Routes', hash: 'routes', component: <div>PAGE 2</div> }
        ]

        return pages[this.state.page]
    }

    addResource () {
        this.setState(prev => {
            return {...prev, template: {...prev.template, resources: [...prev.template.resources, this.emptyResource]}}
        })
    }

    removeResource (resourceIndex) {
        this.setState(prev => {
            return {
                ...prev,
                template: { ...prev.template,
                    resources: prev.template.resources.filter((resource, index) => {
                        return resourceIndex !== index
                    })
                }
            }
        })
    }

    //PROBABLY SHOULD DEEP COPY INSTEAD OF THIS
    addRoute (resourceIndex) {
        this.setState(prev => {
            return {
                ...prev,
                template: { ...prev.template,
                    resources: prev.template.resources.map((resource, index) => {
                        if (index === resourceIndex) return {...resource, routes: [...resource.routes, this.emptyRoute]}
                        return resource
                    })
                }
            }
        })
    }

    removeRoute (resourceIndex, routeIndex) {
        this.setState(prev => {
            return {
                ...prev,
                template: {
                    ...prev.template,
                    resources: prev.template.resources.map((resource, index) => {
                        if (index === resourceIndex) {
                            return { ...resource, routes: resource.routes.filter((route, index) => index !== routeIndex) }
                        }
                        return resource
                    })
                }
            }
        })
    }

    render () {
        return (
            <Grid container>
                {this.props.currentUser.id ? this.getCurrentPage().component : <NotLoggedIn />}
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