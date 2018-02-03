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
            templates: [],
            expandedTemplates: []
        }
    }

    async componentDidMount () {
        await this.props.updateUser()
        this.setState(prev => ({...prev, templates: this.props.userTemplates}))
    }

    toggleRow (templateId) {
        if (this.state.expandedTemplates.includes(templateId)) {
            this.setState(prev => ({ ...prev, expandedTemplates: prev.expandedTemplates.filter(id => id != templateId)}))
        } else {
            this.setState(prev => ({ ...prev, expandedTemplates: [...prev.expandedTemplates, templateId] }))
        }
    }

    sortBy (templateArray, key, direction) {
        let arr = [...templateArray]
        arr.sort((a,b) => a-b)
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
                        {this.state.templates.map((template, i) => <TemplateRow key={i} toggleRow={this.toggleRow.bind(this)}template={template} expanded={this.state.expandedTemplates.includes(template.id)}/>)}
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
    return bindActionCreators({ updateUser: updateCurrentUser, getTemplates: getUserTemplates }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateList)