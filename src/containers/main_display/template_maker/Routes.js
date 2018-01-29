import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid, Form, Header, Segment, Button, Icon } from 'semantic-ui-react'

const BasicApiData = (props) => {
    console.log(props)
    return (
        <Container >
            <Form>
                <Grid container>
                    <Grid.Column width={12}>
                        <Segment>
                            {!props.template.resources.length ? 'Add a Resource' : props.template.resources.map((resource, resourceIndex) => {
                                return (
                                    <div key={resourceIndex}>
                                        <Segment attached='top' clearing>
                                            <Header floated='left' >
                                                {props.template.resources[resourceIndex].name}
                                            </Header>
                                            <Button color='blue' icon floated='right' onClick={() => props.templateFunctions.addRoute(resourceIndex)}>
                                                <Icon name='add' />
                                            </Button>
                                        </Segment>
                                        <Segment attached>
                                            <Button as='checkbox' >OK</Button>
                                            {
                                                !props.template.resources[resourceIndex].routes.length ? 'Add a Route' :
                                                props.template.resources[resourceIndex].routes.map((route, routeIndex) => {
                                                    return <Form.Input key={`${resourceIndex}_${routeIndex}`}placeholder='Route Name' action={<Button color='red' onClick={(e) => props.templateFunctions.removeRoute(resourceIndex, routeIndex)}>Remove</Button>} />
                                                })
                                            }
                                        </Segment>
                                    </div>
                                )
                            })}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        Current Hints
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