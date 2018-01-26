import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class TemplateMaker extends Component {

}
function mapStateToProps(state) {
    return { }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateMaker)