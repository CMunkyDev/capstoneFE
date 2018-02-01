import React, { Component } from 'react'
import { Segment, Button, Label, Header, Input, Grid } from 'semantic-ui-react'
import MediaQuery from 'react-responsive'

class SortBar extends Component {
    constructor (props) {
        super(props)

        this.state = {
            sortedBy: 'time'

        }
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
                                    >
                                    </Button>
                                    <Button.Or/>
                                    <Button
                                        content='Date'
                                        onMouseEnter={(e) => e.target.textContent = 'Sort by Date'}
                                        onMouseLeave={(e) => e.target.textContent = 'Date'}
                                    >
                                    </Button>
                                </Button.Group>
                                <Input placeholder='Filter...'>
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