import React, { Component } from 'react';
import { Grid, Input } from 'semantic-ui-react';

import InteractiveTableLayout from './../../../Shared/InteractiveTableLayout/InteractiveTableLayout';
import ModuleTable from './../../../Shared/ModuleTable/ModuleTable';
import InputForm from './../../../Shared/InputForm/InputForm';

import './product.scss';

//placeholder
let yearOptions = [
    {key: 'All Years', value: 'All Years', text: 'All Years'},
    {key: 2020, value: 2020, text: 2020},
    {key: 2019, value: 2019, text: 2019},
    {key: 2018, value: 2018, text: 2018}
];

//placeholder
let monthOptions = [
    {key: 'All Months', value: 'All Months', text: 'All Months'},
    {key: 'January', value: 'January', text: 'January'},
    {key: 'February', value: 'February', text: 'February'},
    {key: 'March', value: 'March', text: 'March'},
    {key: 'April', value: 'April', text: 'April'},
    {key: 'May', value: 'May', text: 'May'},
    {key: 'June', value: 'June', text: 'June'},
    {key: 'July', value: 'July', text: 'July'},
    {key: 'August', value: 'August', text: 'August'},
    {key: 'September', value: 'September', text: 'September'},
    {key: 'October', value: 'October', text: 'October'},
    {key: 'November', value: 'November', text: 'November'},
    {key: 'December', value: 'December', text: 'December'}
];

class Product extends Component {

    handleDownloadProductUpload = () => {
        debugger;
    }

    render() {
        const {isLoading, productData, productUploadData, handleFilterProductData, handleDownloadProducts} = this.props;

        //for component InputForm, prop formData
        const productDownloadFormData = {
            returnProductsAmount: 50, 
            totalInvoiced: 'All',
            productStatus: 'All',
            distributor: 'All',
            year: 'All',
            month: 'All'
        };

        //for component ModuleTable, prop tableInfo
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

        //for component InputForm, prop formInfo
        const productDownloadInfo = {
            title: 'Product Download',
            submitFunction: handleDownloadProducts,
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

        //for component InteractiveTableLayout, prop pageInfo
        const productInfo = {
            title: 'Product Data',
            filters: [
                {name: 'year', defaultValue: 'All Years', options: yearOptions, clickFunction: handleFilterProductData},
                {name: 'month', defaultValue: 'All Months', options: monthOptions, clickFunction: handleFilterProductData}
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
    
        return (
            <>
                <InteractiveTableLayout isLoading={isLoading} pageInfo={productInfo} tableContent={productData}/>
                <Grid.Column width={16} className='product-page-bottom-content'>
                    <Grid stackable doubling padded>
                        <Grid.Column computer={8} tablet={16} className='bottom-content-container'>
                            <Grid>
                                <Grid.Column width={16}>
                                    <h3 className='product-upload-header'>Product Uploads</h3>
                                    <span className='download-link-text' onClick={this.handleDownloadProductUpload}>Download Template</span>
                                </Grid.Column>
                                <Grid.Column width={16} className='product-file-upload'>
                                    <Input fluid type='file' />
                                </Grid.Column>
                                <Grid.Column width={16} className='product-uploads-table-container'>
                                    <ModuleTable isLoading={isLoading} tableInfo={productUploadTable} tableData={productUploadData} />
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column computer={8} tablet={16} className='bottom-content-container'>
                            <InputForm isLoading={isLoading} formInfo={productDownloadInfo} formData={productDownloadFormData} />
                        </Grid.Column>
                    </Grid>
                </Grid.Column>                                                                              
            </>        
        );
    }
}

export default Product;