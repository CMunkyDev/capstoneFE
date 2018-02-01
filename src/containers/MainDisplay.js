import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
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
    <Menu borderless size='large'>
        <Container fluid>
            <Menu.Menu position='right'>
                <Menu.Item className='item'>
                    <Button as='a' href='/login'>Log in</Button>
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
                <Grid.Column width={16} style={{paddingRight: '0px'}}>
                    <FixedMenu />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row color='blue' style={{minHeight: '95vh'}}>
                <Grid.Column width={2}/>
                <Grid.Column width={12}>
                    <BrowserRouter>
                        <Switch>
                            <Route path='/create' render={() => <TemplateMaker />} />
                            <Route path='/user' render={() => <TemplateList />} />
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