import React, {Component} from 'react';
import { Header, Form, Icon, Button, Dimmer } from 'semantic-ui-react';
 
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
        console.log(data);
      }
    
    render() {
        const {isLoading, data} = this.state;
        const {formInfo} = this.props;

        return (
            <>
                <Header as='h3'>{formInfo.title}</Header>
                <Dimmer.Dimmable blurring dimmed={isLoading}>
                    <Dimmer active={isLoading} />
                    <Form onSubmit={this.handleSubmit}>
                    {formInfo.inputs.map((input, i) => {
                        return (
                            <Form.Input key={i} label={input.label} placeholder={input.placeholder} name={input.name} type={input.type} value={data[input.name] || ''} onChange={this.handleChange} /> 
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