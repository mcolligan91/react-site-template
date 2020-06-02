import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

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
            userTableData: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        let activePageIndex = 0;

        if (this.props.history.location.state) {
            const {index} = this.props.history.location.state;
            activePageIndex = index === undefined ? 0 : index;
        }

        //for component SideNav, prop activeItem (activeItemMain)
        //for component MyAccount, prop passwordData (passwordData)
        this.setState({ activeItemMain: activePageIndex, passwordData: {currentPassword: '', newPassword: '', confirmedPassword: ''}});
        this.loadSubPageData(activePageIndex);
    }

    componentWillReceiveProps = (nextProps) => {
        const {index} = nextProps.location.state;
        this.setState({ activeItemMain: index });
        this.loadSubPageData(index);
    }

    loadSubPageData = (index) => {
        //will load from ajax call
        setTimeout(() => {
            switch (index) {
                case 0:
                    //for component MyAccount, userData
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
                    //for component ManageOrganization, orgData (orgData)
                    //for component ManageOrganization, adminTableData (adminTableData)
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

    //for component SideNav, prop handleItemClick
    handleItemClickMain = (e, { index }) => {
        this.loadSubPageData(index);
        this.setState({ activeItemMain: index });
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
        //would fire ajax call and update state based on response, instead of 'data' param
        this.setState({ isPageLoading: true });

        setTimeout(() => {
            this.setState((prevState) => {
                let newData = prevState.adminTableData,
                    user = newData.find(d => d.id === data.id);
                Object.assign(user, data);
                return {adminTableData: newData, isPageLoading: false};
            });

        }, 500);
    }

    //for prop ManageOrganization, prop handleAddAdmin
    handleAddAdmin = (data) => {
        //would fire ajax call and update state based on response, instead of 'data' param
        this.setState({ isPageLoading: true });

        setTimeout(() => {
            let newAdmin = {id: 4, name: data.name, email: data.email, phone: data.phone};
            this.setState((prevState) => ({
                adminTableData: [newAdmin, ...prevState.adminTableData],
                isPageLoading: false
            }));
        }, 500);
    }

    //for component ManageOrganization, prop handleDeleteAdmin
    handleDeleteAdmin = (id) => {
        //would fire ajax call and update state based on response, instead of 'id' param
        this.setState({ isPageLoading: true });

        setTimeout(() => {
            this.setState((prevState) => ({
                adminTableData: prevState.adminTableData.filter(user => user.id !== id),
                isPageLoading: false
            }));
        }, 500);
    }

    //for component ManageOrganization, prop handleUpdateOrganization
    handleUpdateOrganization = () => {
        //ajax call
        this.setState({ isPageLoading: true });

        setTimeout(() => {
            this.setState({ isPageLoading: false });
        }, 500);
    }
    
    render() {
        const {isPageLoading, activeItemMain, userData, passwordData, orgData, adminTableData, userTableData} = this.state;

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
                        <MyAccount userData={userData} passwordData={passwordData} handleUpdateUserInformation={this.handleUpdateUserInformation} handleUpdatePasswordInformation={this.handleUpdatePasswordInformation} />
                    ) : (
                        null
                    )}
                    {activeItemMain === 1 ? (
                        <ManageUsers userTableData={userTableData} tableRowClickFunction={this.handleUserTableButtonClick} handleEditUser={this.handleEditUser} handleDownloadUsers={this.handleDownloadUsers} handleAddUser={this.handleAddUser} handleDeleteUser={this.handleDeleteUser} />
                    ) : (
                        null
                    )}
                    {activeItemMain === 2 ? (
                        <ManageOrganization orgData={orgData} adminTableData={adminTableData} handleAddAdmin={this.handleAddAdmin} handleUpdateOrganization={this.handleUpdateOrganization} handleEditAdmin={this.handleEditAdmin} handleDeleteAdmin={this.handleDeleteAdmin} />
                    ) : (
                        null
                    )}
                </Grid>
            </>
        );
    }
}

export default withRouter(Account);