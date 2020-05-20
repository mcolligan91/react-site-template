import React, { Component } from 'react';
import { Grid, Header, Divider, Button, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import SideNav from './../../Shared/SideNav/SideNav';
import InputForm from './../../Shared/InputForm/InputForm';
import ModuleTable from './../../Shared/ModuleTable/ModuleTable';

import './account.scss';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemMain: 'My Account',
            userData: null,
            passwordData: {currentPassword: '', newPassword: '', confirmedPassword: ''},
            orgData: null,
            adminData: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);

        //will load from ajax call
        setTimeout(() => {
            this.setState({ 
                userData: {firstName: 'Michael', lastName: 'Colligan', email: 'abc@gmail.com', phone: '(123) 456-7890', location: 'Washington, DC' },
                orgData: {address: '123 Main Street', phone: '(123) 456-7890', email: 'abc@gmail.com', website: 'example.com'},
                adminData: [{name: 'User A', email: 'example@gmail.com', phone: '(123) 456-7890'}, {name: 'User B', email: 'example@gmail.com', phone: '(123) 456-7890'}, {name: 'User C', email: 'example@gmail.com', phone: '(123) 456-7890'}]
            });
          }, 2000);
    }

    handleItemClickMain = (e, { name }) => {
        this.setState({ activeItemMain: name });
    }

    handleUpdateUserInformation = () => {
        debugger;
    }

    handleUpdatePasswordInformation = () => {
        debugger;
    }

    handleTableButtonClick = (button, data) => {
        debugger;
    }

  render() {
    const {activeItemMain, userData, passwordData, orgData, adminData} = this.state;

    //will be specific to site
    const mainSideNavInfo = [
        {name: 'My Account', iconName: 'user'},
        {name: 'Manage Users', iconName: 'users'},
        {name: 'Manage Organization', iconName: 'search'}
    ];

    const userInfo = {
        title: 'Password Information',
        submitFunction: this.handleUpdatePasswordInformation,
        buttonText: 'Update User Information',
        buttonIcon: 'user',
        inputs: [
            {label: 'First Name', placeholder: 'First Name', name: 'firstName'},
            {label: 'Last Name', placeholder: 'Last Name', name: 'lastName'},
            {label: 'Email Address', placeholder: 'Email Address', name: 'email'},
            {label: 'Phone Number', placeholder: 'Phone Number', name: 'phone'},
            {label: 'Location', placeholder: 'Location', name: 'location'}
        ]
    };

    const passwordInfo = {
        title: 'Update Password',
        submitFunction: this.handleUpdateUserInformation,
        buttonText: 'Update Password',
        buttonIcon: 'ellipsis horizontal',
        inputs: [
            {label: 'Current Password', placeholder: 'Current Password', name: 'currentPassword', type: 'password'},
            {label: 'Enter New Password', placeholder: 'Enter New Password', name: 'newPassword', type: 'password'},
            {label: 'Confirm New Password', placeholder: 'Confirm New Password', name: 'confirmedPassword', type: 'password'}
        ]
    };

    const orgInfo = {
        title: 'Organization Information',
        submitFunction: this.handleUpdateUserInformation,
        buttonText: 'Update Organization',
        buttonIcon: 'compass',
        inputs: [
            {label: 'Address', placeholder: 'Address', name: 'address'},
            {label: 'Phone Number', placeholder: 'Phone Number', name: 'phone'},
            {label: 'Email Address', placeholder: 'Email Address', name: 'email'},
            {label: 'Website', placeholder: 'Website', name: 'website'}
        ]
    };

    const adminTable = {
        title: 'Recent Activity',
        hasClickEvents: true,
        headers: [
                {text: 'Name'},
                {text: 'Email'},
                {text: 'Phone'},
                {text: 'Edit'},
                {text: 'Remove'}
            ],
        cellData: [
            {type: 'text', value: 'name'},
            {type: 'text', value: 'email'},
            {type: 'text', value: 'phone'},
            {type: 'clickItem', iconName: 'edit', cellFunction: 'editAdmin'},
            {type: 'clickItem', iconName: 'user delete', cellFunction: 'deleteAdmin'}
        ],
        button: {
            content: 'Add Admin',
            icon: 'add user'
        }
    };

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
                        <Grid.Row centered>
                            <Grid.Column width={8}>
                                <InputForm formInfo={passwordInfo} formData={passwordData} />
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
                    <Grid.Column >
                        <Grid stackable style={{ padding: '15px' }}>
                            <Grid.Column width={16}>
                                <Header as='h2'>Manage Organization</Header>
                                <Divider fitted />
                            </Grid.Column>
                            <Grid.Row className='org-form-container' centered>
                                <Grid.Column width={8}>
                                    <InputForm formInfo={orgInfo} formData={orgData} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered>
                                <Grid.Column width={8}>
                                    <ModuleTable tableInfo={adminTable} tableData={adminData} handleTableButtonClick={this.handleTableButtonClick} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                ) : (
                    null
                )}
            </Grid>
        </>
    );
  }
}

export default withRouter(Account);