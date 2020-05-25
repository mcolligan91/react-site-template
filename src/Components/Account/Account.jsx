import React, { Component } from 'react';
import { Grid, Header, Divider } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import SideNav from './../../Shared/SideNav/SideNav';
import InputForm from './../../Shared/InputForm/InputForm';
import ModuleTable from './../../Shared/ModuleTable/ModuleTable';
import InteractiveTableLayout from './../../Shared/InteractiveTableLayout/InteractiveTableLayout';
import ModalForm from './../../Shared/ModalForm/ModalForm';

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
                userData: {
                    firstName: 'Michael', 
                    lastName: 'Colligan', 
                    email: 'abc@gmail.com', 
                    phone: '(123) 456-7890', 
                    location: 'Washington, DC' 
                },
                orgData: {
                    address: '123 Main Street', 
                    phone: '(123) 456-7890', 
                    email: 'abc@gmail.com', 
                    website: 'example.com'
                },
                adminData: [
                    {name: 'User A', email: 'example@gmail.com', phone: '(123) 456-7890'}, 
                    {name: 'User B', email: 'example@gmail.com', phone: '(123) 456-7890'}, 
                    {name: 'User C', email: 'example@gmail.com', phone: '(123) 456-7890'}
                ],
                userTableData: [
                    {id: 1, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'}, {id: 2, name: 'User B', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 3, name: 'User C', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 4, name: 'User D', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 5, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 6, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 7, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 8, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 9, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 10, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 11, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 12, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 13, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 14, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 15, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'}
                ]
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
        if (button === 'editUser') {
            this.handleOpenEditModal(data);
        }
    }

    handleOpenEditModal = (data) => {
        this.editModal.handleOpenModal(data);
    }

    handleEditUser = (data) => {
        //would fire ajax call and update state based on response, instead of 'data' param

        this.setState((prevState) => {
            let newData = prevState.userTableData;
            let user = newData.find(d => d.id === data.id);
            Object.assign(user, data);
            return {userTableData: newData};
        });
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
                    {type: 'text', value: 'name', isEditable: true, fieldType: 'input'},
                    {type: 'text', value: 'organization', isEditable: true, fieldType: 'select'},
                    {type: 'text', value: 'email', isEditable: true, fieldType: 'input'},
                    {type: 'text', value: 'role', isEditable: true, fieldType: 'select'},
                    {type: 'text', value: 'lastLogin'},
                    {type: 'clickItem', iconName: 'edit', cellFunction: 'editUser'},
                    {type: 'clickItem', iconName: 'trash alternate', cellFunction: 'deleteUser'}
                ]
            }
        };

        //placeholder, will be retrieved from database
        let orgs = [
            {key: 'Distributor A', value: 'Distributor A', text: 'Distributor A'},
            {key: 'Distributor B', value: 'Distributor B', text: 'Distributor B'},
            {key: 'Distributor C', value: 'Distributor C', text: 'Distributor C'}
        ];

        //placeholder, will be retrieved from database
        let roles = [
            {key: 'Admin', value: 'Admin', text: 'Admin'},
            {key: 'Site Admin', value: 'Site Admin', text: 'Site Admin'},
            {key: 'Data Analyst', value: 'Data Analyst', text: 'Data Analyst'}
        ];

        const editModalInfo = {
            title: 'Edit User',
            fields: [
                {name: 'name', label: 'Name', type: 'input'},
                {name: 'organization', label: 'Organization', type: 'select', options: orgs},
                {name: 'email', label: 'Email Address', type: 'input'},
                {name: 'role', label: 'Role', type: 'select', options: roles}
            ]
        };

        const editModal = <ModalForm ref={(editModal) => { this.editModal = editModal; }} modalInfo={editModalInfo} handleSubmit={this.handleEditUser} />;

    return (
        <>
            {editModal}
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
                    <InteractiveTableLayout pageInfo={usersPageInfo} tableContent={userTableData} tableRowClickFunction={this.handleUserTableButtonClick}/>
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