import React, { Component } from 'react';
// import axios from 'axios';
import { Grid, Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import ModalForm from './../ModalForm/ModalForm';

import './bottom-nav.scss'

class BottomNav extends Component {
	constructor(props) {
		super(props);
	}

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
                {name: 'name', label: 'Name', type: 'input'},
                {name: 'email', label: 'Email Address', type: 'input'},
                {name: 'phone', label: 'Message', type: 'textArea'}
            ]
        };

        const contactModal = <ModalForm ref={(contactModal) => { this.contactModal = contactModal; }} modalInfo={contactModalInfo} handleSubmit={this.handleSubmit} />;

        return (
			<>
				{contactModal}
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
			</>
        );
    }
}

export default withRouter(BottomNav);