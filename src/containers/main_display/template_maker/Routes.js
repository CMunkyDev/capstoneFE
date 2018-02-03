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
        <Container >
            <Form>
                <Grid container>
                    <Grid.Column width={12}>
                        <Segment style={{minHeight: '324px', color: '#000'}}>
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
                    <Grid.Column width={4}>
                        <Grid.Row>
                            <Header style={{color: '#fff'}} content={"Tips 'n' Hints:"} />
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Form>

        </Container>
    )
}

function mapStateToProps(state) {
    return {}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicApiData)