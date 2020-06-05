import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import SideNav from './../../Shared/SideNav/SideNav';
import LoadSpinnerFullPage from './../../Shared/LoadSpinnerFullPage/LoadSpinnerFullPage';
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
                //for component InteractiveTableLayout, tableData (userTableData)
                this.setState({
                    userTableData: [
                        {id: 1, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'}, {id: 2, name: 'User B', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 3, name: 'User C', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 4, name: 'User D', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 5, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 6, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 7, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 8, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 9, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 10, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 11, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 12, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 13, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 14, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 15, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'}
                    ]
                });
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
                //error
            }
        }).catch(error => {
            //error
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
                //error
            }
       }).catch(error => {
            //error
       }).finally(() => {
            this.setState({ currentlyLoadingIndex: null });
       });
    }

    //for component SideNav, prop handleItemClick
    handleItemClickMain = (e, { index }) => {
        this.handleUpdateActivePage(index);
    }

    //for component MyAccount, prop handleUpdatePasswordInformation
    handleUpdatePasswordInformation = () => {
        //ajax call
        this.setState({ isPageLoading: true });

        setTimeout(() => {
            this.setState({ isPageLoading: false });
        }, 500);
    }

    //for component MyAccount, prop handleUpdateUserInformation
    handleUpdateUserInformation = () => {
        //ajax call
        this.setState({ isPageLoading: true });

        setTimeout(() => {
            this.setState({ isPageLoading: false });
        }, 500);
    }

    //for component ManageUsers, prop handleEditUser
    handleEditUser = (data) => {
        //would fire ajax call and update state based on response, instead of 'data' param
        this.setState({ isPageLoading: true });
        
        setTimeout(() => {
            this.setState((prevState) => {
                let newData = prevState.userTableData,
                    user = newData.find(d => d.id === data.id);
                Object.assign(user, data);
                return {userTableData: newData, isPageLoading: false};
            });
        }, 500);
    }

    //for component ManageUsers, prop handleDeleteUser
    handleDeleteUser = (id) => {
        //would fire ajax call and update state based on response, instead of 'id' param
        this.setState({ isPageLoading: true });

        setTimeout(() => {
            this.setState((prevState) => ({
                userTableData: prevState.userTableData.filter(user => user.id !== id),
                isPageLoading: false
            }));
        }, 500);
    }

    //for component ManageUsers, prop handleAddUser
    handleAddUser = (data) => {
        //would fire ajax call and update state based on response, instead of 'data' param
        this.setState({ isPageLoading: true });

        setTimeout(() => {
            let newUser = {id: 16, name: data.name, organization: data.organization, email: data.email, role: data.role, lastLogin: '5/25/2020'};
            this.setState((prevState) => ({
                userTableData: [newUser, ...prevState.userTableData],
                isPageLoading: false
            }));
        }, 500);
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
                this.setState({ adminTableData: newData, isPageLoading: false });
            } else {
                //error
            }
        }).catch(error => {
            //error
        });
    }

    //for prop ManageOrganization, prop handleAddAdmin
    handleAddAdmin = (data) => {
        this.setState({ isPageLoading: true });

        axios.post('/account/admin', data).then(response => {
            if (response.data.success) {
                const {newAdmin} = response.data.data;
                this.setState((prevState) => ({
                    adminTableData: [newAdmin, ...prevState.adminTableData],
                    isPageLoading: false
                }));
            } else {
                //error
            }
        }).catch(error => {
            //error
        });
    }

    //for component ManageOrganization, prop handleDeleteAdmin
    handleDeleteAdmin = (id) => {
        this.setState({ isPageLoading: true });

        axios.delete(`/account/admin/${id}`).then(response => {
            if (response.data.success) {
                this.setState((prevState) => ({
                    adminTableData: prevState.adminTableData.filter(user => user.id !== id),
                    isPageLoading: false
                }));
            } else {
                //error
            }
        }).catch(error => {
            //error
        });
    }

    //for component ManageOrganization, prop handleUpdateOrganization
    handleUpdateOrganization = (data) => {
        this.setState({ isPageLoading: true });
        
        axios.put('/account/organization-information', data).then(response => {
            if (response.data.success) {
                const {orgData} = response.data.data;

                this.setState({ orgData, isPageLoading: false });
            } else {
                //error
            }
        }).catch(error => {
            //error
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

        return (
            <>
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