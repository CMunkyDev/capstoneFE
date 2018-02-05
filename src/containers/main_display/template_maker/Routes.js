import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid, Form, Header, Segment, Button, Icon } from 'semantic-ui-react'

const BasicApiData = (props) => {
    function findRoute (name) {
        return function (route) {
            return route.name === name
        }
    }

    function toggleRoute (resourceIndex, routeName) {
        let routes = {
            show: {
                name: 'show',
                method: 'GET'
            },
            index: {
                name: 'index',
                method: 'GET'
            },
            create: {
                name: 'create',
                method: 'POST'
            },
            update: {
                name: 'update',
                method: 'PATCH'
            },
            delete: {
                name: 'delete',
                method: 'DELETE'
            }
        }
        if (props.template.template_object.resources[resourceIndex].routes.find(findRoute(routeName))) {
            props.templateFunctions.removeRoute(resourceIndex, routeName)
        } else {
            props.templateFunctions.addRoute(resourceIndex, routes[routeName])
        }
    }

    return (
                <Grid container fluid>
                    <Grid.Column width={12} style={{ padding: '0px'}}>
                <Segment style={!props.template.template_object.resources.length ? { minHeight: '324px', color: '#000', display: 'flex', justifyContent: 'space-around', alignContent: 'center' } : { minHeight: '324px' }}>
                            {!props.template.template_object.resources.length ? <Header textAlign='center'>Add Resources to See Route Possibilities</Header>: props.template.template_object.resources.map((resource, resourceIndex) => {
                                return (
                                    <div key={resourceIndex}>
                                        <Segment attached='top' clearing>
                                            <Header>
                                                {`${props.template.template_object.resources[resourceIndex].name} Routes`}
                                            </Header>
                                        </Segment>
                                        <Button.Group attached='bottom' fluid>
                                            <Button toggle onClick={() => toggleRoute(resourceIndex, 'show')} active={!!props.template.template_object.resources[resourceIndex].routes.find(findRoute('show'))}>Get One</Button>
                                            <Button toggle onClick={() => toggleRoute(resourceIndex, 'index')} active={!!props.template.template_object.resources[resourceIndex].routes.find(findRoute('index'))}>Get All</Button>
                                            <Button toggle onClick={() => toggleRoute(resourceIndex, 'create')} active={!!props.template.template_object.resources[resourceIndex].routes.find(findRoute('create'))}>Create</Button>
                                            <Button toggle onClick={() => toggleRoute(resourceIndex, 'update')} active={!!props.template.template_object.resources[resourceIndex].routes.find(findRoute('update'))}>Update</Button>
                                            <Button toggle onClick={() => toggleRoute(resourceIndex, 'delete')} active={!!props.template.template_object.resources[resourceIndex].routes.find(findRoute('delete'))}>Delete</Button>
                                        </Button.Group>
                                    </div>
                                )
                            })}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column className='tips' width={4} style={{paddingRight: '0px'}}>
                        <style>
                            {
                                `.tips > .row {margin-bottom: 17px}
                                .tips > .row > p {margin-bottom: 2px}`
                            }
                        </style>
                        <Grid.Row>
                            <Header style={{ color: '#fff' }} content={"Tips 'n' Hints:"} />
                        </Grid.Row>
                        <Grid.Row>
                            <p><em style={{ textDecoration: 'underline', fontSize: '1.2em' }}>{`All routes are selected to start.`}</em>{` Please deselect any you do not want`}</p>
                        </Grid.Row>
                        <Grid.Row>
                            <p>{`- Routes are how you communicate with your API.`}</p>
                        </Grid.Row>
                        <Grid.Row style={{overflow: 'visible'}}>
                            <p>{`They Allow You To:`}</p>
                            <p>{`- Get All: Retrieve all resources in a collection`}</p>
                            <p>{`- Get One: Retrieve a single resource`}</p>
                            <p>{`- Create: Add a new resource to its respective collection`}</p>
                            <p>{`- Update: Alter an existing resource`}</p>
                            <p>{`- Delete: Remove a resource from its collection`}</p>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
    )
}

function mapStateToProps(state) {
    return {}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicApiData)