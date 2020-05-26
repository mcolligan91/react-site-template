import React, {Component} from 'react';
import { Header, Form, Icon, Button, Dimmer, Loader } from 'semantic-ui-react';
 
import './input-form.scss';

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: {}
        }
    }

    componentDidMount = () => {
        const {formData} = this.props;
        if (formData !== null) {
            this.setState({ data: formData, isLoading: false });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.formData, isLoading: false });  
    }   

    handleChange = (e, { name, value }) => {
        const {data} = this.state;
        data[name] = value;
        this.setState({ data });
    }

    handleSubmit = () => {
        const {data} = this.state;
        this.props.formInfo.submitFunction(data);
      }
    
    render() {
        const {isLoading, data} = this.state;
        const {formInfo} = this.props;

        return (
            <>
                <Header as='h3'>{formInfo.title}</Header>
                <Dimmer.Dimmable blurring dimmed={isLoading}>
                    <Dimmer active={isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Form onSubmit={this.handleSubmit}>
                        {formInfo.fields.map((field, i) => {
                            return field.fieldType === 'input' ? (
                                    <Form.Input key={i} label={field.label} placeholder={field.placeholder} name={field.name} type={field.type} value={data[field.name] || ''} onChange={this.handleChange} /> 
                                ) : field.fieldType === 'dropdown' ? (
                                    <Form.Select key={i} label={field.label} placeholder={field.placeholder} name={field.name} options={field.options} value={data[field.name] || ''} onChange={this.handleChange}/>
                                ) : (
                                    null
                                )
                            })}
                        <Button className='main-button-color' fluid type='submit'>
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