import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Segment, Button, ButtonGroup, Divider, Header } from 'semantic-ui-react'

const NotLoggedIn = (props) => {
    return (
        <Container text={true}>
            <Header as='h2' attached='top'>
                It looks like you aren't logged in
            </Header>   
            <Segment padded attached>
                <Segment padded >
                    <Header >
                        Log in to make a template
                    </Header>
                    <Divider type='horizontal'/>
                    <ButtonGroup >
                        <Button secondary as={'a'} href={'/signup'}>Sign Up</Button>
                        <Button.Or />
                        <Button primary as={'a'} href={'/login'}>Log In</Button>
                    </ButtonGroup>
                </Segment>
            </Segment>
        </Container>
    )
}

function mapStateToProps(state) {
    return {  }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NotLoggedIn)