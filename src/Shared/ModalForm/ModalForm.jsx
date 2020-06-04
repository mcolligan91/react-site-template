import React, { Component } from 'react';
import { Modal, Header, Button, Label } from 'semantic-ui-react';
import { Form } from 'formsy-semantic-ui-react';

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

        const errorLabel = <Label color='red' pointing />;

        const errorLabelRadio = <Label color='red' pointing='left' />;

        return (
            <Modal as={Form} className='contact-modal' onValidSubmit={(e) => this.handleSubmit(e)} open={isOpen} onClose={this.handleCloseModal} centered={false} closeIcon size='tiny' closeOnDimmerClick={false} >
                <Header content={modalInfo.title} />
                <Modal.Content>
                    {modalInfo.fields.map((field, i) => {
                        const {type, label, placeholder, name, options, isRequired, validations, validationErrors} = field;
                        return type === 'input' ? (
                            <Form.Input 
                             key={i} 
                             fluid 
                             label={label} 
                             name={name} 
                             placeholder={placeholder} 
                             value={formData[name]} 
                             onChange={this.handleChange} 
                             required={isRequired}
                             validations={validations}
                             validationErrors={validationErrors}
                             errorLabel={errorLabel}
                            />
                        ) : type === 'select' ? (
                            <Form.Select 
                             key={i} 
                             fluid 
                             label={label} 
                             name={name} 
                             placeholder={placeholder} 
                             value={formData[name]} 
                             options={options} 
                             onChange={this.handleChange} 
                             required={isRequired}
                             validations={validations}
                             validationErrors={validationErrors}
                             errorLabel={errorLabel}
                            />
                        ) : type === 'textArea' ? (
                            <Form.TextArea 
                             key={i} 
                             label={label} 
                             name={name} 
                             placeholder={placeholder} 
                             value={formData[name]} 
                             options={options} 
                             onChange={this.handleChange} 
                             required={isRequired}
                             validations={validations}
                             validationErrors={validationErrors}
                             errorLabel={errorLabel}
                            />
                        ) : type === 'radio' ? (
                            <Form.RadioGroup 
                             key={i} 
                             inline
                             name={name} 
                             label={label}
                             required={isRequired}
                             validations={validations}
                             validationErrors={validationErrors}
                             errorLabel={errorLabelRadio}
                             onChange={this.handleChange}
                            >
                                {options.map((option, j) => {
                                    return (
                                        <Form.Radio 
                                         key={j} 
                                         name={name}
                                         label={option} 
                                         value={option} 
                                         checked={formData[name] === option} 
                                        />
                                    )
                                })}
                            </Form.RadioGroup>
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


