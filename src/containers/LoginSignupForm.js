import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { loginUser, signupUser, updateLoginForm, updateSignupForm, clearAuth} from '../actions'


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

    validationStrings = (formName , state = this.state) => {
        let form = state[formName]
        let strings = []
        for (let key in form) {
            if (typeof form[key] === 'object' && !Array.isArray(form[key])) {
                if (form[key].validationString) strings = [...strings, form[key].validationString]
            }
        }
        return strings
    }

    formValues = (formName, state = this.state) => {
        let form = state[formName]
        let values = []
        for (let key in form) {
            if (typeof form[key] === 'object' && !Array.isArray(form[key])) {
                if (form[key].value) values = [...values, form[key].value]
            }
        }
        return values
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
            if (this.props.auth[`${this.props.form}Err`] && !this.validationStrings(this.props.form).length) this.props.clearAuth()
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

    componentWillUpdate(nextProps, nextState) {
        if (nextState.signup.passwordMatch.value !== nextState.signup.password.value) {
            if (nextState.signup.passwordMatch.value) nextState.signup.passwordMatch.validationString = 'passwords don\'t match'
        } else {
            nextState.signup.passwordMatch.validationString = ''
        }

        if (!this.validationStrings(nextState.form, nextState).length && this.formValues(nextState.form, nextState).length === 4) {
            nextState[nextState.form].valid = true
        }

    }

    invalidInput = (formName, inputName) => {
        if (!this.state[formName][inputName].validationString || !this.state[formName][inputName].value) return false
        return true
    }

    usernameValidation = (username) => {
        let lengthIssueText = ''
        let characterIssueText = ''
        if (username.length < 4) lengthIssueText = 'must be 4 or more characters in length'
        if (/[^A-z0-9_]/.test(username)) characterIssueText = 'must only contain alphanumeric characters and underscores'
        if (lengthIssueText && characterIssueText) return `username ${lengthIssueText}, and ${characterIssueText}`
        if (lengthIssueText || characterIssueText) return `username ${lengthIssueText || characterIssueText}`
        return ''
    }

    passwordValidation = (password) => {
        if (password && password.length < 8) return 'password must be 8 or more characters in length'
        return ''
    }

    emailValidation = (email) => {
        if (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email) || !email) return ''
        return 'Invalid email address'
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
                <Button disabled={!this.state.login.valid} loading={this.props.auth.loading ? true : false} onClick={this.props.auth.loading ? () => {} : this.loginCallback()} color='green' fluid size='large'>Login</Button>
            </Segment>
        </Form>

    this.signupInputs = <Form error={!this.state.signup.valid} size='large' id='signup'>
            <Segment stacked>
                <Form.Input
                    fluid
                    icon='user'
                    name='email'
                    iconPosition='left'
                    placeholder='E-mail address'
                    value={this.state.signup.email.value}
                    onChange={this.handleChange(this.emailValidation)}
                    error={this.invalidInput('signup', 'email')}
                />
                <Form.Input
                    fluid
                    icon='user'
                    name='username'
                    iconPosition='left'
                    placeholder='Username'
                    value={this.state.signup.username.value}
                    onChange={this.handleChange(this.usernameValidation)}
                    error={this.invalidInput('signup', 'username')}
                />
                <Form.Input
                    fluid
                    icon='lock'
                    name='password'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={this.state.signup.password.value}
                    onChange={this.handleChange(this.passwordValidation)}
                    error={this.invalidInput('signup', 'password')}
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
                    error = {this.invalidInput('signup', 'passwordMatch') }
                />

                <Button disabled={!this.state.signup.valid} loading={this.props.auth.loading ? true : false} color='green' fluid size='large' onClick={this.props.auth.loading ? () => {} : this.signupCallback()}>Sign-Up</Button>
            </Segment>
            <Message hidden = {this.state.signup.valid} color='red' style={{fontSize: '1rem'}} error={!this.state.signup.valid}>
                {
                    this.props.auth.signupErr ||
                    this.validationStrings('signup').map(string => {
                        return `- ${string}`
                    })
                }
            </Message>
        </Form>

        return (
            <div className={`${this.props.form}-form`} color='blue' style={{ height: '100vh'}}>
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
                    <Header as='h2' style={{color: '#fff'}} textAlign='center'>
                        {' '}{this.props.form === 'login' ? 'Log-in to your account' : 'Sign-up for an account'}
                    </Header>
                        {this.props.form === 'login' ? this.loginInputs : this.signupInputs}
                    <Message>
                        {this.props.form === 'login' ? <div>New to snAPI? <a href='/signup'>Sign Up</a>  or <a href={'#'} onClick={this.props.history.goBack}>Go Back</a></div> : <div>Already have an account? <a href='/login'>Log In</a>  or <a href={'#'} onClick={this.props.history.goBack}>Go Back</a></div>}
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
    return bindActionCreators({ loginUser, signupUser, clearAuth }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginSignupForm))