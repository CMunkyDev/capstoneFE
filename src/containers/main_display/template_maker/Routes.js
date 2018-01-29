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
                                            <Header>
                                                {props.template.resources[resourceIndex].name}
                                            </Header>
                                        </Segment>
                                        <Button.Group color='orange' attached='bottom' fluid>
                                            <Button>Get One</Button>
                                            <Button>Get All</Button>
                                            <Button>Create</Button>
                                            <Button>Update</Button>
                                            <Button>Delete</Button>
                                        </Button.Group>
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