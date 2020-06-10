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

    
    /*
	summary: opens modal and updates errorMessage state with data from param

	params: errorResponse - contains message for display in ErrorModal

	returns: none
    */
    handleOpenModal = (errorResponse) => {
        this.setState({ isModalOpen: true, errorMessage: errorResponse });
    }

        
    /*
	summary: updates isOpen state to false to close modal, clears errorMessage state

	params: none

	returns: none
    */
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