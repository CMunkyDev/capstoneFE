import React, { Component } from 'react'
import { Grid, Segment, Header, Label, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'
import { Collapse } from 'react-collapse'
import showdown from 'showdown'
import { Markup } from 'interweave'
import MediaQuery from 'react-responsive'
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
                    {`created ${moment(props.template.created_at).format('M/D/YY h:mm a')}`}
                </Header>
            </Segment>
            <Collapse style={{width: '100%'}} isOpened={props.expanded} springConfig={{stiffness: 300, damping: 30}}>
                <Segment attached>
                    <Markup content={converter.makeHtml(props.template.md_description)}/>
                </Segment>
            </Collapse>
            <Segment attached='bottom' secondary vertical style={{paddingLeft: '15px'}}textAlign='left'>
            <Grid>
                <MediaQuery minWidth={650}>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            {'Resources:  '}
                            {
                                props.template.template_object.resources.map((resource, i) => <Label key={i} style={{margin:'2px'}}>{resource.name}</Label>)
                            }
                        </Grid.Column>
                        <MediaQuery minWidth={1223}>
                            <Grid.Column width={8}>
                                    <Button icon positive labelPosition='left' floated='right' style={{ marginRight: '15px', marginLeft: '0px' }}>
                                    <Icon size='large' name='download' />
                                    Download
                                </Button>
                                    <Button icon primary labelPosition='left' floated='right' style={{ marginRight: '12px', marginLeft: '0px' }}>
                                    <Icon size='large' name='edit' />
                                    Edit
                                </Button>
                                    <Button icon negative labelPosition='left' floated='right' style={{ marginRight: '12px', marginLeft: '0px' }}>
                                    <Icon size='large' name='trash outline' />
                                    Delete
                                </Button>
                            </Grid.Column>
                        </MediaQuery>
                        <MediaQuery maxWidth={1222}>
                            <Grid.Column width={8}>
                                    <Button icon positive floated='right' style={{ marginRight: '15px', marginLeft: '0px' }}>
                                    <Icon size='large' name='download' />
                                </Button>
                                    <Button icon primary floated='right' style={{ marginRight: '12px', marginLeft: '0px' }}>
                                    <Icon size='large' name='edit' />
                                </Button>
                                    <Button icon negative floated='right' style={{ marginRight: '12px', marginLeft: '0px' }}>
                                    <Icon size='large' name='trash outline' />
                                </Button>
                            </Grid.Column>
                        </MediaQuery>
                    </Grid.Row>
                </MediaQuery>
                <MediaQuery maxWidth={649}>
                    <Grid.Row>
                        <Grid.Column style={{ paddingLeft: '15px' }}>
                            {'Resources:  '}
                            {
                                props.template.template_object.resources.map((resource, i) => <Label key={i} style={{ margin: '2px' }}>{resource.name}</Label>)
                            }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <MediaQuery minWidth={500}>
                            <Grid.Column style={{ paddingLeft: '15px' }}>
                                <Button icon positive floated='right' style={{ marginRight: '15px', marginLeft: '0px' }}>
                                    <Icon size='large' name='download' />
                                </Button>
                                    <Button icon primary floated='right' style={{ marginRight: '12px', marginLeft: '0px' }}>
                                    <Icon size='large' name='edit' />
                                </Button>
                                    <Button icon negative floated='right' style={{ marginRight: '12px', marginLeft: '0px' }}>
                                    <Icon size='large' name='trash outline' />
                                </Button>
                            </Grid.Column>
                        </MediaQuery>
                        <MediaQuery maxWidth={499}>
                            <Grid.Column textAlign={'center'} style={{marginLeft:'-7px', display:'flex', justifyContent: 'space-around'}}>
                                <Button icon positive>
                                    <Icon size='large' name='download' />
                                </Button>
                                <Button icon primary>
                                    <Icon size='large' name='edit' />
                                </Button>
                                <Button icon negative>
                                    <Icon size='large' name='trash outline' />
                                </Button>
                            </Grid.Column>
                        </MediaQuery>
                    </Grid.Row>
                </MediaQuery>
            </Grid>
            </Segment>
        </Grid.Row>
    )
}

export default TemplateRow