import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid, Form, Header, Segment, Button, Icon } from 'semantic-ui-react'
import { generateTemplate, saveTemplate, editTemplate } from '../../../actions'

const Finish = (props) => {
    async function saveAndOrDownload (object) {
        if (props.currentUser.id) {
            props.saveTemplate(object)
        }
        props.generateTemplate(object)
    }

    function saveChanges (object) {
        props.editTemplate(object)
    }

    return (
        <Container style={{ paddingRight: '0px' }}>
            <Form>
                <Grid container>
                    <Grid.Row>
                    <Grid.Column width={5}>
                        <Segment>
                            {/* Insert API Viewer Here */}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment>
                            <Form.Input label='API Name' onChange={e => props.templateFunctions.alterApiName(e.target.value)} value={props.template.template_object.name} placeholder='Give Your API a name!' />
                                {window.location.pathname.split(/[\\/]/g).includes('edit') ? <Button onClick={() => saveChanges(props.template)}>Save Changes</Button> : <Button onClick={() => saveAndOrDownload(props.template)}>Download {`${props.template.template_object.name}.zip`}</Button>}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={5} style={{paddingRight: '0px'}}>
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