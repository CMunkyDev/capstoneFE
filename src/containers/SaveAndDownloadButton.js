import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { generateTemplate, saveTemplate } from '../actions'
import { Button } from 'semantic-ui-react'

const SaveAndDownloadButton = ({ currentTemplate, generateTemplate, saveTemplate, templateMakerTemplate}) => {
    return currentTemplate.id ? <button onClick={() => generateTemplate(currentTemplate.id, currentTemplate.name)}>Download {`${currentTemplate.name}.zip`}</button> : ''
}

function mapStateToProps(state) {
    return { currentTemplate: state.currentTemplate }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ generateTemplate, saveTemplate }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveAndDownloadButton)