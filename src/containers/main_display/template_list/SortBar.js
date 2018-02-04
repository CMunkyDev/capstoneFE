import React, { Component } from 'react'
import { Segment, Button, Label, Header, Input, Grid } from 'semantic-ui-react'
import MediaQuery from 'react-responsive'

class SortBar extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <Segment style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Grid container>
                    <MediaQuery minWidth={650}>
                        <Grid.Row >
                            <Grid.Column width={16} style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button.Group fluid floated='left' style={{paddingRight: '15px'}}>
                                    <Button
                                        content='Name'
                                        onMouseEnter={(e) => e.target.textContent = 'Sort by Name'}
                                        onMouseLeave={(e) => e.target.textContent = 'Name'}
                                        onClick={() => this.props.currentSortKey == 'name' ? this.props.changeSortDirection() : this.props.changeSortKey('name')}
                                    >
                                    </Button>
                                    <Button.Or/>
                                    <Button
                                        content='Date'
                                        onMouseEnter={(e) => e.target.textContent = 'Sort by Date'}
                                        onMouseLeave={(e) => e.target.textContent = 'Date'}
                                        onClick={() => this.props.currentSortKey == 'created_at' ? this.props.changeSortDirection() : this.props.changeSortKey('created_at')}
                                    >
                                    </Button>
                                </Button.Group>
                                <Input placeholder='Filter...' onChange={e => this.props.changeFilterString(e.target.value)}>
                                </Input>
                            </Grid.Column>
                        </Grid.Row>
                    </MediaQuery>
                    <MediaQuery maxWidth={649}>
                        <Grid.Row>
                            <Grid.Column>
                                <Input fluid placeholder='Filter...'>
                                </Input>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column>
                                <Button.Group fluid>
                                    <Button
                                        content='Name'
                                    >
                                    </Button>
                                    <Button.Or />
                                    <Button
                                        content='Date'
                                    >
                                    </Button>
                                </Button.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </MediaQuery>
                </Grid>
            </Segment>
        )
    }
}

export default SortBar