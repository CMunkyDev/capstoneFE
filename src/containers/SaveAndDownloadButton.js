import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { generateTemplate } from '../actions'

const SaveAndDownloadButton = ({ currentTemplate, generateTemplate }) => {
    return currentTemplate.id ? <button onClick={() => generateTemplate(currentTemplate.id, currentTemplate.name)}>Download {`${currentTemplate.name}.zip`}</button> : ''
}

function mapStateToProps(state) {
    return { currentTemplate: state.currentTemplate }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ generateTemplate }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveAndDownloadButton)