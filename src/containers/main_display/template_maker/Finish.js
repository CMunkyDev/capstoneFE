import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid, Form, Header, Segment, Button, Icon } from 'semantic-ui-react'
import { generateTemplate, saveTemplate } from '../../../actions'

const Finish = (props) => {
    async function saveAndOrDownload (object) {
        if (props.currentUser.id) {
            props.saveTemplate(object)
        }
        props.generateTemplate(object)
    }

    return (
        <Container >
            <Form>
                <Grid container>
                    <Grid.Row>
                    <Grid.Column width={6}>
                        <Segment>
                            {/* Insert API Viewer Here */}
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment>
                            <Form.Input label='API Name' onChange={e => props.templateFunctions.alterApiName(e.target.value)} placeholder='Give Your API a name!' />
                            <Button onClick={() => saveAndOrDownload(props.template)}>Download {`${props.template.template_object.name}.zip`}</Button>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={4}>
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
    return bindActionCreators({ generateTemplate, saveTemplate }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Finish)