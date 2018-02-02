import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Segment, Header, Label, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'
import { Collapse } from 'react-collapse'
import showdown from 'showdown'
import { Markup } from 'interweave'
import MediaQuery from 'react-responsive'
import ApiDiagram from '../ApiDiagram'
import { generateTemplate, deleteTemplate } from '../../../actions'
let converter = new showdown.Converter()
converter.setFlavor('github')

const TemplateRow = (props) => {
    if (!props.template) return ''
    let { name, resources } = props.template.template_object
    if (!resources) return ''
    return (
        <Grid.Row style={{color: '#000'}}>
            <Segment attached='top' color='orange' style={{ cursor: 'pointer' }} onClick={() => props.toggleRow(props.template.id)}>
                <Header size='large' floated='left'>
                    {name}
                </Header>
                <Header floated='right' sub style={{display: 'flex', flexDirection: 'column'}}>
                    <p>{`created ${moment(props.template.created_at).format('M/D/YY h:mm a')}`}</p>
                    <p>{`last updated ${moment(props.template.updated_at).format('M/D/YY h:mm a')}`}</p>
                </Header>
            </Segment>
            <Collapse style={{width: '100%'}} isOpened={props.expanded} springConfig={{stiffness: 300, damping: 30}}>
                <Segment attached>
                    <ApiDiagram apiObject={props.template.template_object}/>
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
                                resources.map((resource, i) => <Label key={i} style={{margin:'2px'}}>{resource.name}</Label>)
                            }
                        </Grid.Column>
                        <MediaQuery minWidth={1223}>
                            <Grid.Column width={8}>
                                    <Button icon positive onClick={()=>props.generate(props.template)} labelPosition='left' floated='right' style={{ marginRight: '15px', marginLeft: '0px' }}>
                                    <Icon size='large' name='download' />
                                    Download
                                </Button>
                                    <Button icon primary onClick={() => window.location.href=`/edit/${props.template.id}`} labelPosition='left' floated='right' style={{ marginRight: '12px', marginLeft: '0px' }}>
                                    <Icon size='large' name='edit' />
                                    Edit
                                </Button>
                                    <Button icon negative onClick={() => props.delete(props.template.id)} labelPosition='left' floated='right' style={{ marginRight: '12px', marginLeft: '0px' }}>
                                    <Icon size='large' name='trash outline' />
                                    Delete
                                </Button>
                            </Grid.Column>
                        </MediaQuery>
                        <MediaQuery maxWidth={1222}>
                            <Grid.Column width={8}>
                                    <Button icon positive onClick={()=>props.generate(props.template)} floated='right' style={{ marginRight: '15px', marginLeft: '0px' }}>
                                    <Icon size='large' name='download' />
                                </Button>
                                    <Button icon primary onClick={() => window.location.href=`/edit/${props.template.id}`} floated='right' style={{ marginRight: '12px', marginLeft: '0px' }}>
                                    <Icon size='large' name='edit' />
                                </Button>
                                    <Button icon negative onClick={() => props.delete(props.template.id)} floated='right' style={{ marginRight: '12px', marginLeft: '0px' }}>
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
                                resources.map((resource, i) => <Label key={i} style={{ margin: '2px' }}>{resource.name}</Label>)
                            }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <MediaQuery minWidth={500}>
                            <Grid.Column style={{ paddingLeft: '15px' }}>
                                <Button icon positive onClick={()=>props.generate(props.template)} floated='right' style={{ marginRight: '15px', marginLeft: '0px' }}>
                                    <Icon size='large' name='download' />
                                </Button>
                                    <Button icon primary onClick={() => window.location.href=`/edit/${props.template.id}`} floated='right' style={{ marginRight: '12px', marginLeft: '0px' }}>
                                    <Icon size='large' name='edit' />
                                </Button>
                                    <Button icon negative onClick={() => props.delete(props.template.id)} floated='right' style={{ marginRight: '12px', marginLeft: '0px' }}>
                                    <Icon size='large' name='trash outline' />
                                </Button>
                            </Grid.Column>
                        </MediaQuery>
                        <MediaQuery maxWidth={499}>
                            <Grid.Column textAlign={'center'} style={{marginLeft:'-7px', display:'flex', justifyContent: 'space-around'}}>
                                <Button icon negative onClick={() => props.delete(props.template.id)}>
                                    <Icon size='large' name='trash outline' />
                                </Button>
                                <Button icon primary onClick={() => window.location.href=`/edit/${props.template.id}`}>
                                    <Icon size='large' name='edit' />
                                </Button>
                                <Button icon positive onClick={() => props.generate(props.template)}>
                                    <Icon size='large' name='download' />
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

function mapStateToProps(state) {
    return { userTemplates: state.userTemplates, currentUser: state.currentUser }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ generate: generateTemplate, delete: deleteTemplate }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateRow)