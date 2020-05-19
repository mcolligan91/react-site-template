import React, {Component} from 'react';
import { Header, Grid, Form, Icon, Button } from 'semantic-ui-react';
 
import './input-form.scss';

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        const {formData} = this.props;
        this.setState({ data: formData });
    }

    // handleChange = (e, { name, value }) => {
    //     const {data} = this.state;
    //     this.setState({ [name]: value });
    // }

    handleSubmit = () => {
        const {data} = this.state;
        console.log(data);
      }
    
    render() {
        const {data} = this.state;
        const {formInfo} = this.props;

        return (
            <>
                <Header as='h3'>{formInfo.title}</Header>
                <Form onSubmit={this.handleSubmit}>
                    {formInfo.inputs.map((input, i) => {
                        debugger;
                        return (
                            <Form.Input key={i} label={input.label} placeholder={input.placeholder} name={input.name} /> 
                        )
                    })}
                    <Button fluid type='submit'>
                        <Icon name={formInfo.buttonIcon}></Icon>
                        {formInfo.buttonText}
                    </Button>
                </Form>
            </>
        )
    }
}

export default InputForm;