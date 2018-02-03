import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid, Form, Header, Segment, Button, Icon, Label, Popup, Message } from 'semantic-ui-react'
import { generateTemplate, saveTemplate, editTemplate } from '../../../actions'

const Finish = (props) => {
    function nameValidationText(nameString, thingToName = 'API') {
        let nameErrors = {
            noName: `Please enter a name for your ${thingToName}.`,
            invalidCharacters: 'Names may only contain alphanumeric characters, underscores, dashes, and periods.'
        }
        let invalidChars = /[^A-z._-]/
        if (!nameString) return nameErrors.noName
        if (invalidChars.test(nameString)) return nameErrors.invalidCharacters
        return ''
    }

    let validationText = nameValidationText(props.template.template_object.name)

    function saveButton () {
        if (window.location.pathname.split(/[\\/]/g).includes('edit')) {
            return <Button onClick={() => props.editTemplate(props.template)}>Save Changes</Button>
        } else if (!props.currentUser.id) {
            return <Popup
                trigger={<div><Button fluid disabled>Save to Account</Button></div>}
                content={'Log-in to save templates'}
                position={'top center'}
                />
        } else if (validationText) {
            return <Button disabled>Save to Account</Button>
        } else {
            return <Button onClick={() => props.saveTemplate(props.template)}>Save to Account</Button>
        }
    }

    return (
        <Container fluid style={{ paddingRight: '0px', paddingLeft: '0px' }}>
            <Form>
                <Grid container>
                    <Grid.Row>
                    <Grid.Column width={5}>
                        <Segment>
                            {/* Insert API Viewer Here */}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment style={{display: 'flex', flexDirection: 'column'}}>
                            <Form.Input label='API Name' onChange={e => props.templateFunctions.alterApiName(e.target.value)} value={props.template.template_object.name} placeholder='Give Your API a name!' />
                                {saveButton()}
                                <Button disabled={!!validationText} style={{marginRight: '0px', marginTop: '14px'}}onClick={() => props.generateTemplate(props.template)}>Download {`${props.template.template_object.name}.zip`}</Button>
                        </Segment>
                        {validationText ? <Message color='yellow'>{validationText}</Message> : ''}
                    </Grid.Column>
                    <Grid.Column width={5} style={{paddingRight: '0px', paddingLeft: '0px'}}>
                        <Segment>
                            Notes
                        </Segment>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>

        </Container>
    )
}

function mapStateToProps(state) {
    return { currentTemplate: state.currentTemplate, currentUser: state.currentUser }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ generateTemplate, saveTemplate, editTemplate }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Finish)