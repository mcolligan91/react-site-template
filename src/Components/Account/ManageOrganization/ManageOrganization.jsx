import React, { Component } from 'react';
import { Grid, Header, Divider } from 'semantic-ui-react';

import InputForm from './../../../Shared/InputForm/InputForm';
import ModuleTable from './../../../Shared/ModuleTable/ModuleTable';
import ModalForm from './../../../Shared/ModalForm/ModalForm';
import ConfirmationModal from './../../../Shared/ConfirmationModal/ConfirmationModal';

import './manage-organization.scss';

class ManageOrganization extends Component {

    //for component ModuleTable, prop buttonClickFunction
    handleAddAdminButtonClick = () => {
        let formData = {name: '', email: '', phone: ''};
        this.addAdminModal.handleOpenModal(formData);
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

    render() {
        const {orgData, adminTableData, handleAddAdmin, handleUpdateOrganization, handleDeleteAdmin, handleEditAdmin} = this.props;

        //for component InputForm, prop formInfo
        const orgInfo = {
            title: 'Organization Information',
            submitFunction: handleUpdateOrganization,
            buttonText: 'Update Organization',
            buttonIcon: 'compass',
            fields: [
                {
                    fieldType: 'input', 
                    label: 'Address', 
                    placeholder: 'Address', 
                    name: 'address',
                    isRequired: true,
                    validations: null,
                    validationErrors: {
                        isDefaultRequiredValue: 'Please fill out this field.'
                    }
                },
                {
                    fieldType: 'input', 
                    label: 'Phone Number', 
                    placeholder: 'Phone Number', 
                    name: 'phone',
                    isRequired: true,
                    validations: null,
                    validationErrors: {
                        isDefaultRequiredValue: 'Please fill out this field.'
                    }
                },
                {
                    fieldType: 'input', 
                    label: 'Email Address', 
                    placeholder: 'Email Address', 
                    name: 'email',
                    isRequired: true,
                    validations: 'isEmail',
                    validationErrors: {
                        isEmail: 'Please senter a valid email address.', 
                        isDefaultRequiredValue: 'Please fill out this field.'
                    }
                },
                {
                    fieldType: 'input', 
                    label: 'Website', 
                    placeholder: 'Website', 
                    name: 'website',
                    isRequired: false,
                    validations: null,
                    validationErrors: null
                }
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

        //for component ModalForm, prop modalInfo 
        const adminModalInfo = {
            title: 'Add New Admin User',
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
                    name: 'email', 
                    label: 'Email Address', 
                    placeholder: 'Email Address', 
                    type: 'input',
                    isRequired: true,
                    validations: 'isEmail',
                    validationErrors: {
                        isEmail: 'Please senter a valid email address.', 
                        isDefaultRequiredValue: 'Please fill out this field.'
                    }
                },
                {
                    name: 'phone', 
                    label: 'Phone Number', 
                    placeholder: 'Email Address', 
                    type: 'input',
                    isRequired: true,
                    validations: null,
                    validationErrors: {
                        isDefaultRequiredValue: 'Please fill out this field.'
                    }
                }
            ]
        };

        const addAdminModal = (
            <ModalForm ref={(addAdminModal) => { this.addAdminModal = addAdminModal; }} modalInfo={adminModalInfo}   handleSubmit={handleAddAdmin} />
        );

        const editAdminModal = (
            <ModalForm ref={(editAdminModal) => { this.editAdminModal = editAdminModal; }} modalInfo={adminModalInfo} handleSubmit={handleEditAdmin} />
        );

        const confirmDeleteAdminModal = (
            <ConfirmationModal ref={(confirmDeleteAdminModal) => { this.confirmDeleteAdminModal = confirmDeleteAdminModal; }} handleConfirm={handleDeleteAdmin} />
        );

        return (
            <>
                {editAdminModal}
                {confirmDeleteAdminModal}
                {addAdminModal}
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
            </>
        );
    }
}

export default ManageOrganization;