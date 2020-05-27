import React, { Component } from 'react';
// import axios from 'axios';
import { Grid, Menu, Modal, Header, Button, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'

import './bottom-nav.scss'

class BottomNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showContactModal: false,
			name: '',
			email: '', 
			message: ''
		}
	}

	handleItemClicked = (data) => {
		if (data.name === 'Contact Us') {
			this.handleShowModal();
		} else {
			this.props.history.push(data.url);
		}
	}

	handleShowModal = () => {
		this.setState({ showContactModal: true });
	}

	handleCloseModal = () => {
		this.setState({ showContactModal: false });
	}

	handleSubmit = (e) => {
		const {name, email, message} = this.state;
		debugger;
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value });
	}

    render() {
		const {showContactModal, name, email, message} = this.state;

        const bottomNavLinks = [
			{name: 'Terms and Conditions', content: 'Terms and Conditions', url: '/terms-and-conditions'},
			{name: 'Privacy Policy', content: 'Privacy Policy', url: '/privacy-policy'},
			{name: 'Contact Us', content: 'Contact Us'}
		];
		
		//will be specific to site
		let companyInfo = '© 2020 - D+R International';

        return (
        <>
            <Menu className='main-nav main-background-color main-bottom-nav' size='massive'>
                <Grid className='bottom-nav-container' columns={2} stackable doubling>
                    <Grid.Column textAlign='left' verticalAlign='middle' floated='left'>
                        <div className='company-info-container'>
                            {companyInfo}
                        </div>
                    </Grid.Column>
                    <Grid.Column textAlign='right' verticalAlign='middle' floated='right'>
                        <Grid columns={bottomNavLinks.length}>
							{bottomNavLinks.map((item, i) => {
								return (
									<Grid.Column key={i}>
										<div onClick={() => this.handleItemClicked(item)}>
											<span className='bottom-nav-link'>{item.content}</span>
										</div>
									</Grid.Column>
								)
							})}
                        </Grid>
                    </Grid.Column>
                </Grid>
            </Menu>


			{showContactModal ? (
				<Modal as={Form} className='contact-modal' onSubmit={(e) => this.handleSubmit(e)} open={showContactModal} onClose={this.handleCloseModal} centered={false} closeIcon size='tiny'>
					<Header content='Contact Us' />
					<Modal.Content>
						<Form.Input fluid label='Name' name='name' value={name} onChange={this.handleChange} />
						<Form.Input fluid label='Email' name='email' value={email} onChange={this.handleChange} />
						<Form.TextArea label='Message' name='message' value={message} onChange={this.handleChange} />
					</Modal.Content>
					<Modal.Actions>
						<Button className='main-button-color' type='submit' content='Submit' />
					</Modal.Actions>
				</Modal>
			) : (
				null
			)}
        </>
        );
    }
}

export default withRouter(BottomNav);