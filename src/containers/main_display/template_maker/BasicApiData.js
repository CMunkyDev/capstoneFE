import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid, Form, Header, Segment, Button, Icon, Input, Popup, Label, Message} from 'semantic-ui-react'
import validation from './validation'

const BasicApiData = (props) => {
    const issueIndexArray = []
    function resourceIssueIdentifyingString (indexArray) {
        let indexString
        let resourceString = 'Resource'
        let hasString = 'has'
        if (indexArray.length > 1) {
            indexArray[indexArray.length - 1] = 'and ' + indexArray[indexArray.length - 1]
            if (indexArray.length > 2) {
                indexString = indexArray.join(', ')
            } else {
                indexString = indexArray.join(' ')
            }
        } else {
            indexString = `${indexArray[0]}`
        }
        if (indexArray.length > 1) {
            resourceString += 's'
            hasString = 'have'
        }

        return `${resourceString} ${indexString} ${hasString} issues.`
    }

    return (
                <Grid container fluid>
                    <Grid.Column width={12} style={{ paddingRight: '0px', paddingLeft: '0px' }}>
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
                                    <div>
                                    {
                                    props.template.template_object.resources.map((resource, index) => {
                                        let errorBool = !!validation(resource.name)
                                        return (
                                            <Input
                                                label={{color: errorBool ? 'red' : 'green', content: `${index+1}.`}}
                                                fluid
                                                key={index}
                                                value={resource.name}
                                                onChange={(e) => props.templateFunctions.alterResourceData(index, { name: e.target.value })}
                                                placeholder='Resource Name'
                                                action={<Button color='red' onClick={(e) => props.templateFunctions.removeResource(index)}>Remove</Button>}
                                                style={{ marginBottom: '14px' }}
                                                error={errorBool ? issueIndexArray.push(index+1) : false}
                                            />
                                        )
                                    })
                                    }
                                    {issueIndexArray.length ? 
                                    <Message color='yellow'>
                                        <Message.Header>
                                            {resourceIssueIdentifyingString(issueIndexArray)}
                                        </Message.Header>
                                        <Message.List>
                                            <Message.Item>
                                                Resources must be named.
                                            </Message.Item>
                                            <Message.Item>
                                                Resource names may only contain aplhanumeric characters, dashes, and underscores.
                                            </Message.Item>
                                        </Message.List>
                                    </Message>
                                    :
                                    <Message color='green'><Message.Header>Everything Looks Good!</Message.Header></Message>}
                                    </div>
                                }
                            </Segment>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column className='tips' width={4} style={{paddingRight: '0px'}}>
                    <style>
                    {
                        `.tips > .row {margin-bottom: 17px}`
                    }
                    </style>
                        <Grid.Row>
                            <Header style={{ color: '#fff' }} content={"Tips 'n' Hints:"} />
                        </Grid.Row>
                        <Grid.Row>
                            {`<--- Click the plus(+) to add a resource to your API. (Don't forget to name it!)`}
                        </Grid.Row>
                        <Grid.Row>
                            {`- You can think of a resource as a thing your api talks with other servers about and/or what you are storing data regarding.`}
                        </Grid.Row>
                        <Grid.Row>
                            {`- Example: If you are making a forum API, you might want resources for: users, threads, posts, and sections.`}
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