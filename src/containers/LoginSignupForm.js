import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { loginUser, signupUser, updateLoginForm, updateSignupForm } from '../actions'

const LoginSignupForm = ({auth, loginUser, signupUser, updateSignupForm, updateLoginForm}) => {
    function loginFormUpdateCallback(e) {
        let { email, password } = e.target.form
        let formData = { email, password }
        return updateLoginForm(formData)
    }

    function signupFormUpdateCallback(e) {
        let { email, username, password, passwordMatch } = e.target.form
        let formData = { email: email.value, username: username.value, password: password.value, passwordMatch: passwordMatch.value }
        return updateSignupForm(formData)
    }

    if (auth.currentForm === 'login') {
        return (
            <div className='login-form'>
                {/*
                Heads up! The styles below are necessary for the correct render of this example.
                You can do same with CSS, the main idea is that all the elements up to the `Grid`
                below must have a height of 100%.
                */}
            <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                        height: 100%;
                    }
            `}</style>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src='/logo.png' />
                            {' '}Log-in to your account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    name='email'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    onChange={loginFormUpdateCallback}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    name='password'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={loginFormUpdateCallback}
                                />

                                <Button color='teal' fluid size='large' onClick>Login</Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <a href='#'>Sign Up</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    } else {
        return (
            <div className='login-form'>
                {/*
                Heads up! The styles below are necessary for the correct render of this example.
                You can do same with CSS, the main idea is that all the elements up to the `Grid`
                below must have a height of 100%.
                */}
                <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                        height: 100%;
                    }
            `}</style>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src='/logo.png' />
                            {' '}Sign-up for an account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    name='email'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    onChange={signupFormUpdateCallback}
                                />
                                <Form.Input
                                    fluid
                                    icon='user'
                                    name='username'
                                    iconPosition='left'
                                    placeholder='Username'
                                    onChange={signupFormUpdateCallback}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    name='password'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={signupFormUpdateCallback}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    name='passwordMatch'
                                    iconPosition='left'
                                    placeholder='Re-Enter Password'
                                    type='password'
                                    onChange={signupFormUpdateCallback}
                                />

                                <Button color='teal' fluid size='large'>Login</Button>
                            </Segment>
                        </Form>
                        <Message>
                            Already have an account? <a href='#'>Log-in</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
    
}


function mapStateToProps(state) {
    return { auth: state.auth }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loginUser, signupUser, updateLoginForm, updateSignupForm }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignupForm)