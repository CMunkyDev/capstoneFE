import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { loginUser, signupUser, updateLoginForm, updateSignupForm } from '../actions'


class LoginSignupForm extends Component {
    constructor (props) {
        super(props)
        this.login = {
            valid: false,
            error: '',
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
        }

        this.signup = {
            valid: false,
            error: '',
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
        this.state = {
            form: this.props.form,
            login: this.login,
            signup: this.signup

        }

        
    }

    extractInputs = (form) => {
        let inputArr = []
        for (let i = 0; i < form.children.length; i++) {
            inputArr = inputArr.concat(form.children[i].tagName == 'INPUT' ? form.children[i] : [])
            inputArr = inputArr.concat(this.extractInputs(form.children[i]))
        }
        return inputArr
    }

    handleChange = (validationFunction) => {
        return (event) => {
            event.persist()
            let stateKey = event.target.name
            let stateParent = event.target.form.id
            let valid = true
            let inputs = this.extractInputs(event.target.form)
            for (let input in inputs) {
                if (this.state[stateParent][inputs[input].name].validationString || !inputs[input].value) {
                    valid = false
                    break
                }
            }
            this.setState(prev => {
                let newValidationString = validationFunction ? validationFunction(event.target.value) : prev[stateParent][stateKey].validationString
                return { ...prev, [stateParent]: { ...prev[stateParent], valid, [stateKey]: { ...prev[stateParent][stateKey], value: event.target.value, validationString: newValidationString } } }
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
                    onChange={this.handleChange()}
                />
                <Form.Input
                    fluid
                    icon='lock'
                    name='password'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    onChange={this.handleChange()}
                />
                <Button disabled={!this.state.login.valid} loading={this.props.auth.loading ? true : false} onClick={this.props.auth.loading ? () => {} : this.loginCallback()}color='teal' fluid size='large'>Login</Button>
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

                <Button disabled={!this.state.signup.valid} loading={this.props.auth.loading ? true : false} color='teal' fluid size='large' onClick={this.props.auth.loading ? () => {} : this.signupCallback()}>Sign-Up</Button>
            </Segment>
            <Message error={true}>
            {/*Insert Error Messages Here*/}
            </Message>
        </Form>

        return (
            <div className={`${this.props.form}-form`} style={{ backgroundColor: '#d4f4f2', height: '100vh'}}>
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
                        {this.props.form === 'login' ? this.loginInputs : this.signupInputs}
                    <Message>
                            {this.props.form === 'login' ? <div>New to us? <a href='/signup'>Sign Up</a>  or <a href='/'>Go Back</a></div> : <div>Already have an account? <a href='/login'>Log In</a>  or <a href='/'>Go Back</a></div>}
                    </Message>
                </Grid.Column>
            </Grid>
        </div>
        )
    }

    loginCallback = () => {
        return e => {
            if (!this.state[e.target.form.id].valid) {
                this.setState(prev => ({ ...prev, [e.target.form.id]: { ...prev[e.target.form.id], error: 'All fields are required' } }))
            }
            let { password, email } = e.target.form
            password = password.value
            email = email.value
            let formData = { email, password }
            this.props.loginUser(formData)
            this.setState(prev => ({...prev, login: this.login}))
        }
    }

    signupCallback = () => {
        return e => {
            if (!this.state[e.target.form.id].valid) {
                this.setState(prev => ({...prev, [e.target.form.id]: {...prev[e.target.form.id], error:'All fields are required'}}))
            }
            let { email, username, password } = e.target.form
            email = email.value
            username = username.value
            password = password.value
            let formData = { email, username, password }
            this.props.signupUser(formData)
            this.setState(prev => ({ ...prev, signup: this.signup }))
        }
    }
}




function mapStateToProps(state) {
    return { auth: state.auth }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loginUser, signupUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignupForm)