import React, { Component } from 'react';
import { Grid, Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import ModalForm from './../ModalForm/ModalForm';

import './bottom-nav.scss'

class BottomNav extends Component {

	handleItemClicked = (data) => {
		if (data.name === 'Contact Us') {
			let formData = {name: '', email: '', message: ''};
			this.contactModal.handleOpenModal(formData);
		} else {
			this.props.history.push(data.url);
		}
	}

	handleSubmit = (e, data) => {
		//post ajax call with modal form data
		debugger;
	}

    render() {
        const bottomNavLinks = [
			{name: 'Terms and Conditions', content: 'Terms and Conditions', url: '/terms-and-conditions'},
			{name: 'Privacy Policy', content: 'Privacy Policy', url: '/privacy-policy'},
			{name: 'Contact Us', content: 'Contact Us'}
		];
		
		//will be specific to site
		let companyInfo = '© 2020 - D+R International';

		//for component ModalForm, prop modalInfo 
        const contactModalInfo = {
            title: 'Contact Us',
            fields: [
                {
					name: 'name', 
					label: 'Name', 
					placeholder: 'Name', 
					type: 'input',
					isRequired: true,
                    validations: null,
                    validationErrors: {
                        isDefaultRequiredValue: 'Please fill out this field.'
                    }
				},
                {
					name: 'email', 
					label: 'Email Address', 
					placeholder: 'Email Address', 
					type: 'input',
					isRequired: true,
                    validations: 'isEmail',
                    validationErrors: {
						isEmail: 'Please enter a valid email address.',
                        isDefaultRequiredValue: 'Please fill out this field.'
                    }
				},
                {
					name: 'phone', 
					label: 'Message', 
					placeholder: 'Message', 
					type: 'textArea',
					isRequired: true,
                    validations: null,
                    validationErrors: {
                        isDefaultRequiredValue: 'Please fill out this field.'
                    }
				}
            ]
        };

        const contactModal = (
			<ModalForm ref={(contactModal) => { this.contactModal = contactModal; }} modalInfo={contactModalInfo} handleSubmit={this.handleSubmit} />
		);

        return (
			<>
				{contactModal}
				<Menu className='main-nav main-background-color main-bottom-nav'>
					<Grid className='bottom-nav-container' columns={2} stackable>
						<Grid.Column computer={8} tablet={4} mobile={4} textAlign='left' verticalAlign='middle' floated='left'>
							<div className='company-info-container'>
								{companyInfo}
							</div>
						</Grid.Column>
						<Grid.Column className='bottom-nav-links-container' computer={8} tablet={12} mobile={12} textAlign='right' verticalAlign='middle' floated='right'>
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
			</>
        );
    }
}

export default withRouter(BottomNav);