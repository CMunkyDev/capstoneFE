import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginUser, logoutUser } from '../actions'

const CurrentUser = ({currentUser, loginUser, logoutUser }) => {
    if (!currentUser.id) {
        return (
            <div onClick={() => loginUser({username: 'Ronald', id: 1})}>
                Login
            </div>
        )
    } else {
        return (
            <div onClick={() => logoutUser()}>
                Logout
            </div>
        )
    }
    
}

function mapStateToProps (state) {
    return { currentUser: state.currentUser }
}
function mapDispatchToProps (dispatch) {
    return bindActionCreators({ loginUser, logoutUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser)