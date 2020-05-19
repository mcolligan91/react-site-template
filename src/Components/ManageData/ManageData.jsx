import React, { Component } from 'react';
import { Search, Button, Grid, Header, Icon, Menu, Table, Segment, Divider, Pagination } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import ModuleTable from './../../Shared/ModuleTable/ModuleTable';
import SideNav from './../../Shared/SideNav/SideNav';
import SecondarySideNav from './../../Shared/SecondarySideNav/SecondarySideNav';
import InteractiveTableLayout from './../../Shared/InteractiveTableLayout/InteractiveTableLayout';

import './manage-data.scss';


class ManageData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemMain: 'POS',
            branchData: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);

        //will pull with ajax call 
        this.setState({ branchData: [
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
            {branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'}
        ]})
    }

    handleItemClickMain = (e, { name }) => {
        this.setState({ activeItemMain: name })
    }

    handleSecondaryItemClick = () => {
        debugger;
    }

    handleAddBranch = () => {
        debugger;
    }
    
    handleBulkUpload = () => {
        debugger;
    }
    
    handleDownloadAll = () => {
        debugger;
    }
    
    handleBranchUploadTemplate = () => {
        debugger;
    }

  render() {
    const {activeItemMain, branchData} = this.state;

    const mainSideNavInfo = [
        {name: 'POS', iconName: 'shopping cart'},
        {name: 'Branch', iconName: 'map marker alternate'},
        {name: 'Product', iconName: 'grid layout'},
        {name: 'Customer', iconName: 'users'}
    ];

    const secondarySideNavInfo = [
        {title: '2020', content: [{month: 'January', status: 3}, {month: 'February', status: 2}, {month: 'March', status: 1}, {month: 'April', status: 1}, {month: 'May', status: 1}, {month: 'June', status: 1}, {month: 'July', status: 1}, {month: 'August', status: 1}, {month: 'September', status: 1}, {month: 'October', status: 1}, {month: 'November', status: 1}, {month: 'December', status: 1}]},
        {title: '2019', content: [{month: 'January', status: 3}, {month: 'February', status: 2}, {month: 'March', status: 1}, {month: 'April', status: 1}, {month: 'May', status: 1}, {month: 'June', status: 1}, {month: 'July', status: 1}, {month: 'August', status: 1}, {month: 'September', status: 1}, {month: 'October', status: 1}, {month: 'November', status: 1}, {month: 'December', status: 1}]},
        {title: '2018', content: [{month: 'January', status: 3}, {month: 'February', status: 2}, {month: 'March', status: 1}, {month: 'April', status: 1}, {month: 'May', status: 1}, {month: 'June', status: 1}, {month: 'July', status: 1}, {month: 'August', status: 1}, {month: 'September', status: 1}, {month: 'October', status: 1}, {month: 'November', status: 1}, {month: 'December', status: 1}]},
        {title: '2017', content: [{month: 'January', status: 3}, {month: 'February', status: 2}, {month: 'March', status: 1}, {month: 'April', status: 1}, {month: 'May', status: 1}, {month: 'June', status: 1}, {month: 'July', status: 1}, {month: 'August', status: 1}, {month: 'September', status: 1}, {month: 'October', status: 1}, {month: 'November', status: 1}, {month: 'December', status: 1}]},
        {title: '2016', content: [{month: 'January', status: 3}, {month: 'February', status: 2}, {month: 'March', status: 1}, {month: 'April', status: 1}, {month: 'May', status: 1}, {month: 'June', status: 1}, {month: 'July', status: 1}, {month: 'August', status: 1}, {month: 'September', status: 1}, {month: 'October', status: 1}, {month: 'November', status: 1}, {month: 'December', status: 1}]},
        {title: '2015', content: [{month: 'January', status: 3}, {month: 'February', status: 2}, {month: 'March', status: 1}, {month: 'April', status: 1}, {month: 'May', status: 1}, {month: 'June', status: 1}, {month: 'July', status: 1}, {month: 'August', status: 1}, {month: 'September', status: 1}, {month: 'October', status: 1}, {month: 'November', status: 1}, {month: 'December', status: 1}]}
    ];

    const branchPageInfo = {
        title: 'Manage Branch Data',
        headerButtons: [
            {content: 'Add Branch', iconName: 'building', className: 'inner-button', clickFunction: this.handleAddBranch},
            {content: 'Bulk Upload', iconName: 'download', className: 'inner-button', clickFunction: this.handleBulkUpload},
            {content: 'Download All', iconName: 'upload', className: 'inner-button', clickFunction: this.handleDownloadAll},
            {content: 'Branch Upload Template', iconName: 'file excel outline', className: '', clickFunction: this.handleBranchUploadTemplate}
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
                {value: 'branchId'},
                {value: 'city'},
                {value: 'state'},
                {value: 'zipCode'},
                {value: 'status'},
                {value: 'dateAdded'},
                {value: 'details'}
            ]
        }
    };

    return (
        <>
            <SideNav menuInfo={mainSideNavInfo} activeItem={activeItemMain} handleItemClick={this.handleItemClickMain} />
            {activeItemMain === 'POS' ? (
                <SecondarySideNav menuInfo={secondarySideNavInfo} handleItemClick={this.handleSecondaryItemClick}/>
            ) : (
                null
            )}
            <Grid className='manage-data-content-container'>
                {activeItemMain === 'POS' ? (
                    <Grid.Column>
                        <Segment>
                            Please select a year from the POS Data Summary menu to view or upload data.
                        </Segment>
                    </Grid.Column>
                ) : (
                    null
                )}
                {activeItemMain === 'Branch' ? (
                    <InteractiveTableLayout pageInfo={branchPageInfo} tableContent={branchData}/>
                ) : (
                    null
                )}
            </Grid>
        </>
    );
  }
}

export default withRouter(ManageData);