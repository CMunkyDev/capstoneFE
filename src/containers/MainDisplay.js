import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import TemplateMaker from './main_display/TemplateMaker'

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
const steps = [
    { key: 'shipping', icon: 'truck', title: 'Shipping', description: 'Choose your shipping options' },
    { key: 'billing', active: true, icon: 'payment', title: 'Billing', description: 'Enter billing information' },
    { key: 'confirm', disabled: true, icon: 'info', title: 'Confirm Order' },
]
const MainPage = ({}) => {
    return (
        <Grid style={{height: '100vh'}} color='teal' stretched>
            <Grid.Row color='blue' >
                <Grid.Column width={16}>
                    <FixedMenu />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row color='blue' style={{height: '5vh'}} />
            <Grid.Row color='blue' style={{height: '90vh'}}>
                <Grid.Column width={2}/>
                <Grid.Column width={12} style={{borderRadius: '5px'}}>
                    <BrowserRouter>
                        <Switch>
                            <Route path='/create' render={() => <TemplateMaker />} />
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