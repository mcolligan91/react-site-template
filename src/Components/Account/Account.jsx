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
            organizations: [],
            userRoles: [],
            currentlyLoadingIndex: null,
            loadedPageIndexes: []
        }
    }


    /*
	summary: sets activePageIndex for display of subpage (My Account, Manage Users, Manage Organization) - will initially set activePageIndex to 0 then check props history to see if user has selected a different subpage from the account dropdown menu and update activePageIndex if they have; calls handleUpdateActivePage function to load subpage data

	params: none

	returns: none
    */
    componentDidMount = () => {
        window.scrollTo(0, 0);
        let activePageIndex = 0;

        if (this.props.history.location.state) {
            const {index} = this.props.history.location.state;
            activePageIndex = index === undefined ? 0 : index;
        }

        this.handleUpdateActivePage(activePageIndex);
    }

    
    /*
	summary: will recieve subpage activePageIndex if user selects new subpage from the account dropdown menu and call handleUpdateActivePage to update the activeItemMain state

	params: nextProps - page index prop from history.location.state prop

	returns: none
    */
    componentWillReceiveProps = (nextProps) => {
        const {index} = nextProps.location.state;
        this.handleUpdateActivePage(index);
    }


    /*
	summary: updates activeItemMain state with index for showing selected subpage, then checks loadedPageIndexes state to see if that subpage api call has already happened since the user has visited the main Account module. If the subpage is not in the loadedPageIndexes array, the loadSubPageData function is called to load the subpage data

	params: index - used for updating activeItemMain state with selected subpage index

	returns: none
    */
    handleUpdateActivePage = (index) => { 
        //for component SideNav, prop activeItem (activeItemMain)
        this.setState({ activeItemMain: index });
        
        if (!this.state.loadedPageIndexes.includes(index)) {
            this.loadSubPageData(index);
        }
    }


    /*
	summary: updates loadedPageIndexes state with selected index, sets currentlyLoadingIndex state to selected index, then calls subpage loading function based on selected index 

	params: index - used for updating loadedPageIndexes state with selected subpage index so function can be bypassed if user selects subpage again while still in main Account module (handleLoadMyAccountPage, handleLoadManageUsersPage, or handleLoadOrganizationPage)

	returns: none
    */
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
                //pass
        }
    }


    /*
	summary: makes api call to load My Account subpage data - updates userData state with response data and updates passwordData state with array with blank values on successful response, calls function to open ErrorModal and show error message on unsuccessful response

	params: none

	returns: none
    */
    handleLoadMyAccountPage = () => {
        //for component MyAccount, userData
        //for component MyAccount, prop passwordData (passwordData)
        axios.get('/account/user').then(response => {
            if (response.data.success) {
                const {userData} = response.data.data;
                this.setState({ userData, passwordData: {currentPassword: '', newPassword: '', confirmedPassword: ''} });
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ currentlyLoadingIndex: null });
        });
    }


    /*
	summary: makes api call to load Manage Users subpage data - updates orgData and userTableData states with response data on successful response, calls function to open ErrorModal and show error message on unsuccessful response

	params: none

	returns: none
    */
    handleLoadManageUsersPage = () => {
        //for component InteractiveTableLayout, tableData    
        axios.get('/account/users').then(response => {
            if (response.data.success) {
                const {userTableData, organizations, userRoles} = response.data.data;
                this.setState({ userTableData, organizations, userRoles, isPageLoading: false });
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ currentlyLoadingIndex: null });
        });
    }


    /*
	summary: makes api call to load Manage Organization subpage data - updates orgData and adminTableData states with response data on successful response, calls function to open ErrorModal and show error message on unsuccessful response

	params: none

	returns: none
    */
    handleLoadOrganizationPage = () => {
        //for component ManageOrganization, orgData (orgData)
        //for component ManageOrganization, adminTableData (adminTableData)
        axios.get('/account/organization').then(response => {
            if (response.data.success) {
                const {orgData, adminTableData} = response.data.data;
                this.setState({ orgData, adminTableData });
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ currentlyLoadingIndex: null });
       });
    }


    /*
	summary: gets subpage index from clickEvent data and calls handleUpdateActivePage to update activeItemMain state

	params: e and index from clickEvent data

	returns: none
    */
    //for component SideNav, prop handleItemClick
    handleItemClickMain = (e, { index }) => {
        this.handleUpdateActivePage(index);
    }


    /*
	summary: makes api call to update user password information - updates passwordData state with response data on successful response, calls function to open ErrorModal and show error message on unsuccessful response

	params: data - data from password form inputs

	returns: none
    */
    //for component MyAccount, prop handleUpdatePasswordInformation
    handleUpdatePasswordInformation = (data) => {
        this.setState({ isPageLoading: true });
        
        axios.put('/account/password-information', data).then(response => {
            if (response.data.success) {
                const {passwordData} = response.data.data;
                this.setState({ passwordData });
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }


    /*
	summary: makes api call to update user information - updates userData state with response data on successful response, calls function to open ErrorModal and show error message on unsuccessful response

	params: data - data from user information form inputs

	returns: none
    */
    //for component MyAccount, prop handleUpdateUserInformation
    handleUpdateUserInformation = (data) => {
        this.setState({ isPageLoading: true });
        
        axios.put('/account/user-information', data).then(response => {
            if (response.data.success) {
                const {userData} = response.data.data;

                this.setState({ userData });
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }


    /*
	summary: makes api call to edit user data in main User table - updates userTableData state with response data on successful response, calls function to open ErrorModal and show error message on unsuccessful response

	params: data - data from form inputs in modal for editing user 

	returns: none
    */
    //for component ManageUsers, prop handleEditUser
    handleEditUser = (data) => {
        this.setState({ isPageLoading: true });

        axios.put('/account/users', data).then(response => {
            if (response.data.success) {
                const {newData} = response.data.data;
                this.setState({ userTableData: newData });
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }


    /*
	summary: makes api call to delete user data in main User table - updates userTableData state with response data on successful response, calls function to open ErrorModal and show error message on unsuccessful response

	params: id - id of user pulled from table row data

	returns: none
    */
    //for component ManageUsers, prop handleDeleteUser
    handleDeleteUser = (id) => {
        this.setState({ isPageLoading: true });

        axios.delete(`/account/admin/${id}`).then(response => {
            if (response.data.success) {
                this.setState((prevState) => ({
                    userTableData: prevState.userTableData.filter(user => user.id !== id)
                }));
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }


    /*
	summary: makes api call to add user to main User table - updates userTableData state with response data on successful response, calls function to open ErrorModal and show error message on unsuccessful response

	params: data - data from form inputs in modal for adding user 

	returns: none
    */
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
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }

    //for component ManageUsers, prop handleDownloadUsers
    handleDownloadUsers = () => {
        //will make api call to download main User table
        debugger;
    }


    /*
	summary: makes api call to edit admin data in main Admin table - updates adminTableData state with response data on successful response, calls function to open ErrorModal and show error message on unsuccessful response

	params: data - data from form inputs in modal for editing admin 

	returns: none
    */
    //for component ManageOrganization, prop handleEditAdmin
    handleEditAdmin = (data) => {
        this.setState({ isPageLoading: true });

        axios.put('/account/admin', data).then(response => {
            if (response.data.success) {
                const {newData} = response.data.data;
                this.setState({ adminTableData: newData });
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }


    /*
	summary: makes api call to add admin to main Admin table - updates adminTableData state with response data on successful response, calls function to open ErrorModal and show error message on unsuccessful response

	params: data - data from form inputs in modal for adding user 

	returns: none
    */
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
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }


    /*
	summary: makes api call to delete admin data in main Admin table - updates adminTableData state with response data on successful response, calls function to open ErrorModal and show error message on unsuccessful response

	params: id - id of user pulled from table row data

	returns: none
    */
    //for component ManageOrganization, prop handleDeleteAdmin
    handleDeleteAdmin = (id) => {
        this.setState({ isPageLoading: true });

        axios.delete(`/account/admin/${id}`).then(response => {
            if (response.data.success) {
                this.setState((prevState) => ({
                    adminTableData: prevState.adminTableData.filter(user => user.id !== id)
                }));
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }

    /*
	summary: makes api call to update organization information - updates orgData state with response data on successful response, calls function to open ErrorModal and show error message on unsuccessful response

	params: data - data from organization information form inputs

	returns: none
    */
    //for component ManageOrganization, prop handleUpdateOrganization
    handleUpdateOrganization = (data) => {
        this.setState({ isPageLoading: true });
        
        axios.put('/account/organization-information', data).then(response => {
            if (response.data.success) {
                const {orgData} = response.data.data;
                this.setState({ orgData });
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }
    
    render() {
        const {isPageLoading, activeItemMain, userData, passwordData, orgData, adminTableData, organizations, userRoles, userTableData, currentlyLoadingIndex} = this.state;

        //for component SideNav, prop menuInfo
        const mainSideNavInfo = [
            {index: 0, name: 'My Account', iconName: 'user'},
            {index: 1, name: 'Manage Users', iconName: 'users'},
            {index: 2, name: 'Manage Organization', iconName: 'search'}
        ];

        const pageLoadSpinner = isPageLoading && (
            <LoadSpinnerFullPage />
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
                    {activeItemMain === 0 && (
                        <MyAccount isLoading={currentlyLoadingIndex === 0} userData={userData} passwordData={passwordData} handleUpdateUserInformation={this.handleUpdateUserInformation} handleUpdatePasswordInformation={this.handleUpdatePasswordInformation} />
                    )}
                    {activeItemMain === 1 && (
                        <ManageUsers isLoading={currentlyLoadingIndex === 1} userTableData={userTableData} orgs={organizations} roles={userRoles} tableRowClickFunction={this.handleUserTableButtonClick} handleEditUser={this.handleEditUser} handleDownloadUsers={this.handleDownloadUsers} handleAddUser={this.handleAddUser} handleDeleteUser={this.handleDeleteUser} />
                    )}
                    {activeItemMain === 2 && (
                        <ManageOrganization isLoading={currentlyLoadingIndex === activeItemMain} orgData={orgData} adminTableData={adminTableData} handleAddAdmin={this.handleAddAdmin} handleUpdateOrganization={this.handleUpdateOrganization} handleEditAdmin={this.handleEditAdmin} handleDeleteAdmin={this.handleDeleteAdmin} />
                    )}
                </Grid>
            </>
        );
    }
}

export default withRouter(Account);