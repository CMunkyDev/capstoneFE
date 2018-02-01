import React, { Component } from 'react'
import { Grid, Segment, Header, Label } from 'semantic-ui-react'
import moment from 'moment'

const TemplateRow = (props) => {
    if (!props.template) return ''
    let { name, resources } = props.template.template_object
    if (props.expanded) {
        return (
            <Grid.Row style={{ color: '#000' }} onClick>
                <Segment attached='top' >
                    <Header floated='left'>
                        {name}
                    </Header>
                    <Header floated='right' sub>
                        {`created ${moment(props.template.create_at).format('M/D/YY h:MM a')}`}
                    </Header>
                </Segment>
                <Segment>
                    EXPANDED LOL
                </Segment>
                <Segment attached='bottom' secondary vertical>
                    {'Resources:  '}
                    {
                        props.template.template_object.resources.map(resource => <Label>{resource.name}</Label>)
                    }
                </Segment>
            </Grid.Row>
        )
    } else {
        return (
            <Grid.Row style={{color: '#000'}}>
                <Segment attached='top' color='orange'>
                    <Header floated='left'>
                        {name}
                    </Header>
                    <Header floated='right' sub>
                        {`created ${moment(props.template.create_at).format('M/D/YY h:MM a')}`}
                    </Header>
                    
                    
                </Segment>
                <Segment attached='bottom' secondary vertical>
                    {'Resources:  '}
                    {
                        props.template.template_object.resources.map(resource => <Label>{resource.name}</Label>)
                    }
                </Segment>
            </Grid.Row>
        )
    }
}

export default TemplateRow