export const SIGNUP_USER = 'SIGNUP_USER'
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS'
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE'

export const RETRIEVE_USER_TEMPLATES = 'RETRIEVE_USER_TEMPLATES'
export const RETRIEVE_USER_TEMPLATES_SUCCESS = 'RETRIEVE_USER_TEMPLATES_SUCCESS'
export const RETRIEVE_USER_TEMPLATES_FAILURE = 'RETRIEVE_USER_TEMPLATES_FAILURE'

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

export const EDIT_TEMPLATE = 'EDIT_TEMPLATE'
export const EDIT_TEMPLATE_SUCCESS = 'EDIT_TEMPLATE_SUCCESS'
export const EDIT_TEMPLATE_FAILURE = 'EDIT_TEMPLATE_FAILURE'

export const DELETE_TEMPLATE = 'DELETE_TEMPLATE'
export const DELETE_TEMPLATE_SUCCESS = 'DELETE_TEMPLATE_SUCCESS'
export const DELETE_TEMPLATE_FAILURE = 'DELETE_TEMPLATE_FAILURE'

export const CHANGE_AUTH_FORM = 'CHANGE_AUTH_FORM'

export function signupUser (signupForm) {
    const { password } = signupForm
    return (dispatch) => {
        dispatch({ type: SIGNUP_USER })
        return request(`/auth/signup`, 'POST', signupForm)
        .then(res => {
            return res.json()
        })
        .then(json => {
            let { id, username, email } = json.users
            let user = { id, username }
            let login = { email, password }
            console.log('login', login)
            dispatch({
                type: SIGNUP_USER_SUCCESS,
                payload: user
            })
            dispatch(loginUser(login))
        })
        .catch(err => {
            dispatch({
                type: SIGNUP_USER_FAILURE,
                payload: err
            })
            console.log('Error sent in signup-failure action payload: ', err)
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
            })
            .then(() => {
                dispatch({ type: LOGIN_USER_SUCCESS })
                dispatch(updateCurrentUser())
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
                const { id, username } = json.currentUser
                const user = { id, username }

                dispatch({
                    type: UPDATE_CURRENT_USER_SUCCESS,
                    payload: user
                })
                return id
            })
            .then(id => dispatch(getUserTemplates(id)))
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
            type: LOGOUT_USER
        })
        await localStorage.setItem('api_dev_token', '')
        dispatch({
            type: LOGOUT_USER_SUCCESS
        })
    }
}

export function saveTemplate (templateData) {
    console.log(templateData)
    return async (dispatch) => {
        dispatch({
            type: SAVE_TEMPLATE,
            payload: templateData.template_object.name
        })
        request(`/api/templates`, 'POST', templateData)
            .then(res => {
                return res.json()
            })
            .then(json => {
                dispatch({
                    type: SAVE_TEMPLATE_SUCCESS,
                    payload: json
                })
            })
            .catch(err => {
                dispatch({
                    type: SAVE_TEMPLATE_FAILURE,
                    payload: err
                })
            })
    }
}

export function editTemplate (templateData) {
    return async (dispatch) => {
        dispatch({
            type: EDIT_TEMPLATE
        })
        request(`/api/templates/${templateData.id}`, 'PATCH', templateData)
            .then(res => {
                return res.json()
            })
            .then(json => {
                dispatch({
                    type: EDIT_TEMPLATE_SUCCESS,
                    payload: json
                })
            })
            .catch(err => {
                dispatch({
                    type: EDIT_TEMPLATE_FAILURE,
                    payload: err
                })
            })
    }
}

export function deleteTemplate (templateId) {
    return async (dispatch) => {
        dispatch({
            type: DELETE_TEMPLATE
        })
        request(`/api/templates/${templateId}`, 'DELETE')
            .then(res => {
                return res.json()
            })
            .then(json => {
                dispatch({
                    type: DELETE_TEMPLATE_SUCCESS,
                    payload: templateId
                })
            })
            .catch(err => {
                dispatch({
                    type: DELETE_TEMPLATE_FAILURE,
                    payload: err
                })
            })
    }
}

export function generateTemplate (templateObject) {
    return async (dispatch) => {
        const res = await request(`/api/templates/zip`, 'POST', templateObject)
        const blob = await res.blob()

        dispatch({
            type: GENERATE_TEMPLATE_SUCCESS,
            payload: {
                zip: blob,
                name: templateObject.template_object.name
            }
        })
    }

}

export function getUserTemplates (userId) {
    return async (dispatch) => {
        dispatch({ type: RETRIEVE_USER_TEMPLATES })
        return request(`/api/users/${userId}/templates`)
            .then(res => {
                return res.json()
            })
            .then(json => {
                console.log(json)
                dispatch({
                    type: RETRIEVE_USER_TEMPLATES_SUCCESS,
                    payload: json
                })
            })
            .catch(err => {
                dispatch({
                    type: RETRIEVE_USER_TEMPLATES_FAILURE,
                    payload: err
                })
            })
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