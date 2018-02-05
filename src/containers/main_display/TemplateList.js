import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Grid, Menu, Button } from 'semantic-ui-react'
import TemplateRow from './template_list/TemplateRow'
import SortBar from './template_list/SortBar'
import { getUserTemplates, updateCurrentUser } from '../../actions'
import _ from 'lodash'




class TemplateList extends Component {
    constructor (props) {
        super(props)

        this.state = {
            expandedTemplates: [],
            sortBy: 'created_at',
            filterBy: '',
            direction: 'DESC'
        }
    }

    changeSortKey = (newKey) => {
        this.setState(prev => ({...prev, sortBy: newKey}))
    }

    changeFilterString = (newString) => {
        this.setState(prev => ({...prev, filterBy: newString}))
    }

    changeDirection = () => {
        this.setState(prev => {
            let newDirection = prev.direction == 'ASC' ? 'DESC' : 'ASC'
            return {...prev, direction: newDirection}
        })
    }

    toggleRow (templateId) {
        if (this.state.expandedTemplates.includes(templateId)) {
            this.setState(prev => ({ ...prev, expandedTemplates: prev.expandedTemplates.filter(id => id != templateId)}))
        } else {
            this.setState(prev => ({ ...prev, expandedTemplates: [...prev.expandedTemplates, templateId] }))
        }
    }

    sortBy = (key, templateArray = this.props.userTemplates, direction = this.state.direction) => {
        let arr = [...templateArray]
        if (!arr.length) return []
        if (key === 'created_at') arr.sort((a,b) => {
            let aDate = new Date(a.template_object.created_at)
            let bDate = new Date(b.template_object.created_at)
            if (a > b) return 1
            if (a < b) return -1
            return 0
        })
        if (key ==='name') _.sortBy(arr, 'template_object.name')
        if (this.state.direction === 'ASC') arr.reverse()
        return arr
    }

    filterByName = (string = '', templateArray = this.state.sortedNFiltered) => {
        if (!string) return templateArray
        let arr = [...templateArray]
        arr = arr.filter(template => template.template_object.name.toLowerCase().includes(string.toLowerCase()))
        return arr
    }

    render () {
        let visibleTemplates = this.sortBy(this.state.sortBy, this.filterByName(this.state.filterBy, this.props.userTemplates), this.state.direction)
        console.log(this.props.userTemplates.slice().sort((a,b) => Date.parse(a.template_object.created_at) - Date.parse(b.template_object.created_at)))

        return (
            !this.props.currentUser.id ? <div style={{textAlign: 'center'}}>Please log-in to view your saved APIs</div> :
                !this.props.userTemplates.length ? <div style={{ textAlign: 'center' }}>Get started by <a href='/create' style={{ textDecoration: 'underline', color: '#fff'}}>creating an API</a> to save!</div> :
            <Grid container>
                <Grid.Row>
                    <Grid.Column width={16}>
                        {/* <Grid.Row>
                            <SortBar changeSortKey={this.changeSortKey} changeFilterString={this.changeFilterString} currentSortKey={this.state.sortBy} changeSortDirection={this.changeDirection}/>
                        </Grid.Row> */}
                        <Grid padded>
                            {visibleTemplates.map((template, i) => <TemplateRow key={i} toggleRow={this.toggleRow.bind(this)} template={template} expanded={this.state.expandedTemplates.includes(template.id)}/>)}
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