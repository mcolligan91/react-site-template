import React, { Component } from 'react';

import InteractiveTableLayout from './../../../Shared/InteractiveTableLayout/InteractiveTableLayout';
import ModalForm from './../../../Shared/ModalForm/ModalForm';

import './branch.scss'

class Branch extends Component {

    handleAddBranchClick = () => {
        let formData = {status: '', branchId: '', city: '', state: '', zipCode: '', details: ''};
        this.addBranchModal.handleOpenModal(formData);
    }

    render() {
        const {branchTableContent, handleAddBranch, handleBulkUpload, handleDownloadAll} = this.props;

        //for component InteractiveTableLayout, prop pageInfo
        const branchPageInfo = {
            title: 'Manage Branch Data',
            headerButtons: [
                {content: 'Add Branch', iconName: 'building', className: 'inner-button', clickFunction: this.handleAddBranchClick},
                {content: 'Bulk Upload', iconName: 'download', className: 'inner-button', clickFunction: handleBulkUpload},
                {content: 'Download All', iconName: 'upload', clickFunction: handleDownloadAll}
            ],
            pagingUnits: 'Branches',
            tableInfo: {
                headers: [
                    {text: 'Branch ID'},
                    {text: 'City'},
                    {text: 'State'},
                    {text: 'Zip Code'},
                    {text: 'Status'},
                    {text: 'Date Added'},
                    {text: 'Details'}
                ],
                cellData: [
                    {type: 'text', value: 'branchId'},
                    {type: 'text', value: 'city'},
                    {type: 'text', value: 'state'},
                    {type: 'text', value: 'zipCode'},
                    {type: 'text', value: 'status'},
                    {type: 'text', value: 'dateAdded'},
                    {type: 'text', value: 'details'}
                ]
            }
        };

        //for component ModalForm, prop modalInfo
        const addBranchModalInfo = {
            title: 'Add New Branch',
            fields: [
                {name: 'status', label: 'Status', type: 'radio', options: ['Open', 'Closed']},
                {name: 'branchId', label: 'Branch ID', type: 'input'},
                {name: 'city', label: 'City', type: 'input'},
                {name: 'state', label: 'State', type: 'input'},
                {name: 'zipCode', label: 'Zip Code', type: 'input'},
                {name: 'details', label: 'Details', type: 'textArea'}
            ]
        };

        const addBranchModal = <ModalForm ref={(addBranchModal) => { this.addBranchModal = addBranchModal; }} modalInfo={addBranchModalInfo} handleSubmit={handleAddBranch} />;

        return (
            <>
                {addBranchModal}
                <InteractiveTableLayout pageInfo={branchPageInfo} tableContent={branchTableContent} />
            </>
        );
    }

}

export default Branch;