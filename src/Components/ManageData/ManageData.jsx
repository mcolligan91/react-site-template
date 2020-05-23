import React, { Component } from 'react';
import { Grid, Segment, Button, Input, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import SideNav from './../../Shared/SideNav/SideNav';
import SecondarySideNav from './../../Shared/SecondarySideNav/SecondarySideNav';
import InteractiveTableLayout from './../../Shared/InteractiveTableLayout/InteractiveTableLayout';
import InputForm from './../../Shared/InputForm/InputForm';
import ModuleTable from './../../Shared/ModuleTable/ModuleTable';

import './manage-data.scss';

let yearOptions = [
    {key: 'All Years', value: 'All Years', text: 'All Years'},
    {key: 2020, value: 2020, text: 2020},
    {key: 2019, value: 2019, text: 2019},
    {key: 2018, value: 2018, text: 2018}
];

let monthOptions = [
    {key: 'All Months', value: 'All Months', text: 'All Months'},
    {key: 'Jan', value: 'Jan', text: 'Jan'},
    {key: 'Feb', value: 'Feb', text: 'Feb'},
    {key: 'March', value: 'March', text: 'March'}
];

class ManageData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemMain: 'POS',
            branchData: [],
            productData: [],
            productUploadData: [],
            selectedDate: null
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
    }

    handleItemClickMain = (e, { name }) => {
        this.setState({ activeItemMain: name });
        
        //will pull with ajax call - switch statement will specify URL
        setTimeout(() => { 
            switch (name) {
                case 'Branch':
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
                        ]
                    });
                    break;

                case 'Product': 
                    this.setState({ productData: [
                            {distributor: 'Distributor A', productIds: 150, invoicedProdCat: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat1: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat2: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat3: Math.floor(Math.random() * 100) + 1 + '%'},
                            {distributor: 'Distributor B', productIds: 150, invoicedProdCat: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat1: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat2: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat3: Math.floor(Math.random() * 100) + 1 + '%'},
                            {distributor: 'Distributor C', productIds: 150, invoicedProdCat: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat1: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat2: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat3: Math.floor(Math.random() * 100) + 1 + '%'},
                            {distributor: 'Distributor D', productIds: 150, invoicedProdCat: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat1: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat2: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat3: Math.floor(Math.random() * 100) + 1 + '%'},
                            {distributor: 'Distributor E', productIds: 150, invoicedProdCat: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat1: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat2: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat3: Math.floor(Math.random() * 100) + 1 + '%'},
                           
                        ], 
                        productUploadData: [
                            {fileName: 'Product_v1.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'},
                            {fileName: 'Product_v2.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'},
                            {fileName: 'Product_v3.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'},
                            {fileName: 'Product_v4.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'},
                            {fileName: 'Product_v5.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'},
                            {fileName: 'Product_v6.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'},
                            {fileName: 'Product_v7.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'},
                            {fileName: 'Product_v8.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'},
                            {fileName: 'Product_v9.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'}
                        ]
                    });
                    //load product data
                    break;

                case 'Customer': 
                    //load customer data
                    break;

                default:
                    //error message
            }
            
        }, 2000); 
    }

    handleSecondaryItemClick = (e, data) => {
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

    handleDownloadProducts = (data) => {
        console.log(data);
    }

    handleFilterProductData = (e, data) => {
        debugger;
    }

    handleDownloadProductUpload = () => {
        debugger;
    }

  render() {
    const {activeItemMain, branchData, selectedDate, productData, productUploadData} = this.state;

    const mainSideNavInfo = [
        {name: 'POS', iconName: 'shopping cart'},
        {name: 'Branch', iconName: 'map marker alternate'},
        {name: 'Product', iconName: 'grid layout'},
        {name: 'Customer', iconName: 'address book'}
    ];

    const secondarySideNavInfo = {
        title: 'Data Summary',
        initialIndex: 0,
        menuItems: [
            {title: '2020', content: [{month: 'January', status: 3}, {month: 'February', status: 2}, {month: 'March', status: 1}, {month: 'April', status: 1}, {month: 'May', status: 1}, {month: 'June', status: 1}, {month: 'July', status: 1}, {month: 'August', status: 1}, {month: 'September', status: 1}, {month: 'October', status: 1}, {month: 'November', status: 1}, {month: 'December', status: 1}]},
            {title: '2019', content: [{month: 'January', status: 3}, {month: 'February', status: 2}, {month: 'March', status: 1}, {month: 'April', status: 1}, {month: 'May', status: 1}, {month: 'June', status: 1}, {month: 'July', status: 1}, {month: 'August', status: 1}, {month: 'September', status: 1}, {month: 'October', status: 1}, {month: 'November', status: 1}, {month: 'December', status: 1}]},
            {title: '2018', content: [{month: 'January', status: 3}, {month: 'February', status: 2}, {month: 'March', status: 1}, {month: 'April', status: 1}, {month: 'May', status: 1}, {month: 'June', status: 1}, {month: 'July', status: 1}, {month: 'August', status: 1}, {month: 'September', status: 1}, {month: 'October', status: 1}, {month: 'November', status: 1}, {month: 'December', status: 1}]},
            {title: '2017', content: [{month: 'January', status: 3}, {month: 'February', status: 2}, {month: 'March', status: 1}, {month: 'April', status: 1}, {month: 'May', status: 1}, {month: 'June', status: 1}, {month: 'July', status: 1}, {month: 'August', status: 1}, {month: 'September', status: 1}, {month: 'October', status: 1}, {month: 'November', status: 1}, {month: 'December', status: 1}]},
            {title: '2016', content: [{month: 'January', status: 3}, {month: 'February', status: 2}, {month: 'March', status: 1}, {month: 'April', status: 1}, {month: 'May', status: 1}, {month: 'June', status: 1}, {month: 'July', status: 1}, {month: 'August', status: 1}, {month: 'September', status: 1}, {month: 'October', status: 1}, {month: 'November', status: 1}, {month: 'December', status: 1}]},
            {title: '2015', content: [{month: 'January', status: 3}, {month: 'February', status: 2}, {month: 'March', status: 1}, {month: 'April', status: 1}, {month: 'May', status: 1}, {month: 'June', status: 1}, {month: 'July', status: 1}, {month: 'August', status: 1}, {month: 'September', status: 1}, {month: 'October', status: 1}, {month: 'November', status: 1}, {month: 'December', status: 1}]}
        ]
    };

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

    const productInfo = {
        title: 'Product Data',
        filters: [
            {name: 'year', defaultValue: 'All Years', options: yearOptions, clickFunction: this.handleFilterProductData},
            {name: 'month', defaultValue: 'All Months', options: monthOptions, clickFunction: this.handleFilterProductData}
        ],
        pagingUnits: 'Products',
        tableInfo: {
            headers: [
                {text: 'Distributor'},
                {text: 'Unique Product IDs'},
                {text: 'Invoiced w/ ProductCategory'},
                {text: 'Invoiced w/ ProductSubCategory1'},
                {text: 'Invoiced w/ ProductSubCategory2'},
                {text: 'Invoiced w/ ProductSubCategory3'}
            ],
            cellData: [
                {type: 'text', value: 'distributor'},
                {type: 'text', value: 'productIds'},
                {type: 'text', value: 'invoicedProdCat'},
                {type: 'text', value: 'invoicedProdSubCat1'},
                {type: 'text', value: 'invoicedProdSubCat2'},
                {type: 'text', value: 'invoicedProdSubCat3'}
            ]
        }
    };

    const productDownloadInfo = {
        title: 'Product Download',
        submitFunction: this.handleDownloadProducts,
        buttonText: 'Download',
        buttonIcon: 'download',
        fields: [
            {
                fieldType: 'dropdown', 
                options: [
                    { key: 50, value: 50, text: 50 },
                    { key: 100, value: 100, text: 100 },
                    { key: 500, value: 500, text: 500 },
                    { key: 1000, value: 1000, text: 1000 }
                ], 
                label: 'Number of Products to Return', 
                placeholder: 'Please select...',
                name: 'returnProductsAmount'
            },
            {
                fieldType: 'dropdown', 
                options: [
                    { key: 'All', value: 'All', text: 'All' },
                    { key: '75%', value: '75%', text: '75%' },
                    { key: '50%', value: '50%', text: '50%' },
                    { key: '25%', value: '25%', text: '25%' }
                ], 
                label: 'Total Invoiced Percentile', 
                placeholder: 'Please select...', 
                name: 'totalInvoiced'
            },
            {
                fieldType: 'dropdown', 
                options: [
                    { key: 'All', value: 'All', text: 'All' },
                    { key: 'Complete', value: 'Complete', text: 'Complete' },
                    { key: 'Inomplete', value: 'Inomplete', text: 'Inomplete' }
                ], label: 'Product Status', 
                placeholder: 'Please select...', 
                name: 'productStatus'
            },
            {
                fieldType: 'dropdown', 
                options: [
                    { key: 'All', value: 'All', text: 'All' },
                    { key: 'Distributor A', value: 'Distributor A', text: 'Distributor A' },
                    { key: 'Distributor B', value: 'Distributor B', text: 'Distributor B' }
                ], 
                label: 'Distributor', 
                placeholder: 'Please select...', 
                name: 'distributor'
            },
            {
                fieldType: 'dropdown', 
                options: [
                    { key: 'All', value: 'All', text: 'All' },
                    { key: 2020, value: 2020, text: 2020 },
                    { key: 2019, value: 2019, text: 2019 },
                    { key: 2018, value: 2018, text: 2018 }
                ], 
                label: 'Year', 
                placeholder: 'Please select...', 
                name: 'year'
            },
            {
                fieldType: 'dropdown', 
                options: [
                    { key: 'All', value: 'All', text: 'All' },
                    { key: 'January', value: 'January', text: 'January' },
                    { key: 'February', value: 'February', text: 'February' },
                    { key: 'March', value: 'March', text: 'March' }
                ], 
                label: 'Month', 
                placeholder: 'Please select...', 
                name: 'month'
            },
        ]
    };

    const productDownloadFormData = {
        returnProductsAmount: 50, 
        totalInvoiced: 'All',
        productStatus: 'All',
        distributor: 'All',
        year: 'All',
        month: 'All'
    };

    const dataSummary = selectedDate !== null ? (
        <p>date</p>
    ) : (
        null
    );

    const productUploadTable = {
        headers: [
                {text: 'File Name'},
                {text: 'Product Amount'},
                {text: 'Products With Category'},
                {text: 'Date Uploaded'}
            ],
        cellData: [
            {type: 'text', value: 'fileName'},
            {type: 'text', value: 'productAmount'},
            {type: 'text', value: 'prodCategoryAmount'},
            {type: 'text', value: 'dateUploaded'}
        ]
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
                        {selectedDate === null ? (
                            <Segment>
                                Please select a year from the Data Summary menu to view or upload data.
                            </Segment>
                        ) : (
                            {dataSummary}
                        )}
                    </Grid.Column>
                ) : (
                    null
                )}
                {activeItemMain === 'Branch' ? (
                    <InteractiveTableLayout pageInfo={branchPageInfo} tableContent={branchData}/>
                ) : (
                    null
                )}
                {activeItemMain === 'Product' ? (
                   <>
                        <InteractiveTableLayout pageInfo={productInfo} tableContent={productData}/>
                        <Grid.Column width={16} className='product-page-bottom-content'>
                            <Grid stackable doubling padded>
                                <Grid.Column width={8} className='bottom-content-container'>
                                    <Grid>
                                        <Grid.Column width={16}>
                                            <h3 className='product-upload-header'>Product Uploads</h3>
                                            <span className='download-link-text' onClick={this.handleDownloadProductUpload}>Download Template</span>
                                        </Grid.Column>
                                        <Grid.Column width={16} className='product-file-upload'>
                                            <Input fluid type='file' />
                                        </Grid.Column>
                                        <Grid.Column width={16}>
                                            <ModuleTable tableInfo={productUploadTable} tableData={productUploadData} />
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={8} className='bottom-content-container'>
                                    <InputForm formInfo={productDownloadInfo} formData={productDownloadFormData} />
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                    </>                   
                ) : (
                    null
                )}
            </Grid>
        </>
    );
  }
}

export default withRouter(ManageData);