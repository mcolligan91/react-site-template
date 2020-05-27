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
        this.setState({ isOpen: true, formData: {...data} });
    }

    handleCloseModal = () => {
        this.setState({ isOpen: false });
    }

    handleSubmit = () => {
        const {formData} = this.state;
        this.props.handleSubmit(formData);
        this.handleCloseModal();
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
                        return field.type === 'input' ? (
                            <Form.Input key={i} fluid label={field.label} name={field.name} value={formData[field.name]} onChange={this.handleChange} />
                        ) : field.type === 'select' ? (
                            <Form.Select key={i} fluid label={field.label} name={field.name} value={formData[field.name]} options={field.options} onChange={this.handleChange} />
                        ) : field.type === 'textArea' ? (
                            <Form.TextArea key={i} label={field.label} name={field.name} value={formData[field.name]} options={field.options} onChange={this.handleChange} />
                        ) : field.type === 'radio' ? (
                            <Form.Group key={i} inline>
                                <label>{field.label}</label>
                                {field.options.map((option, j) => {
                                    return (
                                        <Form.Radio key={j} label={option} name={field.name} value={option} checked={formData[field.name] === option} onChange={this.handleChange} />
                                    )
                                })}
                            </Form.Group>
                        ) : (
                            null
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


