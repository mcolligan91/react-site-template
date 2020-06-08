import React, { Component } from 'react';

import InteractiveTableLayout from './../../../Shared/InteractiveTableLayout/InteractiveTableLayout';
import ModalForm from './../../../Shared/ModalForm/ModalForm';
import ConfirmationModal from './../../../Shared/ConfirmationModal/ConfirmationModal';

import './manage-users.scss';

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

class ManageUsers extends Component {

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

    handleAddUserButtonClick = () => {
        let formData = {name: '', organization: '', email: '', role: ''};
        this.addUserModal.handleOpenModal(formData);
    }

    render() {
        const {isLoading, userTableData, handleEditUser, handleDownloadUsers, handleAddUser, handleDeleteUser} = this.props;

        //for component InteractiveTableLayout, prop pageInfo
        const usersPageInfo = {
            title: 'Manage Users',
            headerButtons: [
                {content: 'Add User', iconName: 'building', className: 'inner-button', clickFunction: this.handleAddUserButtonClick},
                {content: 'Download', iconName: 'download', className: '', clickFunction: handleDownloadUsers}
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

        //for component ModalForm, prop modalInfo
        const userModalInfo = {
            title: 'Edit User',
            fields: [
                {
                    name: 'name', 
                    label: 'Name',
                    placeholder: 'Name', 
                    type: 'input',
                    isRequired: true,
                    validations: null,
                    validationErrors: {
                        isDefaultRequiredValue: 'Please fill out this field.'
                    }
                },
                {
                    name: 'organization', 
                    label: 'Organization', 
                    placeholder: 'Please select...',
                    type: 'select', 
                    options: orgs,
                    isRequired: true,
                    validations: null,
                    validationErrors: {
                        isDefaultRequiredValue: 'Please make a selection.'
                    }
                },
                {
                    name: 'email', 
                    label: 'Email Address', 
                    placeholder: 'Email Address', 
                    type: 'input',
                    isRequired: true,
                    validations: 'isEmail',
                    validationErrors: {
                        isEmail: 'Please enter a valid email address',
                        isDefaultRequiredValue: 'Please fill out this field.'
                    }
                },
                {
                    name: 'role', 
                    label: 'Role', 
                    placeholder: 'Please select...',
                    type: 'select', 
                    options: roles,
                    isRequired: true,
                    validations: null,
                    validationErrors: {
                        isDefaultRequiredValue: 'Please make a selection.'
                    }
                }
            ]
        };

        const editUserModal = (
            <ModalForm ref={(editUserModal) => { this.editUserModal = editUserModal; }} modalInfo={userModalInfo} handleSubmit={handleEditUser} />
        );

        const addUserModal = (
            <ModalForm ref={(addUserModal) => { this.addUserModal = addUserModal; }} modalInfo={userModalInfo} handleSubmit={handleAddUser} />
        );

        const confirmDeleteUserModal = (
            <ConfirmationModal ref={(confirmDeleteUserModal) => { this.confirmDeleteUserModal = confirmDeleteUserModal; }} handleConfirm={handleDeleteUser} />
        );
        
        return (
            <>
                {addUserModal}
                {editUserModal}
                {confirmDeleteUserModal}
                <InteractiveTableLayout isLoading={isLoading} pageInfo={usersPageInfo} tableContent={userTableData} tableRowClickFunction={this.handleUserTableButtonClick} />
            </>
        );
    }
}

export default ManageUsers;