import React, { Component } from 'react'
import { Popup, Button, Header, Image, Modal } from 'semantic-ui-react'

class FirstTimeModal extends Component {
    constructor (props) {
        super(props)

        this.state = { open: !JSON.parse(localStorage.getItem('api_dev_info_read')) }
    }

    show = () => this.setState({ open: true })

    close = (forever) => {
        localStorage.setItem('api_dev_info_read', JSON.stringify(forever))
        this.setState({ open: false })
    }

    render() {
        const { open, dimmer } = this.state
        return (
            <div>
                <Modal dimmer open={open}>
                    <Modal.Header>Welcome to snAPI</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Header>What is snAPI?</Header>
                            <p>snAPI helps you create an <a href='https://en.wikipedia.org/wiki/Application_programming_interface' target='_blank'>API</a> for your next project in a snap!</p>
                            <p>snAPI will generate a .zip file with a working API server inside of it. The API files get generated based on your input here on snAPI.</p>
                            <p>Requirements:</p>
                            <ul>
                                <li><a href='https://nodejs.org/en/download/'>Node</a> will be what runs the API server</li>
                                {/* include helpful websites? http://blog.teamtreehouse.com/install-node-js-npm-windows */}
                                <li>That's it! as long as you have Node installed properly and can type in to your terminal, you are good to go.</li> 
                            </ul>
                            <p>STEPS:</p>
                            <ol>
                                <li>Decide on what <a href='http://restful-api-design.readthedocs.io/en/latest/resources.html' target='_blank'>resources</a> you'd like your API to represent.</li>
                                <li>Pick your <a href='' target='_blank'>routes</a> for those resources</li>
                                <li>Name your API</li>
                                <li>Download your new API, or save it to our database! (You must be logged in to an account to save APIs)</li>
                                <li>Unzip the downloaded file</li>
                                <li>
                                    Navigate to the newly created folder in the terminal and run these commands:
                                    <ol>
                                        <li><code>npm install</code></li>
                                        <li><code>npm start</code></li>
                                    </ol>
                                </li>
                            </ol>
                            <p>Your server will be ready to be used! See the readme in the created folder for details.</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => this.close(false)}>
                            I Want to See This Again
                        </Button>
                        <Button positive content="Once is Enough, Let's Get Started" onClick={() => this.close(true)} />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default FirstTimeModal
