import React, { Component } from 'react';
import { Grid, Segment, Icon, Menu, Accordion, List, Label, Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import SideNav from './../../Shared/SideNav/SideNav';
import SecondarySideNav from './../../Shared/SecondarySideNav/SecondarySideNav';
import LoadSpinnerFullPage from './../../Shared/LoadSpinnerFullPage/LoadSpinnerFullPage';
import DataSummaryContent from './DataSummaryContent/DataSummaryContent';
import Branch from './Branch/Branch';
import Product from './Product/Product';

import './manage-data.scss';

class ManageData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPageLoading: false,
            sideNavActiveIndex: null,
            activeItemMain: 0,
            selectedSummary: null,
            posData: [],
            branchData: [],
            productData: [],
            productUploadData: [],
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);

        //will load from api call response
        let posData = [
            {
                title: '2020', 
                content: [
                    {year: '2020', month: 'June', status: 1}, 
                    {year: '2020', month: 'May', status: 1}, 
                    {year: '2020', month: 'April', status: 1}, 
                    {year: '2020', month: 'March', status: 1}, 
                    {year: '2020', month: 'February', status: 2}, 
                    {year: '2020', month: 'January', status: 3}
                ]
            },
            {
                title: '2019', 
                content: [
                    {year: '2019', month: 'December', status: 1},
                    {year: '2019', month: 'November', status: 1},
                    {year: '2019', month: 'October', status: 1}, 
                    {year: '2019', month: 'September', status: 1}, 
                    {year: '2019', month: 'August', status: 1}, 
                    {year: '2019', month: 'July', status: 1}, 
                    {year: '2019', month: 'June', status: 1}, 
                    {year: '2019', month: 'May', status: 1}, 
                    {year: '2019', month: 'April', status: 1}, 
                    {year: '2019', month: 'March', status: 1}, 
                    {year: '2019', month: 'February', status: 2}, 
                    {year: '2019', month: 'January', status: 3}
                ]
            },
            {
                title: '2018', 
                content: [
                    {year: '2018', month: 'December', status: 1},
                    {year: '2018', month: 'November', status: 1},
                    {year: '2018', month: 'October', status: 1}, 
                    {year: '2018', month: 'September', status: 1}, 
                    {year: '2018', month: 'August', status: 1}, 
                    {year: '2018', month: 'July', status: 1}, 
                    {year: '2018', month: 'June', status: 1}, 
                    {year: '2018', month: 'May', status: 1}, 
                    {year: '2018', month: 'April', status: 1}, 
                    {year: '2018', month: 'March', status: 1}, 
                    {year: '2018', month: 'February', status: 2}, 
                    {year: '2018', month: 'January', status: 3}
                ]
            },
            {
                title: '2017', 
                content: [
                    {year: '2017', month: 'December', status: 1},
                    {year: '2017', month: 'November', status: 1},
                    {year: '2017', month: 'October', status: 1}, 
                    {year: '2017', month: 'September', status: 1}, 
                    {year: '2017', month: 'August', status: 1}, 
                    {year: '2017', month: 'July', status: 1}, 
                    {year: '2017', month: 'June', status: 1}, 
                    {year: '2017', month: 'May', status: 1}, 
                    {year: '2017', month: 'April', status: 1}, 
                    {year: '2017', month: 'March', status: 1}, 
                    {year: '2017', month: 'February', status: 2}, 
                    {year: '2017', month: 'January', status: 3}
                ]
            },
            {
                title: '2016', 
                content: [
                    {year: '2016', month: 'December', status: 1},
                    {year: '2016', month: 'November', status: 1},
                    {year: '2016', month: 'October', status: 1}, 
                    {year: '2016', month: 'September', status: 1}, 
                    {year: '2016', month: 'August', status: 1}, 
                    {year: '2016', month: 'July', status: 1}, 
                    {year: '2016', month: 'June', status: 1}, 
                    {year: '2016', month: 'May', status: 1}, 
                    {year: '2016', month: 'April', status: 1}, 
                    {year: '2016', month: 'March', status: 1}, 
                    {year: '2016', month: 'February', status: 2}, 
                    {year: '2016', month: 'January', status: 3}
                ]
            },
            {
                title: '2015', 
                content: [
                    {year: '2015', month: 'December', status: 1},
                    {year: '2015', month: 'November', status: 1},
                    {year: '2015', month: 'October', status: 1}, 
                    {year: '2015', month: 'September', status: 1}, 
                    {year: '2015', month: 'August', status: 1}, 
                    {year: '2015', month: 'July', status: 1}, 
                    {year: '2015', month: 'June', status: 1}, 
                    {year: '2015', month: 'May', status: 1}, 
                    {year: '2015', month: 'April', status: 1}, 
                    {year: '2015', month: 'March', status: 1}, 
                    {year: '2015', month: 'February', status: 2}, 
                    {year: '2015', month: 'January', status: 3}
                ]
            }
        ];

        this.setState({ posData: posData, sideNavActiveIndex: 0 });
    }

    handleSideNavMenuClick = (e, titleProps) => {
        const {index} = titleProps,
            {sideNavActiveIndex} = this.state,
            newIndex = sideNavActiveIndex === index ? -1 : index;
    
        this.setState({ sideNavActiveIndex: newIndex });
    }

    handleItemClickMain = (e, { index }) => {
        //for component SideNav, prop activeItem
        this.setState({ activeItemMain: index });
        
        //will pull with ajax call - switch statement will specify URL
        setTimeout(() => { 
            switch (index) {
                case 1:
                    //for component Branch, prop tableContent
                    this.setState({ branchData: [
                            {id: 1, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 2, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 3, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 4, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 5, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 6, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 7, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 8, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 9, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 10, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 11, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 12, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 12, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 13, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 14, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 15, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 16, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 17, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 18, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 19, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
                            {id: 20, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'}
                        ]
                    });
                    break;

                case 2: 
                    //for component Product, prop productData (productData)
                    //for component Product, prop productUploadData (productUploadData)
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

                default:
                    //error message
            }
            
        }, 500); 
    }

    handleSecondaryItemClick = (e, data) => {
        //would fire ajax call to load selected summary data and update state based on response
        this.setState({ isPageLoading: true });

        //for component DataSummaryContent, prop selectedSummary
        setTimeout(() => {
            //temp dummy data for submissions
            let submissions = [
                {fileName: 'upload1.csv', status: 'Uploaded', recordsAmount: 423, totalQuantity: 983483437, notes: ''},
                {fileName: 'upload2.csv', status: 'Uploaded', recordsAmount: 423, totalQuantity: 983483437, notes: ''},
                {fileName: 'upload3.csv', status: 'Uploaded', recordsAmount: 423, totalQuantity: 983483437, notes: ''},
                {fileName: 'upload4.csv', status: 'Uploaded', recordsAmount: 423, totalQuantity: 983483437, notes: ''},
                {fileName: 'upload5.csv', status: 'Uploaded', recordsAmount: 423, totalQuantity: 983483437, notes: ''},
                {fileName: 'upload6.csv', status: 'Uploaded', recordsAmount: 423, totalQuantity: 983483437, notes: ''}
            ];

            //temp dummy submission notes
            let submissionNotes = [
                'Submitted by User A on 5/27/2020 10:23:46am'
            ];

            //temp dummy review notes
            let reviewNotes = [
                'Uploaded by User A on 5/28/2020 10:19:23am',
                'Total Unique Branches: 110',
                'Number of New Products: 35467',
                'Number of New Customers: 2'
            ];

            //object for selectedSummary state - would be populated from response data instead of 'data' parameter
            let summary = {
                status: data.status,
                month: data.month,
                year: data.year,
                submissionData: submissions,
                submissionNotes: submissionNotes,
                reviewNotes: reviewNotes,
                submissionComments: [],            
            };

            this.setState({ selectedSummary: summary, isPageLoading: false });
        }, 500);
    }

    //for component Branch, prop handleAddBranch
    handleAddBranch = (data) => {
        //would fire ajax call and update state based on response, instead of 'data' param
        this.setState((prevState) => ({
            isPageLoading: true
        }));

        setTimeout(() => {
            let newUser = {id: 21, branchId: data.branchId, city: data.city, state: data.state, zipCode: data.zipCode, status: data.status,  dateAdded: '5/25/2020', details: data.details};
            this.setState((prevState) => ({
                branchData: [newUser, ...prevState.branchData]
            }));
            this.setState({ isPageLoading: false });
        }, 1000);
    }

    //for component DataSummaryContent, prop handleUploadSubmission
    handleUploadSubmission = (e) => {
        //would send post call to server with upload data, then update submissions table with new entry based on response
        debugger;
    }

    //for component DataSummaryContent, prop handleUploadCleanFile
    handleUploadCleanFile = (e) => {
        //would send post call to server with upload data, then update submissions table with new entry based on response
        debugger;
    }

    //for component DataSummaryContent, prop handleAddComment
    handleAddComment = (comment) => {
        const {selectedSummary} = this.state;
        //post call to server with comment

        //update state with comment based on success response
        selectedSummary.submissionComments.push(comment);
        this.setState({ selectedSummary });
    }

    //for component DataSummary, prop handleSubmissionTableButtonClick
    handleSubmissionTableButtonClick = (button) => {
        debugger;
    }

    //for component Branch, prop handleBulkUpload
    handleBulkBranchUpload = () => {
        debugger;
    }
    
    //for component Branch, prop handleDownloadAll
    handleDownloadAllBranches = () => {
        debugger;
    }

    // for component Branch, prop handleDownloadProducts
    handleDownloadProducts = (data) => {
        console.log(data);
    }

    //for component Branch, prop handleFilterProductData
    handleFilterProductData = (e, data) => {
        debugger;
    }

    render() {
        const {isPageLoading, activeItemMain, sideNavActiveIndex, branchData, selectedSummary, productData, productUploadData, posData} = this.state;

        //for component SideNav, prop menuInfo
        const mainSideNavInfo = [
            {index: 0, name: 'POS', iconName: 'shopping cart'},
            {index: 1, name: 'Branch', iconName: 'map marker alternate'},
            {index: 2, name: 'Product', iconName: 'grid layout'}
        ];

        const secondSideNavContent = (
            <>
                {posData.map((data, i) => {
                    return (
                        <Menu.Item key={i}>
                            <Accordion styled>
                                <Accordion.Title key={i} className='second-side-nav-menu-item main-button-color' active={sideNavActiveIndex === i} index={i} onClick={this.handleSideNavMenuClick}>
                                    <Icon name='dropdown' />
                                    {data.title}
                                </Accordion.Title>
                                <Accordion.Content active={sideNavActiveIndex === i}>
                                    <List relaxed selection verticalAlign='middle'>
                                        {data.content.map((data, i) => {
                                            let labelColor = data.status === 3 ? 'green' : data.status === 2 ? 'teal' : 'red',
                                                labelText = data.status === 3 ? 'Uploaded' : data.status === 2 ? 'Submitted' : 'Missing';
                                            return (
                                                <List.Item key={i} className='second-side-nav-list-item' onClick={(e) => this.handleSecondaryItemClick(e, data)}>
                                                    {data.month}
                                                    <Label className='status-label' basic size='tiny' color={labelColor} content={labelText} />
                                                </List.Item>
                                            )
                                        })}
                                    </List>
                                </Accordion.Content>
                            </Accordion> 
                        </Menu.Item>
                    )
                })}
            </>
        );

        const secondSideNavMobileContent = (
            <>
                {posData.map((data, i) => {
                    return (
                        <Menu.Item key={i}>
                            <Dropdown className='second-side-nav-menu-item main-button-color' fluid item floating text={data.title}>
                                <Dropdown.Menu className='data-summary-dropdown-menu'>
                                    {data.content.map((data, i) => {
                                        let labelColor = data.status === 3 ? 'green' : data.status === 2 ? 'teal' : 'red',
                                            labelText = data.status === 3 ? 'Uploaded' : data.status === 2 ? 'Submitted' : 'Missing';
                                        return (
                                            <Dropdown.Item key={i} className='second-side-nav-list-item' onClick={(e) => this.handleSecondaryItemClick(e, data)}>
                                                <Label className='right floated' basic size='tiny' color={labelColor} content={labelText} />
                                                {data.month}
                                            </Dropdown.Item>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    )
                })}
            </>
        );
        
        //for component SecondarySideNav, prop menuInfo
        const secondarySideNavInfo = {
            title: 'Data Summary',
            menuItems: secondSideNavContent,
            menuItemsMobile: secondSideNavMobileContent
        };

        const pageLoadSpinner = isPageLoading ? (
            <LoadSpinnerFullPage />
        ) : (
            null
        ); 

        return (
            <>
                {pageLoadSpinner}
                <SideNav menuInfo={mainSideNavInfo} activeItem={activeItemMain} handleItemClick={this.handleItemClickMain} />
                {activeItemMain === 0 ? (
                    <SecondarySideNav menuInfo={secondarySideNavInfo} />
                ) : (
                    null
                )}
                <Grid className='manage-data-content-container'>
                    {activeItemMain === 0 ? (
                        <Grid.Column>
                            {selectedSummary === null ? (
                                <Segment className='data-summary-prompt'>
                                    Please select a year from the Data Summary menu to view or upload data.
                                </Segment>
                            ) : (
                                <DataSummaryContent selectedSummary={selectedSummary} handleUploadSubmission={this.handleUploadSubmission} handleUploadCleanFile={this.handleUploadCleanFile} handleAddComment={this.handleAddComment} handleSubmissionTableButtonClick={this.handleSubmissionTableButtonClick} />
                            )}
                        </Grid.Column>
                    ) : (
                        null
                    )}
                    {activeItemMain === 1 ? (
                        <Branch branchTableContent={branchData} handleAddBranch={this.handleAddBranch} handleBulkUpload={this.handleBulkBranchUpload} handleDownloadAll={this.handleDownloadAllBranches} />
                    ) : (
                        null
                    )}
                    {activeItemMain === 2 ? (
                        <Product productData={productData} productUploadData={productUploadData} handleFilterProductData={this.handleFilterProductData} handleDownloadProducts={this.handleDownloadProducts} />     
                    ) : (
                        null
                    )}
                </Grid>
            </>
        );
    }
}

export default withRouter(ManageData);