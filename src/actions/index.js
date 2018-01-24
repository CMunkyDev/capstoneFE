export const SIGNUP_USER = 'SIGNUP_USER'
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS'
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'

export const LOGOUT_USER = 'LOGOUT_USER'
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'
export const LOGOUT_USER_FAILURE ='LOGOUT_USER_FAILURE'

export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'
export const UPDATE_CURRENT_USER_SUCCESS = 'UPDATE_CURRENT_USER_SUCCESS'
export const UPDATE_CURRENT_USER_FAILURE = 'UPDATE_CURRENT_USER_FAILURE'

export const GENERATE_TEMPLATE = 'GENERATE_TEMPLATE'
export const GENERATE_TEMPLATE_SUCCESS = 'GENERATE_TEMPLATE_SUCCESS'
export const GENERATE_TEMPLATE_FAILURE = 'GENERATE_TEMPLATE_FAILURE'

export const SAVE_TEMPLATE = 'SAVE_TEMPLATE'
export const SAVE_TEMPLATE_SUCCESS = 'SAVE_TEMPLATE_SUCCESS'
export const SAVE_TEMPLATE_FAILURE = 'SAVE_TEMPLATE_FAILURE'


export const CHANGE_AUTH_FORM = 'CHANGE_AUTH_FORM'

export const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM'

export const UPDATE_SIGNUP_FORM = 'UPDATE_SIGNUP_FORM'

export function signupUser (signupForm) {
    const { password } = signupForm
    return (dispatch) => {
        dispatch({ type: SIGNUP_USER })
        return request(`/auth/signup`, 'POST', signupForm)
        .then(res => {
            return res.json()
        })
        .then(json => {
            let { id, username, email } = json
            let user = { id, username }
            let login = { email, password }
            dispatch({
                type: SIGNUP_USER_SUCCESS,
                payload: user
            })
            return loginUser(login)
        })
        .catch(err => {
            dispatch({
                type: SIGNUP_USER_FAILURE,
                payload: err
            })
            console.log('Error sent in signup failure action payload: ', err)
        })
    }
}

export function loginUser (loginForm) {
    return (dispatch) => {
        dispatch({type: LOGIN_USER})
        return request(`/auth/login`, 'POST', loginForm)
            .then(res => {
                return res.json()
            })
            .then(json => {
                const token = json.authorization
                localStorage.setItem('api_dev_token', token)
                return updateCurrentUser()
            })
            .then(() => {
                dispatch({ type: LOGIN_USER_SUCCESS })
            })
            .catch(err => {
                dispatch({
                    type: LOGIN_USER_FAILURE,
                    payload: err
                })
                console.log('Error sent in login failure action payload: ', err)
            })
    }
}

export function updateCurrentUser () {
    return (dispatch) => {
        dispatch({ type: UPDATE_CURRENT_USER })
        return request(`/auth/current`)
            .then(res => {
                return res.json()
            })
            .then(json => {
                const { id, username } = json
                const user = { id, username }

                dispatch({
                    type: UPDATE_CURRENT_USER_SUCCESS,
                    payload: user
                })
            })
            .catch(err => {
                dispatch({
                    type: UPDATE_CURRENT_USER_FAILURE,
                    payload: err
                })
                console.log('Error sent in update current user failure action payload: ', err)
            })
    }
}

export function changeAuthForm (formName = null) {
    return {
        type: CHANGE_AUTH_FORM,
        payload: formName
    }
}

export function logoutUser () {
    return async dispatch => {
        dispatch({
            type: LOGOUT_USER,
            payload: {
                id: null,
                username: null
            }
        })
        await localStorage.setItem('api_dev_token', '')
        dispatch({
            type: LOGOUT_USER_SUCCESS
        })
    }
}

export function saveTemplate (templateObject) {
    return async (dispatch) => {
        const res = await request(`/api/templates`, 'POST', templateObject)
        const json = await res.json()

        dispatch({
            type: SAVE_TEMPLATE_SUCCESS,
            payload: json
        })
    }
}

export function generateTemplate (id, name = 'server') {
    return async (dispatch) => {
        console.log(id, name)
        console.log('api: ', process.env.REACT_APP_API_URL)
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/templates/${id}/zip`)
        console.log(res)
        const blob = await res.blob()

        dispatch({
            type: GENERATE_TEMPLATE_SUCCESS,
            payload: {
                zip: blob,
                name
            }
        })
    }
}

export function updateLoginForm (formData) {
    return dispatch => {
        dispatch({
            type: UPDATE_LOGIN_FORM,
            payload: formData
        })
    }
}

export function updateSignupForm (formData) {
    console.log('updateSignupFormActionCreator before dispatch')
    return {
            type: UPDATE_SIGNUP_FORM,
            payload: formData
        }
    
}

//==============================================================//
function request(path, method = 'GET', body = null) {
    if (body) body = JSON.stringify(body)
    return fetch(`${process.env.REACT_APP_API_URL}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': localStorage.getItem('api_dev_token')
        },
        body: body
    })
}