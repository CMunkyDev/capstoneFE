import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid, Form, Header, Segment, Button} from 'semantic-ui-react'

const BasicApiData = (props) => {
    console.log(props)
    return (
        <Container >
            <Form>
                <Grid container>
                    <Grid.Column width={12}>
                        <Segment>
                            <Form.Input label='API Name' value={props.template.name}/>
                            <Segment clearing>
                                <Header floated='left' >
                                    Resources
                                </Header>
                                <Button floated='right'/>
                                {
                                    !props.template.resources.length ? 'Add A Resource' :
                                    props.template.resources.map((resource, index) => {
                                            return <Form.Input action={<Button onClick={(e) => props.templateFunctions.removeResource(index)}>Remove</Button>}/>
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