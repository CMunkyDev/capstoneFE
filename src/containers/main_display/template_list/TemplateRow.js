import React, { Component } from 'react'
import { Grid, Segment, Header, Label, Button } from 'semantic-ui-react'
import moment from 'moment'
import { Collapse } from 'react-collapse'
import showdown from 'showdown'
import { Markup } from 'interweave'
let converter = new showdown.Converter()
converter.setFlavor('github')

const TemplateRow = (props) => {
    if (!props.template) return ''
    let { name, resources } = props.template.template_object
    return (
        <Grid.Row style={{color: '#000'}}>
            <Segment attached='top' color='orange' style={{ cursor: 'pointer' }} onClick={() => props.toggleRow(props.template.id)}>
                <Header floated='left'>
                    {name}
                </Header>
                <Header floated='right' sub>
                    {`created ${moment(props.template.create_at).format('M/D/YY h:MM a')}`}
                </Header>
            </Segment>
            <Collapse style={{width: '100%'}} isOpened={props.expanded} springConfig={{stiffness: 300, damping: 30}}>
                <Segment attached>
                    <Markup content={converter.makeHtml(props.template.md_description)}/>
                </Segment>
            </Collapse>
            <Segment attached='bottom' secondary vertical>
                {'Resources:  '}
                {
                    props.template.template_object.resources.map(resource => <Label>{resource.name}</Label>)
                }
                <Button.Group floated='right'>
                    <Button primary>
                        Download
                    </Button>
                </Button.Group>
            </Segment>
        </Grid.Row>
    )
}

export default TemplateRow