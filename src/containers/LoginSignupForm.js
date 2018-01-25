import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { loginUser, signupUser, updateLoginForm, updateSignupForm } from '../actions'


class LoginSignupForm extends Component {
    constructor (props) {
        super(props)
        this.state = {
            login: {
                email: {
                    value: '',
                    validationString: '',
                    validationFunction: '',
                },
                password: {
                    value: '',
                    validationString: '',
                    validationFunction: '',
                }
            },
            signup: {
                email: {
                    value: '',
                    validationString: '',
                    validationFunction: '',
                },
                username: {
                    value: '',
                    validationString: '',
                    validationFunction: '',
                },
                password: {
                    value: '',
                    validationString: '',
                    validationFunction: '',
                },
                passwordMatch: {
                    value: '',
                    validationString: '',
                    validationFunction: '',
                }
            }

        }

        
    }

    handleChange = (validationFunction) => {
        return (event) => {
            event.persist()
            let stateKey = event.target.name
            let stateParent = event.target.form.id
            console.log(stateParent, stateKey, 'value: ', event.target.value)
            this.setState(prev => {
                let newValidationString = validationFunction ? validationFunction(event.target.value) : prev[stateParent][stateKey].validationString
                return { ...prev, [stateParent]: { ...prev[stateParent], [stateKey]: { ...prev[stateParent][stateKey], value: event.target.value, validationString: newValidationString } } }
            })
        }
    }

    render () {
        if (!this.props.form) return ''

        this.loginInputs = <Form size='large' id='login'>
            <Segment stacked>
                <Form.Input
                    fluid
                    icon='user'
                    name='email'
                    iconPosition='left'
                    placeholder='E-mail address'
                    onChange={this.loginFormUpdateCallback}
                />
                <Form.Input
                    fluid
                    icon='lock'
                    name='password'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    onChange={this.loginFormUpdateCallback}
                />

                <Button color='teal' fluid size='large'>Login</Button>
            </Segment>
        </Form>

        this.signupInputs = <Form size='large' id='signup'>
            <Segment stacked>
                <Form.Input
                    fluid
                    icon='user'
                    name='email'
                    iconPosition='left'
                    placeholder='E-mail address'
                    value={this.state.signup.email.value}
                    onChange={this.handleChange()}
                />
                <Form.Input
                    fluid
                    icon='user'
                    name='username'
                    iconPosition='left'
                    placeholder='Username'
                    value={this.state.signup.username.value}
                    onChange={this.handleChange()}
                />
                <Form.Input
                    fluid
                    icon='lock'
                    name='password'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={this.state.signup.password.value}
                    onChange={this.handleChange()}
                />
                <Form.Input
                    fluid
                    icon='lock'
                    name='passwordMatch'
                    iconPosition='left'
                    placeholder='Re-Enter Password'
                    type='password'
                    value={this.state.signup.passwordMatch.value}
                    onChange={this.handleChange()}
                />

                <Button color='teal' fluid size='large'>Sign-Up</Button>
            </Segment>
        </Form>
        
        return (
        <div className={`${this.props.form}-form`}>
            {/*
                Heads up! The styles below are necessary for the correct render of this example.
                You can do same with CSS, the main idea is that all the elements up to the `Grid`
                below must have a height of 100%.
                */}
            <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.${this.props.form}-form {
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
                        {/*<Image src='/logo.png' />*/}
                        {' '}{this.props.form === 'login' ? 'Log-in to your account' : 'Sign-up for an account'}
                    </Header>
                    <div>
                        {this.props.form === 'login' ? this.loginInputs : this.signupInputs}
                    </div>
                    <Message>
                {this.props.form === 'login' ? <div>New to us? <a href='#'>Sign Up</a></div> : <div>Already have an account? <a href='#'>Log In</a></div>}
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
    return bindActionCreators({ loginUser, signupUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignupForm)