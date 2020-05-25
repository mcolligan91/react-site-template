import React, { Component } from 'react';
import { Modal, Form, Header, Button } from 'semantic-ui-react';

import './modal-form.scss';

class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            formData: {}
        }
    }

    handleOpenModal = (data) => {
        this.setState({ isOpen: true, formData: data });
    }

    handleCloseModal = () => {
        this.setState({ isOpen: false });
    }

    handleSubmit = () => {
        debugger;
    }

    
    handleChange = (e, { name, value }) => {
        const {formData} = this.state;
        formData[name] = value;
        this.setState({ formData });
    }


    render() {  
        const {isOpen, formData} = this.state;
        const {modalInfo} = this.props;

        return (
            <Modal as={Form} className='contact-modal' onSubmit={(e) => this.handleSubmit(e)} open={isOpen} onClose={this.handleCloseModal} centered={false} closeIcon size='tiny'>
                <Header content={modalInfo.title} />
                <Modal.Content>
                    {modalInfo.fields.map((field, i) => {
                        return (
                            <Form.Input key={i} fluid label={field.label} name={field.name} value={formData[field.name]} onChange={this.handleChange} />
                        )
                    })}
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Cancel' type='button' onClick={this.handleCloseModal} />
                    <Button className='main-button-color' type='submit' content='Submit' />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ModalForm;


