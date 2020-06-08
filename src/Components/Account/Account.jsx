import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import SideNav from './../../Shared/SideNav/SideNav';
import LoadSpinnerFullPage from './../../Shared/LoadSpinnerFullPage/LoadSpinnerFullPage';
import ErrorModal from './../../Shared/ErrorModal/ErrorModal';
import MyAccount from './MyAccount/MyAccount';
import ManageUsers from './ManageUsers/ManageUsers';
import ManageOrganization from './ManageOrganization/ManageOrganization';

import './account.scss';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPageLoading: false,
            activeItemMain: null,
            userData: null,
            passwordData: null,
            orgData: null,
            adminTableData: [],
            userTableData: [],
            currentlyLoadingIndex: null,
            loadedPageIndexes: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        let activePageIndex = 0;

        if (this.props.history.location.state) {
            const {index} = this.props.history.location.state;
            activePageIndex = index === undefined ? 0 : index;
        }

        this.handleUpdateActivePage(activePageIndex);
    }

    componentWillReceiveProps = (nextProps) => {
        const {index} = nextProps.location.state;
        this.handleUpdateActivePage(index);
    }

    handleUpdateActivePage = (index) => { 
        //for component SideNav, prop activeItem (activeItemMain)
        this.setState({ activeItemMain: index });
        
        if (!this.state.loadedPageIndexes.includes(index)) {
            this.loadSubPageData(index);
        }
    }

    loadSubPageData = (index) => {
        const {loadedPageIndexes} = this.state;
        
        loadedPageIndexes.push(index);
        this.setState({ loadedPageIndexes, currentlyLoadingIndex: index });
      

        switch (index) {
            case 0:
                this.handleLoadMyAccountPage();
                break;

            case 1:
                this.handleLoadManageUsersPage();
                break;

            case 2:
                this.handleLoadOrganizationPage();
                break;

            default:
                //error
        }
    }

    handleLoadMyAccountPage = () => {
        //for component MyAccount, userData
        //for component MyAccount, prop passwordData (passwordData)
        axios.get('/account/user').then(response => {
            if (response.data.success) {
                const {userData} = response.data.data;
                this.setState({ userData, passwordData: {currentPassword: '', newPassword: '', confirmedPassword: ''} });
            } else {
                this.errorModal.handleOpenModal(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ currentlyLoadingIndex: null });
        });
    }

    handleLoadOrganizationPage = () => {
        //for component ManageOrganization, orgData (orgData)
        //for component ManageOrganization, adminTableData (adminTableData)
        axios.get('/account/organization').then(response => {
            if (response.data.success) {
                const {orgData, adminTableData} = response.data.data;
                this.setState({ orgData, adminTableData });
            } else {
                this.errorModal.handleOpenModal(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ currentlyLoadingIndex: null });
       });
    }

    handleLoadManageUsersPage = () => {
        //for component InteractiveTableLayout, tableData    
        axios.get('/account/users').then(response => {
            if (response.data.success) {
                const {userTableData} = response.data.data;
                this.setState({ userTableData, isPageLoading: false });
            } else {
                this.errorModal.handleOpenModal(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ currentlyLoadingIndex: null });
        });
    }

    //for component SideNav, prop handleItemClick
    handleItemClickMain = (e, { index }) => {
        this.handleUpdateActivePage(index);
    }

    //for component MyAccount, prop handleUpdatePasswordInformation
    handleUpdatePasswordInformation = (data) => {
        this.setState({ isPageLoading: true });
        
        axios.put('/account/password-information', data).then(response => {
            if (response.data.success) {
                const {passwordData} = response.data.data;

                this.setState({ passwordData });
            } else {
                this.errorModal.handleOpenModal(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }

    //for component MyAccount, prop handleUpdateUserInformation
    handleUpdateUserInformation = (data) => {
        this.setState({ isPageLoading: true });
        
        axios.put('/account/user-information', data).then(response => {
            if (response.data.success) {
                const {userData} = response.data.data;

                this.setState({ userData });
            } else {
                this.errorModal.handleOpenModal(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }

    //for component ManageUsers, prop handleEditUser
    handleEditUser = (data) => {
        this.setState({ isPageLoading: true });

        axios.put('/account/users', data).then(response => {
            if (response.data.success) {
                const {newData} = response.data.data;
                this.setState({ userTableData: newData });
            } else {
                this.errorModal.handleOpenModal(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }

    //for component ManageUsers, prop handleDeleteUser
    handleDeleteUser = (id) => {
        this.setState({ isPageLoading: true });

        axios.delete(`/account/admin/${id}`).then(response => {
            if (response.data.success) {
                this.setState((prevState) => ({
                    userTableData: prevState.userTableData.filter(user => user.id !== id)
                }));
            } else {
                this.errorModal.handleOpenModal(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }

    //for component ManageUsers, prop handleAddUser
    handleAddUser = (data) => {
        this.setState({ isPageLoading: true });

        axios.post('/account/user', data).then(response => {
            if (response.data.success) {
                const {newUser} = response.data.data;

                this.setState((prevState) => ({
                    userTableData: [newUser, ...prevState.userTableData]
                }));
            } else {
                this.errorModal.handleOpenModal(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }

    //for component ManageUsers, prop handleDownloadUsers
    handleDownloadUsers = () => {
        debugger;
    }

    //for component ManageOrganization, prop handleEditAdmin
    handleEditAdmin = (data) => {
        this.setState({ isPageLoading: true });

        axios.put('/account/admin', data).then(response => {
            if (response.data.success) {
                const {newData} = response.data.data;
                this.setState({ adminTableData: newData });
            } else {
                this.errorModal.handleOpenModal(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }

    //for prop ManageOrganization, prop handleAddAdmin
    handleAddAdmin = (data) => {
        this.setState({ isPageLoading: true });

        axios.post('/account/admin', data).then(response => {
            if (response.data.success) {
                const {newAdmin} = response.data.data;
                this.setState((prevState) => ({
                    adminTableData: [newAdmin, ...prevState.adminTableData]
                }));
            } else {
                this.errorModal.handleOpenModal(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }

    //for component ManageOrganization, prop handleDeleteAdmin
    handleDeleteAdmin = (id) => {
        this.setState({ isPageLoading: true });

        axios.delete(`/account/admin/${id}`).then(response => {
            if (response.data.success) {
                this.setState((prevState) => ({
                    adminTableData: prevState.adminTableData.filter(user => user.id !== id)
                }));
            } else {
                this.errorModal.handleOpenModal(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }

    //for component ManageOrganization, prop handleUpdateOrganization
    handleUpdateOrganization = (data) => {
        this.setState({ isPageLoading: true });
        
        axios.put('/account/organization-information', data).then(response => {
            if (response.data.success) {
                const {orgData} = response.data.data;

                this.setState({ orgData });
            } else {
                this.errorModal.handleOpenModal(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }
    
    render() {
        const {isPageLoading, activeItemMain, userData, passwordData, orgData, adminTableData, userTableData, currentlyLoadingIndex} = this.state;

        //for component SideNav, prop menuInfo
        const mainSideNavInfo = [
            {index: 0, name: 'My Account', iconName: 'user'},
            {index: 1, name: 'Manage Users', iconName: 'users'},
            {index: 2, name: 'Manage Organization', iconName: 'search'}
        ];

        const pageLoadSpinner = isPageLoading ? (
            <LoadSpinnerFullPage />
        ) : (
            null
        ); 

        const errorModal = (
            <ErrorModal ref={(errorModal) => { this.errorModal = errorModal; }} />
        );

        return (
            <>
                {errorModal}
                {pageLoadSpinner}
                <SideNav menuInfo={mainSideNavInfo} activeItem={activeItemMain} handleItemClick={this.handleItemClickMain} />
                <Grid className='manage-data-content-container'>
                    {activeItemMain === 0 ? (
                        <MyAccount isLoading={currentlyLoadingIndex === 0} userData={userData} passwordData={passwordData} handleUpdateUserInformation={this.handleUpdateUserInformation} handleUpdatePasswordInformation={this.handleUpdatePasswordInformation} />
                    ) : (
                        null
                    )}
                    {activeItemMain === 1 ? (
                        <ManageUsers isLoading={currentlyLoadingIndex === 1} userTableData={userTableData} tableRowClickFunction={this.handleUserTableButtonClick} handleEditUser={this.handleEditUser} handleDownloadUsers={this.handleDownloadUsers} handleAddUser={this.handleAddUser} handleDeleteUser={this.handleDeleteUser} />
                    ) : (
                        null
                    )}
                    {activeItemMain === 2 ? (
                        <ManageOrganization isLoading={currentlyLoadingIndex === activeItemMain} orgData={orgData} adminTableData={adminTableData} handleAddAdmin={this.handleAddAdmin} handleUpdateOrganization={this.handleUpdateOrganization} handleEditAdmin={this.handleEditAdmin} handleDeleteAdmin={this.handleDeleteAdmin} />
                    ) : (
                        null
                    )}
                </Grid>
            </>
        );
    }
}

export default withRouter(Account);