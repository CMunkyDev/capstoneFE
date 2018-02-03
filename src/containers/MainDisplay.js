import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import TemplateMaker from './main_display/TemplateMaker'
import TemplateList from './main_display/TemplateList'

import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Visibility,
    Step,
} from 'semantic-ui-react'

const FixedMenu = () => (
    <Menu borderless attached size='large'>
        <Container fluid>
            <Menu.Menu position='left'>
                <Menu.Item>
                    <Button as='a' href='/create' positive>Create an API</Button>
                </Menu.Item>
                <Menu.Item >
                    <Button as='a' href='/user' color='yellow'>View My APIs</Button>
                </Menu.Item>
            </Menu.Menu>
            <Menu.Menu position='right'>
                <Menu.Item>
                    {/* todo: actually check token for validity before rendering button */}
                    { localStorage.getItem('api_dev_token') ? <Button as='a' href='/' onClick={() => localStorage.setItem('api_dev_token', '')}>Logout</Button> : <Button as='a' href='/login'>Log in</Button> }
                </Menu.Item>
                <Menu.Item >
                    <Button as='a' href='/signup' primary>Sign Up</Button>
                </Menu.Item>
            </Menu.Menu>
        </Container>
    </Menu>
)

const MainPage = ({}) => {
    return (
        <Grid color='teal'>
            <Grid.Row color='blue'>
                <Grid.Column width={16} style={{paddingRight: '0px', paddingLeft: '0px'}}>
                    <FixedMenu />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row color='blue' style={{minHeight: '100%'}}>
                <Grid.Column width={2}/>
                <Grid.Column width={12} style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                    <BrowserRouter>
                        <Switch>
                            <Route path='/create' component={TemplateMaker} />
                            <Route path='/edit/:id' component={TemplateMaker} />
                            <Route path='/user' component={TemplateList} />
                            <Route render={() => <Redirect to='/create' />} />
                        </Switch>
                    </BrowserRouter>
                </Grid.Column>
                <Grid.Column width={2}/>
            </Grid.Row >
            <Grid.Row color='blue'/>
        </Grid>
    )
}

function mapStateToProps(state) {
    return {  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)