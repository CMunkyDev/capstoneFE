import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

const TemplateRow = (props) => {
    if (props.expanded) {
        return (
            <Grid.Row>
            </Grid.Row>
        )
    } else {
        return (
            <Grid.Row>
            </Grid.Row>
        )
    }
}

export default TemplateRow