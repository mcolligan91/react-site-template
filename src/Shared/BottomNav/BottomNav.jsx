import React, { Component } from 'react';
// import axios from 'axios';
import { Form, Button, Grid, Header, Icon, Menu, Segment } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom'

import './bottom-nav.scss'

class BottomNav extends Component {
	constructor(props) {
		super(props);
	}

	handleItemClicked = (data) => {
		if (data.name === 'Contact Us') {
			this.handleContactUsModal();
		} else {
			this.props.history.push(data.url);
		}
	}

	handleContactUsModal = () => {
		alert('contact modal');
	}

    render() {

        const bottomNavLinks = [
			{name: 'Terms and Conditions', content: 'Terms and Conditions', url: '/terms-and-conditions'},
			{name: 'Privacy Policy', content: 'Privacy Policy', url: '/terms-and-conditions'},
			{name: 'Contact Us', content: 'Contact Us'}
		];
		
		const companyInfo = '© 2020 - D+R International';

        return (
        <>
            <Menu className='main-nav main-background-color main-bottom-nav' size='massive'>
                <Grid className='bottom-nav-container' columns={2}>
                    <Grid.Column textAlign='left' verticalAlign='middle' floated='left'>
                        <div style={{ paddingLeft: '15px' }}>
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