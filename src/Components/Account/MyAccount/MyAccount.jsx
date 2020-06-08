import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';

import InputForm from './../../../Shared/InputForm/InputForm';

import './my-account.scss';

class MyAccount extends Component {

    render() {
        const {isLoading, passwordData, userData, handleUpdatePasswordInformation, handleUpdateUserInformation} = this.props;

        //for component InputForm, prop formInfo
        const userInfo = {
            title: 'User Information',
            submitFunction: handleUpdateUserInformation,
            buttonText: 'Update User Information',
            buttonIcon: 'user',
            fields: [
                {
                    fieldType: 'input', 
                    label: 'First Name', 
                    placeholder: 'First Name', 
                    name: 'firstName',
                    isRequired: true,
                    validations: null,
                    validationErrors: {
                        isDefaultRequiredValue: 'Please fill out this field.'
                    }
                },
                {
                    fieldType: 'input', 
                    label: 'Last Name', 
                    placeholder: 'Last Name', 
                    name: 'lastName',
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
                    label: 'Location', 
                    placeholder: 'Location', 
                    name: 'location',
                    isRequired: true,
                    validations: null,
                    validationErrors: {
                        isDefaultRequiredValue: 'Please fill out this field.'
                    }
                }
            ]
        };

        //for component InputForm, prop formInfo
        const passwordInfo = {
            title: 'Update Password',
            submitFunction: handleUpdatePasswordInformation,
            buttonText: 'Update Password',
            buttonIcon: 'ellipsis horizontal',
            fields: [
                {
                    fieldType: 'input', 
                    label: 'Current Password', 
                    placeholder: 'Current Password', 
                    name: 'currentPassword', 
                    type: 'password',
                    isRequired: true,
                    validations: null,
                    validationErrors: {
                        isDefaultRequiredValue: 'Please fill out this field.'
                    }
                },
                {
                    fieldType: 'input', 
                    label: 'Enter New Password', 
                    placeholder: 'Enter New Password', 
                    name: 'newPassword', 
                    type: 'password',
                    isRequired: true,
                    validations: null,
                    validationErrors: {
                        isDefaultRequiredValue: 'Please fill out this field.'
                    }
                },
                {
                    fieldType: 'input', 
                    label: 'Confirm New Password', 
                    placeholder: 'Confirm New Password', 
                    name: 'confirmedPassword', 
                    type: 'password',
                    isRequired: true,
                    validations: 'equalsField:newPassword',
                    validationErrors: {
                        equalsField: 'The entered passwords do not match',
                        isDefaultRequiredValue: 'Please fill out this field.'
                    }
                }
            ]
        };
        
        return (
            <>
                <Grid.Row className='my-account-header-container' centered>
                    <Grid.Column computer={8} tablet={10} mobile={12}>
                        <Header as='h2' className='my-account-header'>My Account</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className='my-account-form-container' centered>
                    <Grid.Column computer={8} tablet={10} mobile={12}>
                        <InputForm isLoading={isLoading} formInfo={userInfo} formData={userData} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className='my-account-form-container' centered>
                    <Grid.Column computer={8} tablet={10} mobile={12}>
                        <InputForm isLoading={isLoading} formInfo={passwordInfo} formData={passwordData} />
                    </Grid.Column>
                </Grid.Row>
            </>
        );
    }
}

export default MyAccount;