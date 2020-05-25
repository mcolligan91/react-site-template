import React, { Component } from 'react';
import { Modal, Form, Header, Button } from 'semantic-ui-react';

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

    handleOpenModal = (data) => {
        this.setState({ isOpen: true, message: data.message, referenceId: data.id });
    }

    handleCloseModal = () => {
        this.setState({ isOpen: false });
    }

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
        )
    }
}

export default ConfirmationModal;


