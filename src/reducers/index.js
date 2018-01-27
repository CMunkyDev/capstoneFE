import FileSaver from 'file-saver'
import { combineReducers } from 'redux'
import { 
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,

    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,

    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,

    UPDATE_CURRENT_USER,
    UPDATE_CURRENT_USER_SUCCESS,
    UPDATE_CURRENT_USER_FAILURE,

    GENERATE_TEMPLATE,
    GENERATE_TEMPLATE_SUCCESS,
    GENERATE_TEMPLATE_FAILURE,
    
    SAVE_TEMPLATE,
    SAVE_TEMPLATE_SUCCESS,
    SAVE_TEMPLATE_FAILURE,

    CHANGE_AUTH_FORM,
} from '../actions'

const INITIAL_STATE = {
    lastView: '/',
    currentUser: {
        id: 1,
        username: null
    },
    currentTemplate: {
        id: null,
        name: null
    },
    auth: {
        currentForm: null,
        loading: false,
    }
}

function auth (state = INITIAL_STATE.auth, action) {
    console.log('reducer fired')
    switch (action.type) {
        case SIGNUP_USER:
        case LOGIN_USER:
            return {...state, loading: true}
        case LOGIN_USER_SUCCESS:
        case SIGNUP_USER_SUCCESS:
            return {...state, loading: false}
        case CHANGE_AUTH_FORM:
            return {...state, currentForm: action.payload}
        default:
            return state
    }
}

function currentUser (state = INITIAL_STATE.currentUser, action) {
    switch (action.type) {
        case UPDATE_CURRENT_USER_SUCCESS:
        case SIGNUP_USER_SUCCESS:
        case LOGOUT_USER:
            return action.payload
        default:
            return state
    }
}

function currentTemplate (state = INITIAL_STATE.currentTemplate, action) {
    switch (action.type) {
        case GENERATE_TEMPLATE_SUCCESS:
            FileSaver.saveAs(action.payload.zip, `${action.payload.name}.zip`)
            return state
        default:
            return state
    }
}

// function searchField () {

// }

// function currentTemplate () {

// }

// function expandedTemplates () {

// }

// function userTemplates () {

// }

// function searchTemplates () {

// }

// function currentTemplateData () {

// }

// function templateMakerData () {

// }

export default combineReducers({
    auth,
    currentUser,
    currentTemplate
})