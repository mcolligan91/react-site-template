import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react';

import './confirmation-modal.scss';

class ConfirmationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            message: '',
            referenceId: null
        }
    }


    /*
	summary: opens modal and updates message and referenceId states with data from param

	params: data - contains message for display in modal and reference ID number value of whatever will be deleted

	returns: none
    */
    handleOpenModal = (data) => {
        this.setState({ isOpen: true, message: data.message, referenceId: data.id });
    }

    
    /*
	summary: updates isOpen state to false to close Contact Us modal

	params: none

	returns: none
    */
    handleCloseModal = () => {
        this.setState({ isOpen: false });
    }


    /*
	summary: passes referenceId state to parent component to trigger function that will delete data from the db, then closes the modal

	params: none

	returns: none
    */
    handleSubmit = () => {
        this.props.handleConfirm(this.state.referenceId);
        this.handleCloseModal();
    }

    render() {  
        const {isOpen, message} = this.state;

        return (
            <Modal className='contact-modal' open={isOpen} onClose={this.handleCloseModal} centered={false} closeIcon size='tiny'>
                <Modal.Content>
                    <strong>{message}</strong>
                </Modal.Content>
                <Modal.Actions>
                    <Button content='No' type='button' onClick={this.handleCloseModal} />
                    <Button className='main-button-color' onClick={this.handleSubmit} content='Yes' />
                </Modal.Actions>
            </Modal>
        );
    }
}

export default ConfirmationModal;


