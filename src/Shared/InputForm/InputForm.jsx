import React, {Component} from 'react';
import { Header, Icon, Button, Dimmer, Loader, Label } from 'semantic-ui-react';
import { Form } from 'formsy-semantic-ui-react';
 
import './input-form.scss';

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }    


    /*
	summary: updates data state with formData prop that populates each form field

	params: none

	returns: none
    */
    componentDidMount = () => {
        const {formData} = this.props;
        
        if (formData) {
            this.setState({ data: {...formData} });
        }
    }


    /*
	summary: updates data state with formData prop from parent component

	params: nextProps - props passed from parent component after parent api call completes and parent state is updated

	returns: none
    */
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.isLoading) {
            this.setState({ data: {...nextProps.formData} });
        }
    } 

    
    /*
	summary: updates data state for changed field when user changes any form input data

	params: e - click event data; {name, value} - name and value from clicked div 

	returns: none
    */
    handleChange = (e, { name, value }) => {
        const {data} = this.state;
        data[name] = value;
        this.setState({ data });
    }


    /*
	summary: passes data state to parent component submit function

	params: none

	returns: none
    */
    handleSubmit = () => {
        const {data} = this.state;
        this.props.formInfo.submitFunction(data);
    }
    
    render() {
        const {data} = this.state;
        const {formInfo, isLoading} = this.props;

        const errorLabel = <Label color='red' pointing />;
        
        return (
            <>
                <Header as='h3'>{formInfo.title}</Header>
                <Dimmer.Dimmable blurring dimmed={isLoading}>
                    <Dimmer active={isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Form className='main-form' onValidSubmit={this.handleSubmit}>
                        {formInfo.fields.map((field, i) => {
                            const {fieldType, label, placeholder, name, type, isRequired, validations, validationErrors, options} = field;

                            return fieldType === 'input' ? (
                                <Form.Input
                                    key={i} 
                                    label={label} 
                                    placeholder={placeholder} 
                                    name={name} 
                                    type={type} 
                                    value={data[name] || ''} 
                                    onChange={this.handleChange} 
                                    required={isRequired}
                                    validations={validations}
                                    validationErrors={validationErrors}
                                    instantValidation={false}
                                    errorLabel={errorLabel}
                                /> 
                            ) : fieldType === 'dropdown' ? (
                                <Form.Select 
                                    key={i} 
                                    label={label} 
                                    placeholder={placeholder} 
                                    name={name} 
                                    options={options} 
                                    value={data[name] || ''}
                                    onChange={this.handleChange}
                                    required={isRequired}
                                    validations={validations}
                                    validationErrors={validationErrors}
                                    errorLabel={errorLabel}
                                />
                            ) : (
                                null
                            )
                        })}
                        <Button className='main-button-color input-form-button' fluid type='submit'>
                            <Icon name={formInfo.buttonIcon}></Icon>
                            {formInfo.buttonText}
                        </Button>
                    </Form>
                </Dimmer.Dimmable>
            </>
        )
    }
}

export default InputForm;