import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid, Form, Header, Segment, Button, Icon, Label, Popup, Message } from 'semantic-ui-react'
import { generateTemplate, saveTemplate, editTemplate } from '../../../actions'
import validation from './validation'
import ApiDiagram from '../ApiDiagram'

const Finish = (props) => {
    let validationText = validation(props.template.template_object.name)

    function saveButton () {
        if (window.location.pathname.split(/[\\/]/g).includes('edit')) {
            return <Button href='/user' onClick={() => props.editTemplate(props.template)}>Save Changes</Button>
        } else if (!props.currentUser.id) {
            return <Popup
                trigger={<div><Button fluid disabled>Save to Account</Button></div>}
                content={'Log-in to save templates'}
                position={'top center'}
                />
        } else if (validationText) {
            return <Button disabled>Save to Account</Button>
        } else {
            return <Button href='/user' onClick={() => props.saveTemplate(props.template)}>Save to Account</Button>
        }
    }

    return (
        <Container fluid style={{ paddingRight: '0px', paddingLeft: '0px' }}>
            <Form>
                <Grid container>
                    <Grid.Row>
                    <Grid.Column width={5}>
                        <Segment style={{overflowY: 'scroll', maxHeight: '251px'}}>
                            <Header>API Diagram</Header>
                            <ApiDiagram template={props.template.template_object}/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment style={{display: 'flex', flexDirection: 'column'}}>
                            <Form.Input autoFocus label='API Name' onChange={e => props.templateFunctions.alterApiName(e.target.value)} value={props.template.template_object.name} placeholder='Give Your API a name!' />
                                {saveButton()}
                                <Button disabled={!!validationText} style={{marginRight: '0px', marginTop: '14px'}}onClick={() => props.generateTemplate(props.template)}>Download {`${props.template.template_object.name}.zip`}</Button>
                        </Segment>
                        {validationText ? <Message color='yellow'>{validationText}</Message> : ''}
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Segment style={{color: '#000', height: '251px'}}>
                            <span style={{fontWeight: 'bold'}}>What Now?</span>
                            <p> </p>
                            <p><span style={{ fontWeight: 'bold' }}>Save to Account: </span>This will store your API template in our database for you to download, edit, or delete in the future. This action will redirect you to your templates.</p>
                            <p><span style={{ fontWeight: 'bold' }}>Download .zip File: </span>This will download a .zip file of your API to your download folder for this browser. In the .zip will be a readme that will explain all the details of your freshly made API</p>
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