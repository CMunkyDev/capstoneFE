import React from 'react'
import { List } from 'semantic-ui-react'

const ApiDiagram = ({template}) => {

    let routeNameConverter = {
        show: 'Get One',
        index: 'Get All',
        create: 'Create',
        update: 'Update',
        delete: 'Delete'
    }

    function routes (resource) {
        let jsx = <List.List style={{paddingTop: '3px'}}>
            {
                resource.routes.map(route => {
                    return (
                        <List.Item key={`${resource.name}_${route.name}`} style={{padding: '0px'}}>
                            <List.Icon name='level up' rotated='clockwise' style={{float: 'left', paddingLeft: '4px'}}/>
                            <List.Content>
                                <List.Header>{routeNameConverter[route.name]}</List.Header>
                                <List.Description style={{ fontSize: '0.8rem' }}>{`${route.method} route`}</List.Description>
                            </List.Content>
                        </List.Item>
                    )
                })
            }
        </List.List>
        return jsx
    }

    function resources (templateObject) {
        let jsx = <List.List style={{ paddingTop: '3px' }}>
            {
                templateObject.resources.map(resource => {
                    return (
                        <List.Item key={`${templateObject.name}_${resource.name}`} style={{padding: '0px'}}>
                            <List.Icon name='level up' rotated='clockwise' style={{float: 'left', paddingLeft: '4px'}}/>
                            <List.Content>
                                <List.Header>{resource.name}</List.Header>
                                <List.Description style={{ fontSize: '0.8rem' }}>resource</List.Description>
                                {routes(resource)}
                            </List.Content>
                        </List.Item>
                    )
                })
            }
        </List.List>
        
        return jsx
    }

    return (
        <List style={{color: '#000'}}>
            <List.Item style={{padding: '0px'}}>
                <List.Header>{template.name}</List.Header>
                <List.Description style={{fontSize: '0.8rem'}}>API name</List.Description>
                <List.Content>
                    <List.Item style={{padding: '0px'}}>
                        <List.Content>
                            {resources(template)}
                        </List.Content>
                    </List.Item>
                </List.Content>
            </List.Item>
        </List>
    )
}

//level-up rotated

export default ApiDiagram