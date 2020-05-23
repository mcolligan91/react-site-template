import React, { Component } from 'react';
import { Grid, Header, Divider } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import SideNav from './../../Shared/SideNav/SideNav';
import InputForm from './../../Shared/InputForm/InputForm';
import ModuleTable from './../../Shared/ModuleTable/ModuleTable';
import InteractiveTableLayout from './../../Shared/InteractiveTableLayout/InteractiveTableLayout';

import './account.scss';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemMain: null,
            userData: null,
            passwordData: {currentPassword: '', newPassword: '', confirmedPassword: ''},
            orgData: null,
            adminData: [],
            userTableData: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        let activePage = 'My Account'
        if (this.props.history.location.state) {
            const {pathTarget} = this.props.history.location.state;
            activePage = pathTarget === undefined ? 'My Account' : pathTarget;
        }

        this.setState({ activeItemMain: activePage});
        
        //will load from ajax call
        setTimeout(() => {
            this.setState({ 
                userData: {firstName: 'Michael', lastName: 'Colligan', email: 'abc@gmail.com', phone: '(123) 456-7890', location: 'Washington, DC' },
                orgData: {address: '123 Main Street', phone: '(123) 456-7890', email: 'abc@gmail.com', website: 'example.com'},
                adminData: [{name: 'User A', email: 'example@gmail.com', phone: '(123) 456-7890'}, {name: 'User B', email: 'example@gmail.com', phone: '(123) 456-7890'}, {name: 'User C', email: 'example@gmail.com', phone: '(123) 456-7890'}],
                userTableData: [{name: 'User A', organization: 'Distributor A', email: 'example@gmail.com', role: 'Admin', lastLogin: '5/20/2020'}, {name: 'User A', organization: 'Distributor A', email: 'example@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{name: 'User A', organization: 'Distributor A', email: 'example@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{name: 'User A', organization: 'Distributor A', email: 'example@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{name: 'User A', organization: 'Distributor A', email: 'example@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{name: 'User A', organization: 'Distributor A', email: 'example@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{name: 'User A', organization: 'Distributor A', email: 'example@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{name: 'User A', organization: 'Distributor A', email: 'example@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{name: 'User A', organization: 'Distributor A', email: 'example@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{name: 'User A', organization: 'Distributor A', email: 'example@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{name: 'User A', organization: 'Distributor A', email: 'example@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{name: 'User A', organization: 'Distributor A', email: 'example@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{name: 'User A', organization: 'Distributor A', email: 'example@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{name: 'User A', organization: 'Distributor A', email: 'example@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{name: 'User A', organization: 'Distributor A', email: 'example@gmail.com', role: 'Admin', lastLogin: '5/20/2020'}]
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

    handleAdminTableButtonClick = (button, data) => {
        debugger;
    }

    handleAddUser = () => {
        debugger;
    }

    handleDownloadUsers = () => {
        debugger;
    }

    handleUserTableButtonClick = (button, data) => {
        debugger;
    }

    
    render() {
        const {activeItemMain, userData, passwordData, orgData, adminData, userTableData} = this.state;

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
            fields: [
                {fieldType: 'input', label: 'First Name', placeholder: 'First Name', name: 'firstName'},
                {fieldType: 'input', label: 'Last Name', placeholder: 'Last Name', name: 'lastName'},
                {fieldType: 'input', label: 'Email Address', placeholder: 'Email Address', name: 'email'},
                {fieldType: 'input', label: 'Phone Number', placeholder: 'Phone Number', name: 'phone'},
                {fieldType: 'input', label: 'Location', placeholder: 'Location', name: 'location'}
            ]
        };

        const passwordInfo = {
            title: 'Update Password',
            submitFunction: this.handleUpdateUserInformation,
            buttonText: 'Update Password',
            buttonIcon: 'ellipsis horizontal',
            fields: [
                {fieldType: 'input', label: 'Current Password', placeholder: 'Current Password', name: 'currentPassword', type: 'password'},
                {fieldType: 'input', label: 'Enter New Password', placeholder: 'Enter New Password', name: 'newPassword', type: 'password'},
                {fieldType: 'input', label: 'Confirm New Password', placeholder: 'Confirm New Password', name: 'confirmedPassword', type: 'password'}
            ]
        };

        const orgInfo = {
            title: 'Organization Information',
            submitFunction: this.handleUpdateUserInformation,
            buttonText: 'Update Organization',
            buttonIcon: 'compass',
            fields: [
                {fieldType: 'input', label: 'Address', placeholder: 'Address', name: 'address'},
                {fieldType: 'input', label: 'Phone Number', placeholder: 'Phone Number', name: 'phone'},
                {fieldType: 'input', label: 'Email Address', placeholder: 'Email Address', name: 'email'},
                {fieldType: 'input', label: 'Website', placeholder: 'Website', name: 'website'}
            ]
        };

        const adminTable = {
            title: 'Admin Users',
            hasClickEvents: true,
            headers: [
                    {text: 'Name'},
                    {text: 'Email'},
                    {text: 'Phone'},
                    {text: 'Edit', props: {textAlign: 'center'}},
                    {text: 'Remove', props: {textAlign: 'center'}}
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

        const usersPageInfo = {
            title: 'Manage Users',
            headerButtons: [
                {content: 'Add User', iconName: 'building', className: 'inner-button', clickFunction: this.handleAddUser},
                {content: 'Download', iconName: 'download', className: 'inner-button', clickFunction: this.handleDownloadUsers}
            ],
            pagingUnits: 'Users',
            tableInfo: {
                hasClickEvents: true,
                headers: [
                    {text: 'Name'},
                    {text: 'Organization'},
                    {text: 'Email'},
                    {text: 'Role'},
                    {text: 'Last Login'},
                    {text: 'Edit', props: {textAlign: 'center'}},
                    {text: 'Delete', props: {textAlign: 'center'}}
                ],
                cellData: [
                    {type: 'text', value: 'name'},
                    {type: 'text', value: 'organization'},
                    {type: 'text', value: 'email'},
                    {type: 'text', value: 'role'},
                    {type: 'text', value: 'lastLogin'},
                    {type: 'clickItem', iconName: 'edit', cellFunction: 'editUser'},
                    {type: 'clickItem', iconName: 'trash alternate', cellFunction: 'deleteUser'}
                ]
            }
        };

    return (
        <>
            <SideNav menuInfo={mainSideNavInfo} activeItem={activeItemMain} handleItemClick={this.handleItemClickMain} />
            <Grid className='manage-data-content-container'>
                {activeItemMain === 'My Account' ? (
                    <>
                        <Grid.Row className='my-account-header-container' centered>
                            <Grid.Column width={8}>
                                <Header as='h2' className='my-account-header'>My Account</Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className='my-account-form-container' centered>
                            <Grid.Column width={8}>
                                <InputForm formInfo={userInfo} formData={userData} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className='my-account-form-container' centered>
                            <Grid.Column width={8}>
                                <InputForm formInfo={passwordInfo} formData={passwordData} />
                            </Grid.Column>
                        </Grid.Row>
                    </>
                ) : (
                    null
                )}
                {activeItemMain === 'Manage Users' ? (
                    <InteractiveTableLayout pageInfo={usersPageInfo} tableContent={userTableData} handleTableButtonClick={this.handleUserTableButtonClick}/>
                ) : (
                    null
                )}
                {activeItemMain === 'Manage Organization' ? (
                    <Grid.Column >
                        <Grid className='manage-organization-container' stackable>
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
                                    <ModuleTable tableInfo={adminTable} tableData={adminData} handleTableButtonClick={this.handleAdminTableButtonClick} />
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