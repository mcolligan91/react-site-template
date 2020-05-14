import React, { Component } from 'react';
// import axios from 'axios';
import { Form, Button, Grid, Header, Icon, Menu, Segment } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom'

import './login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      password: '', 
      email: '', 
      submittedPassword: '', 
      submittedEmail: ''
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    // const { email, password } = this.state
    // let me = this;

    //   axios.post('/login', {
    //     email,
    //     password
    //   })
    //   .then(function (response) {
    //     let respData = response.data;
    //     //perform login
    //     //redirect to homepage
    //     me.props.history.push(localStorage.getItem('homeUrl'));
    //   })
    //   .catch(function (error) {
    //     let msg = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message;
    //     me.errorModal.handleOpenModal(msg);
	//   });


	this.props.history.push('/home');
  }

  render() {
    const {email, password} = this.state;

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
					<Form size='large'>
						<Segment padded>
							<Header className='login-header-text' as='h2' textAlign='left'>
								Please log in to continue
								</Header>
								<Grid>
									<Grid.Column>
										<Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name='email' value={email} onChange={this.handleChange}/>
										<Form.Input
										fluid
										icon='lock'
										iconPosition='left'
										placeholder='Password'
										type='password'
										name='password'
										value={password}
										onChange={this.handleChange}
										/>
										<Button className="login-button-bg main-secondary-blue" fluid size='large' onClick={this.handleSubmit}>
											<Icon className='login-icon' name='sign-in'></Icon>
											Login
										</Button>
									</Grid.Column>
								</Grid>
							</Segment>
						</Form>
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
								<div onClick={() => this.props.history.push('/terms-and-conditions')}>
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

export default withRouter(Login);