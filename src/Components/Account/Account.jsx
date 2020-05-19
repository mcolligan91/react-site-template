import React, { Component } from 'react';
import { Form, Button, Grid, Header, Icon, Menu, Table, Segment, Divider, Message, Label } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import SideNav from './../../Shared/SideNav/SideNav';
import InputForm from './../../Shared/InputForm/InputForm';

import './account.scss';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemMain: 'My Account',
            userData: [{firstName: 'Michael'}, {lastName: 'Colligan'}]
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
    }

    handleItemClickMain = (e, { name }) => {
        this.setState({ activeItemMain: name })
    }

    handleUpdateUserInformation = () => {
        debugger;
    }

  render() {
    const {activeItemMain, userData} = this.state;

    const mainSideNavInfo = [
        {name: 'My Account', iconName: 'user'},
        {name: 'Manage Users', iconName: 'users'},
        {name: 'Manage Organization', iconName: 'search'}
    ];

    const userInfo = {
        title: 'User Information',
        submitFunction: this.handleUpdateUserInformation,
        buttonText: 'Update User Information',
        buttonIcon: 'user',
        inputs: [
            {label: 'First Name', placeholder: 'First Name', name: 'firstName'},
            {label: 'Last Name', placeholder: 'Last Name', name: 'lastName'},
            {label: 'Email Address', placeholder: 'Email Address', name: 'email'},
            {label: 'Phone Number', placeholder: 'Phone Number', name: 'phone'},
            {label: 'Location', placeholder: 'Location', name: 'location'}
        ]
    }
        
    return (
        <>
            <SideNav menuInfo={mainSideNavInfo} activeItem={activeItemMain} handleItemClick={this.handleItemClickMain} />
            <Grid className='manage-data-content-container'>
                {activeItemMain === 'My Account' ? (
                    <>
                        <Grid.Row centered style={{margin: '45px 0 -45px 0'}}>
                            <Grid.Column width={8}>
                                <Header as='h2' style={{marginBottom: 0}}>My Account</Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column width={8}>
                                <InputForm formInfo={userInfo} formData={userData} />
                            </Grid.Column>
                        </Grid.Row>
                    </>
                ) : (
                    null
                )}
                {activeItemMain === 'Manage Users' ? (
                    <p>Manage Users</p>
                ) : (
                    null
                )}
                {activeItemMain === 'Manage Organization' ? (
                    <p>Manage Organization</p>
                ) : (
                    null
                )}
            </Grid>
        </>
    );
  }
}

export default withRouter(Account);