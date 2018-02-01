import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid, Menu, Button } from 'semantic-ui-react'
import TemplateRow from './template_list/TemplateRow'
import SortBar from './template_list/SortBar'
import { getUserTemplates, updateCurrentUser } from '../../actions'




class TemplateList extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            expandedTemplates: []
        }
    }
    componentDidMount () {
        this.props.updateCurrentUser()
        if (this.props.currentUser.id){
            this.props.getUserTemplates(this.props.currentUser.id)
        }
    }

    toggleRow (templateId) {
        if (this.state.expandedTemplates.includes(templateId)) {
            this.setState(prev => ({ ...prev, expandedTemplates: prev.expandedTemplates.filter(id => id != templateId)}))
        } else {
            this.setState(prev => ({ ...prev, expandedTemplates: [...prev.expandedTemplates, templateId] }))
        }
    }

    render () {
        return (
            <Grid container>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Grid.Row>
                            <SortBar />
                        </Grid.Row>
                        <Grid padded>
                        {this.props.userTemplates.map((template, i) => <TemplateRow key={i} toggleRow={this.toggleRow.bind(this)}template={template} expanded={this.state.expandedTemplates.includes(template.id)}/>)}
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return { userTemplates: state.userTemplates, currentUser: state.currentUser }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateCurrentUser, getUserTemplates }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateList)