import React, { Component } from 'react';
import { Grid, Header, Divider } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import SideNav from './../../Shared/SideNav/SideNav';
import InputForm from './../../Shared/InputForm/InputForm';
import ModuleTable from './../../Shared/ModuleTable/ModuleTable';
import InteractiveTableLayout from './../../Shared/InteractiveTableLayout/InteractiveTableLayout';
import ModalForm from './../../Shared/ModalForm/ModalForm';
import ConfirmationModal from './../../Shared/ConfirmationModal/ConfirmationModal';

import './account.scss';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemMain: null,
            userData: null,
            passwordData: null,
            orgData: null,
            adminTableData: [],
            userTableData: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        let activePageIndex = 0
        if (this.props.history.location.state) {
            const {index} = this.props.history.location.state;
            activePageIndex = index === undefined ? 0 : index;
        }

        //for component SideNav, prop activeItem (activeItemMain)
        //for component InputForm, prop formData (passwordData)
        this.setState({ activeItemMain: activePageIndex, passwordData: {currentPassword: '', newPassword: '', confirmedPassword: ''}});
        this.loadSubPageData(activePageIndex);
    }

    componentWillReceiveProps = (nextProps) => {
        const {index} = nextProps.location.state;
        this.setState({ activeItemMain: index });
        this.loadSubPageData(index);
    }

    //for component SideNav, prop handleItemClick
    handleItemClickMain = (e, { index }) => {
        this.loadSubPageData(index);
        this.setState({ activeItemMain: index });
    }

    loadSubPageData = (index) => {
        //will load from ajax call
        setTimeout(() => {
            switch (index) {
                case 0:
                    //for component InputForm, formData (userData)
                    this.setState({ 
                        userData: {
                            firstName: 'Michael', 
                            lastName: 'Colligan', 
                            email: 'abc@gmail.com', 
                            phone: '(123) 456-7890', 
                            location: 'Washington, DC' 
                        }
                    })
                    break;
    
                case 1:
                    //for component InteractiveTableLayout, tableData (userTableData)
                    this.setState({
                        userTableData: [
                            {id: 1, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'}, {id: 2, name: 'User B', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 3, name: 'User C', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 4, name: 'User D', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 5, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 6, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 7, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 8, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 9, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 10, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 11, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 12, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 13, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 14, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 15, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'}
                        ]
                    });
                    break;
    
                case 2:
                    //for component InputForm, formData (orgData)
                    //for component ModuleTable, tableData (adminTableData)
                    this.setState({
                        orgData: {
                            address: '123 Main Street', 
                            phone: '(123) 456-7890', 
                            email: 'abc@gmail.com', 
                            website: 'example.com'
                        },
                        adminTableData: [
                            {id: 1, name: 'User A', email: 'example@gmail.com', phone: '(123) 456-7890'}, 
                            {id: 2, name: 'User B', email: 'example@gmail.com', phone: '(123) 456-7890'}, 
                            {id: 3, name: 'User C', email: 'example@gmail.com', phone: '(123) 456-7890'}
                        ]
                    });
                    break;
    
                default:
                    //error
            }
        }, 1000);
    }

    //for component ModuleTable, prop handleTableButtonClick 
    handleAdminTableButtonClick = (button, data) => {
        if (button === 'editAdmin') {
            this.editAdminModal.handleOpenModal(data);
        } else if (button === 'deleteAdmin') {
            let modalData = {
                id: data.id,
                message: 'Are you sure you want to delete this Admin user?'
            };
            this.confirmDeleteAdminModal.handleOpenModal(modalData);
        }
    }

    //for component InteractiveTableLayout, prop tableRowClickFunction 
    handleUserTableButtonClick = (button, data) => {        
        if (button === 'editUser') {
            this.editUserModal.handleOpenModal(data);
        } else if (button === 'deleteUser') {
            let modalData = {
                id: data.id,
                message: 'Are you sure you want to delete this user?'
            };
            this.confirmDeleteUserModal.handleOpenModal(modalData);
        }
    }

    //for component ModuleTable, prop buttonClickFunction
    handleAddAdminButtonClick = () => {
        let formData = {name: '', email: '', phone: ''};
        this.addAdminModal.handleOpenModal(formData);
    }

    handleAddUserButtonClick = () => {
        let formData = {name: '', organization: '', email: '', role: ''};
        this.addUserModal.handleOpenModal(formData);
    }

    handleEditUser = (data) => {
        //would fire ajax call and update state based on response, instead of 'data' param

        this.setState((prevState) => {
            let newData = prevState.userTableData,
                user = newData.find(d => d.id === data.id);
            Object.assign(user, data);
            return {userTableData: newData};
        });
    }

    handleEditAdmin = (data) => {
        //would fire ajax call and update state based on response, instead of 'data' param

        this.setState((prevState) => {
            let newData = prevState.adminTableData,
                user = newData.find(d => d.id === data.id);
            Object.assign(user, data);
            return {adminTableData: newData};
        });
    }

    handleDeleteUser = (id) => {
        //would fire ajax call and update state based on response, instead of 'id' param
        
        this.setState((prevState) => ({
            userTableData: prevState.userTableData.filter(user => user.id !== id)
        }));
    }

    handleDeleteAdmin = (id) => {
        //would fire ajax call and update state based on response, instead of 'id' param
        
        this.setState((prevState) => ({
            adminTableData: prevState.adminTableData.filter(user => user.id !== id)
        }));
    }

    handleAddUser = (data) => {
        //would fire ajax call and update state based on response, instead of 'data' param

        let newUser = {id: 16, name: data.name, organization: data.organization, email: data.email, role: data.role, lastLogin: '5/25/2020'};
        this.setState((prevState) => ({
            userTableData: [newUser, ...prevState.userTableData]
        }));
    }

    handleAddAdmin = (data) => {
        //would fire ajax call and update state based on response, instead of 'data' param

        let newUser = {id: 4, name: data.name, email: data.email, phone: data.phone};
        this.setState((prevState) => ({
            adminTableData: [newUser, ...prevState.adminTableData]
        }));
    }

    handleUpdateUserInformation = () => {
        debugger;
    }

    handleUpdatePasswordInformation = () => {
        debugger;
    }

    handleDownloadUsers = () => {
        debugger;
    }
    
    render() {
        const {activeItemMain, userData, passwordData, orgData, adminTableData, userTableData} = this.state;

        //for component SideNav, prop menuInfo
        const mainSideNavInfo = [
            {index: 0, name: 'My Account', iconName: 'user'},
            {index: 1, name: 'Manage Users', iconName: 'users'},
            {index: 2, name: 'Manage Organization', iconName: 'search'}
        ];

        //for component InputForm, prop formInfo
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

        //for component InputForm, prop formInfo
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

        //for component InputForm, prop formInfo
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

        //for component ModuleTable, prop tableInfo
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

        //for component InteractiveTableLayout, prop pageInfo
        const usersPageInfo = {
            title: 'Manage Users',
            headerButtons: [
                {content: 'Add User', iconName: 'building', className: 'inner-button', clickFunction: this.handleAddUserButtonClick},
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

        //for component ModalForm, prop modalInfo
        const editUserModalInfo = {
            title: 'Edit User',
            fields: [
                {name: 'name', label: 'Name', type: 'input'},
                {name: 'organization', label: 'Organization', type: 'select', options: orgs},
                {name: 'email', label: 'Email Address', type: 'input'},
                {name: 'role', label: 'Role', type: 'select', options: roles}
            ]
        };

        const editUserModal = <ModalForm ref={(editUserModal) => { this.editUserModal = editUserModal; }} modalInfo={editUserModalInfo} handleSubmit={this.handleEditUser} />;

        //for component ModalForm, prop modalInfo 
        const addUserModalInfo = {
            title: 'Add New User',
            fields: [
                {name: 'name', label: 'Name', type: 'input'},
                {name: 'organization', label: 'Organization', type: 'select', options: orgs},
                {name: 'email', label: 'Email Address', type: 'input'},
                {name: 'role', label: 'Role', type: 'select', options: roles}
            ]
        };

        const addUserModal = <ModalForm ref={(addUserModal) => { this.addUserModal = addUserModal; }} modalInfo={addUserModalInfo} handleSubmit={this.handleAddUser} />;

        //for component ModalForm, prop modalInfo 
        const addAdminModalInfo = {
            title: 'Add New Admin User',
            fields: [
                {name: 'name', label: 'Name', type: 'input'},
                {name: 'email', label: 'Email Address', type: 'input'},
                {name: 'phone', label: 'Phone Number', type: 'input'}
            ]
        };

        const addAdminModal = <ModalForm ref={(addAdminModal) => { this.addAdminModal = addAdminModal; }} modalInfo={addAdminModalInfo} handleSubmit={this.handleAddAdmin} />;

        //for component ModalForm, prop modalInfo 
        const editAdminModalInfo = {
            title: 'Edit Admin User',
            fields: [
                {name: 'name', label: 'Name', type: 'input'},
                {name: 'email', label: 'Email Address', type: 'input'},
                {name: 'phone', label: 'Phone', type: 'input'}
            ]
        };

        const editAdminModal = <ModalForm ref={(editAdminModal) => { this.editAdminModal = editAdminModal; }} modalInfo={editAdminModalInfo} handleSubmit={this.handleEditAdmin} />;

        const confirmDeleteUserModal = <ConfirmationModal ref={(confirmDeleteUserModal) => { this.confirmDeleteUserModal = confirmDeleteUserModal; }} handleConfirm={this.handleDeleteUser} />;

        const confirmDeleteAdminModal = <ConfirmationModal ref={(confirmDeleteAdminModal) => { this.confirmDeleteAdminModal = confirmDeleteAdminModal; }} handleConfirm={this.handleDeleteAdmin} />;

    return (
        <>
            {editUserModal}
            {addUserModal}
            {confirmDeleteUserModal}
            {editAdminModal}
            {confirmDeleteAdminModal}
            {addAdminModal}
            <SideNav menuInfo={mainSideNavInfo} activeItem={activeItemMain} handleItemClick={this.handleItemClickMain} />
            <Grid className='manage-data-content-container'>
                {activeItemMain === 0 ? (
                    <>
                        <Grid.Row className='my-account-header-container' centered>
                            <Grid.Column computer={8} tablet={10} mobile={12}>
                                <Header as='h2' className='my-account-header'>My Account</Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className='my-account-form-container' centered>
                            <Grid.Column computer={8} tablet={10} mobile={12}>
                                <InputForm formInfo={userInfo} formData={userData} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className='my-account-form-container' centered>
                            <Grid.Column computer={8} tablet={10} mobile={12}>
                                <InputForm formInfo={passwordInfo} formData={passwordData} />
                            </Grid.Column>
                        </Grid.Row>
                    </>
                ) : (
                    null
                )}
                {activeItemMain === 1 ? (
                    <InteractiveTableLayout pageInfo={usersPageInfo} tableContent={userTableData} tableRowClickFunction={this.handleUserTableButtonClick}/>
                ) : (
                    null
                )}
                {activeItemMain === 2 ? (
                    <Grid.Column >
                        <Grid className='manage-organization-container'>
                            <Grid.Column width={16}>
                                <Header as='h2'>Manage Organization</Header>
                                <Divider fitted />
                            </Grid.Column>
                            <Grid.Row className='org-form-container' centered>
                                <Grid.Column computer={8} tablet={10} mobile={12}>
                                    <InputForm formInfo={orgInfo} formData={orgData} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered>
                                <Grid.Column computer={8} tablet={10} mobile={12}>
                                    <ModuleTable tableInfo={adminTable} tableData={adminTableData} handleTableButtonClick={this.handleAdminTableButtonClick} buttonClickFunction={this.handleAddAdminButtonClick} />
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