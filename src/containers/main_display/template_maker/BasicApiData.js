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
                            <Segment attached style={!props.template.template_object.resources.length ? {minHeight: '227px', color: '#000', display: 'flex', justifyContent: 'space-around', alignContent: 'center'} : {minHeight: '227px'}}>
                                {
                                    !props.template.template_object.resources.length ? 'Add A Resource' :
                                    props.template.template_object.resources.map((resource, index) => {
                                            return <Form.Input key={index} value={props.template.template_object.resources[index].name} onChange={(e) => props.templateFunctions.alterResourceData(index, {name: e.target.value})} placeholder='Resource Name' action={<Button color='red' onClick={(e) => props.templateFunctions.removeResource(index)}>Remove</Button>}/>
                                    })
                                }
                            </Segment>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column className='tips' width={4}>
                    <style>
                    {
                        `.tips > .row {margin-bottom: 17px}`
                    }
                    </style>
                        <Grid.Row>
                            <Header style={{ color: '#fff' }} content={"Tips 'n' Hints:"} />
                        </Grid.Row>
                        <Grid.Row>
                            {`<--- Click here to add a resource to your API. (Don't forget to name it!)`}
                        </Grid.Row>
                        <Grid.Row>
                            {`- You can think of a resource as a thing your api talks with other servers about and/or what you are storing data regarding.`}
                        </Grid.Row>
                        <Grid.Row>
                            {`- Example: If you are making a forum API, you might want resources for: users, threads, posts, and sections.`}
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