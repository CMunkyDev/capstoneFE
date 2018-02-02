import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid, Form, Header, Segment, Button, Icon} from 'semantic-ui-react'

const BasicApiData = (props) => {
    console.log(props)
    return (
        <Container >
            <Form>
                <Grid container>
                    <Grid.Column width={12}>
                        <Segment>
                            <Segment attached='top' clearing>
                                <Header floated='left' >
                                    Resources
                                </Header>
                                <Button color='blue' icon floated='right' onClick={props.templateFunctions.addResource}>
                                    <Icon name='add'/>
                                </Button>
                            </Segment>
                            <Segment attached>
                                {
                                    !props.template.template_object.resources.length ? 'Add A Resource' :
                                    props.template.template_object.resources.map((resource, index) => {
                                            return <Form.Input key={index} value={props.template.template_object.resources[index].name} onChange={(e) => props.templateFunctions.alterResourceData(index, {name: e.target.value})} placeholder='Resource Name' action={<Button color='red' onClick={(e) => props.templateFunctions.removeResource(index)}>Remove</Button>}/>
                                    })
                                }
                            </Segment>
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