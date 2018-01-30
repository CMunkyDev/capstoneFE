import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid, Menu, Button } from 'semantic-ui-react'
import TemplateRow from './template_list/TemplateRow'
import SortBar from './template_list/SortBar'




class TemplateList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            expandedTemplates: []
        }
    }

    expandRow (templateId) {
        this.setState(prev => ({...prev, expandedTemplates: [...prev.expandedTemplates, templateId]}))
    }

    render () {
        return (
            <Grid container>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <Grid.Row>
                            <SortBar />
                        </Grid.Row>
                        {Array(90).fill(<TemplateRow expanded={false}/>)}
                    </Grid.Column>
                    <Grid.Column width={4}>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return { currentUser: state.currentUser }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateList)