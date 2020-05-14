import React, { Component } from 'react';
// import axios from 'axios';
import { Form, Button, Grid, Header, Icon, Menu, Segment } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom'


class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
      	<div className="login-container main-background-color">
			<Menu className='main-nav main-background-color' fixed='top' size='massive'>
				<div className='main-logo-container'>
					<img src='https://drintl.com/wp-content/uploads/2018/05/dr-footer.png' alt="D+R" height='50'></img>
				</div>
			</Menu>
			<Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh', paddingTop: 0 }}>
				<Grid.Column style={{ maxWidth: 450 }}>
					content
					</Grid.Column>
			</Grid>
			<Menu className='main-nav main-background-color bottom-nav' fixed='bottom' size='massive'>
				<Grid columns={2} style={{ width: '100%' }}>
					<Grid.Column textAlign='left' verticalAlign='middle' floated='left'>
						<div style={{ paddingLeft: '15px' }}>
							© 2020 - D+R International
						</div>
					</Grid.Column>
					<Grid.Column textAlign='right' verticalAlign='middle' floated='right'>
						<Grid columns={3}>
							<Grid.Column>
								<div as={Link} to={'/terms-and-conditions'}>
									<span className='bottom-nav-link'>Terms and Conditions</span>
								</div>
							</Grid.Column>
							<Grid.Column>
								<div as={Link} to={'/privacy-policy'}>
									<span className='bottom-nav-link'>Privacy Policy</span>
								</div>
							</Grid.Column>
							<Grid.Column>
								<div>
									<span className='bottom-nav-link'>Contact Us</span>
								</div>
							</Grid.Column>
						</Grid>
					</Grid.Column>
				</Grid>
			</Menu>
		</div>
      </>
    );
  }
}

export default withRouter(TermsAndConditions);