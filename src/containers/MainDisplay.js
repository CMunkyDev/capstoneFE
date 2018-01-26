import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
//import TemplateMaker from '../containers/TemplateMaker'
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
        <div>
            <Container fluid>
                <FixedMenu />
            </Container>
            <Container fluid>
                <BrowserRouter>
                    <Switch>
                        <Route path='/create' render={() => <div>LOL</div>}/>
                    </Switch>
                </BrowserRouter>
            </Container>
        </div>
    )
}

function mapStateToProps(state) {
    return {  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)