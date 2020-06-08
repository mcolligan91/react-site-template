import React, { Component } from 'react';
import { Modal, Message } from 'semantic-ui-react';

class ErrorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            errorMessage: null
        }
    }

    handleOpenModal = (errorResponse) => {
        this.setState({ isModalOpen: true, errorMessage: errorResponse });
    }

    handleCloseModal = () => {
        this.setState({ isModalOpen: false, errorMessage: null });
    }

    render() {
        const {isModalOpen, errorMessage} = this.state;
    
        return (
            <Modal size='small' centered={false} closeIcon open={isModalOpen} onClose={this.handleCloseModal}> 
                <Modal.Content>
                    <Message negative>
                        <Message.Header>An error has occurred:</Message.Header>
                        <p>{errorMessage}</p>
                    </Message>
                </Modal.Content>
            </Modal>
        );
    }
} 

export default ErrorModal;