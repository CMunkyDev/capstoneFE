import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid, Menu, Button } from 'semantic-ui-react'
import BasicApiData from './template_maker/BasicApiData'
import Routes from './template_maker/Routes'
import Finish from './template_maker/Finish'
import MediaQuery from 'react-responsive'


class TemplateMaker extends Component {
    constructor (props) {
        super(props)

        this.editId = this.props.match.params.id || null

        let routes = [
            {
                name: 'show',
                method: 'GET'
            },
            {
                name: 'index',
                method: 'GET'
            },
            {
                name: 'create',
                method: 'POST'
            },
            {
                name: 'update',
                method: 'PATCH'
            },
            {
                name: 'delete',
                method: 'DELETE'
            }
        ]

        this.emptyTemplate = {
            public: true,
            md_description: '',
            template_object : {
            name: ``,
            resources: []
            }
        }
        this.emptyResource = {
            name: ``,
            routes
        }
        this.emptyRoute = {
            name: '',
            method: ''
        }

        this.state = {
            page: 0,
            pages: 3,
            template: this.emptyTemplate
        }

        this.templateFunctions = {
            addResource: this.addResource.bind(this),
            removeResource: this.removeResource.bind(this),
            addRoute: this.addRoute.bind(this),
            removeRoute: this.removeRoute.bind(this),
            nextPage: this.nextPage.bind(this),
            prevPage: this.prevPage.bind(this),
            currentPageNum: this.currentPageNum.bind(this),
            maxPageNum: this.maxPageNum.bind(this),
            alterResourceData: this.alterResourceData.bind(this),
            alterRouteData: this.alterRouteData.bind(this),
            alterApiName: this.alterApiName.bind(this)
        }

    }

    componentDidMount = async () => {
        if (this.editId) {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/templates/${this.editId}`)
            const json = await res.json()

            this.setState(prev => ({ ...prev, template: json.templates }))
        }
    }

    nextPage = () => {
        if (this.state.page < this.state.pages - 1) {
            this.setState(prev => {
                return {...prev, page: prev.page + 1}
            })
        } 
    }

    prevPage = () => {
        if (this.state.page > 0) {
            this.setState(prev => {
                return {...prev, page:prev.page - 1}
            })
        }
    }

    currentPageNum = () => {
        return this.state.page
    }

    maxPageNum = () => {
        return this.state.pages - 1
    }

    getCurrentPage () {
        let pages = [
            { name: 'API Basics', hash: 'basics', component: <BasicApiData template={this.state.template} templateFunctions={this.templateFunctions} /> },
            { name: 'Routes', hash: 'routes', component: <Routes template={this.state.template} templateFunctions={this.templateFunctions} /> },
            { name: 'Extra', hash: 'routes', component: <Finish template={this.state.template} templateFunctions={this.templateFunctions} /> }
        ]

        return pages[this.state.page]
    }

    alterResourceData (resourceIndex, updatedResourceData) {
        this.setState(prev => {
            return {
                ...prev,
                template: {
                    ...prev.template,
                    template_object: {
                        ...prev.template.template_object,
                        resources: prev.template.template_object.resources.map((resource, index) => {
                            if (index === resourceIndex) return Object.assign({}, resource, updatedResourceData)
                            return resource
                        })
                    }
                }
            }
        })
    }

    addResource (resourceObj = this.emptyResource) {
        let newResource = Object.assign({}, this.emptyResource, resourceObj)
        this.setState(prev => {
            return { ...prev, template: { ...prev.template, template_object: { ...prev.template.template_object, resources: [...prev.template.template_object.resources, { ...this.emptyResource }] } }} 
        })
    }

    removeResource (resourceIndex) {
        this.setState(prev => {
            return {
                ...prev,
                template: {
                    ...prev.template,
                    template_object: {
                        ...prev.template.template_object,
                        resources: prev.template.template_object.resources.filter((resource, index) => {
                            return resourceIndex !== index
                        })
                    }
                }
            }
        })
    }

    alterRouteData (resourceIndex, routeIndex, updatedRouteData) {
        this.setState(prev => {
            return {
                ...prev,
                template: {
                    ...prev.template,
                    template_object: {
                        ...prev.template.template_object,
                        resources: prev.template.template_object.resources.map((resource, index) => {
                            if (index === resourceIndex) {
                                return {
                                    ...resource, routes: resource.routes.map((route, index) => {
                                        if (index === routeIndex) return Object.assign({}, route, updatedRouteData)
                                        return route
                                    })
                                }
                            }
                            return resource
                        })
                    }
                }
            }
        })
    }
    //PROBABLY SHOULD DEEP COPY INSTEAD OF THIS
    addRoute (resourceIndex, routeObj = this.emptyRoute) {
        let newRoute = Object.assign({}, this.emptyRoute, routeObj)
        this.setState(prev => {
            return {
                ...prev,
                template: {
                    ...prev.template,
                    template_object: {
                        ...prev.template.template_object,
                        resources: prev.template.template_object.resources.map((resource, index) => {
                            if (index === resourceIndex) return { ...resource, routes: [...resource.routes, newRoute] }
                            return resource
                        })
                    }
                }
            }
        })
    }

    removeRoute (resourceIndex, routeName) {
        this.setState(prev => {
            return {
                ...prev,
                template: {
                    ...prev.template,
                    template_object: {
                        ...prev.template.template_object,
                        resources: prev.template.template_object.resources.map((resource, index) => {
                            if (index === resourceIndex) {
                                return { ...resource, routes: resource.routes.filter(route => route.name !== routeName) }
                            }
                            return resource
                        })
                    }
                }
            }
        })
    }

    alterApiName (newName) {
        this.setState(prev => {
            return { ...prev, template: { ...prev.template, template_object: { ...prev.template.template_object, name: newName } } }
        })
    }

    render () {
        let firstPageCondition = this.state.page === 0
        let lastPageCondition = this.state.page === this.state.pages - 1
        return (
            <div>
            <MediaQuery minWidth={992}>
                <Grid>
                    {this.getCurrentPage().component}
                </Grid>
                <Menu style={{ position: 'absolute', bottom: '-80px', zIndex: '5' }} secondary widths={3} size='large'>
                    <Container fluid>
                        <Menu.Item position='left'>
                            <Button fluid color='yellow' disabled={firstPageCondition} onClick={this.prevPage}>Previous</Button>
                        </Menu.Item>
                        <Menu.Item position='right'>
                            <Button fluid color='yellow' disabled={lastPageCondition} onClick={this.nextPage}>Next</Button>
                        </Menu.Item>
                    </Container>
                </Menu>
            </MediaQuery>
            <MediaQuery maxWidth={991}>
            <Grid>
                {this.getCurrentPage().component}
            </Grid>
            <Menu style={{ position: 'absolute', bottom: '-80px', zIndex: '5' }} secondary widths={3} size='large'>
                <Container fluid style={{paddingLeft: '28px', paddingRight: '42px'}}>
                    <Menu.Item position='left'>
                        <Button fluid color='yellow' disabled={firstPageCondition} onClick={this.prevPage}>Previous</Button>
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Button fluid color='yellow' disabled={lastPageCondition} onClick={this.nextPage}>Next</Button>
                    </Menu.Item>
                </Container>
            </Menu>
            </MediaQuery>
            </div>
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