import React, { Component } from 'react';
import { Grid, Segment, Button, Input, Icon, Menu, Accordion, List, Header, Message, Label, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import SideNav from './../../Shared/SideNav/SideNav';
import SecondarySideNav from './../../Shared/SecondarySideNav/SecondarySideNav';
import InteractiveTableLayout from './../../Shared/InteractiveTableLayout/InteractiveTableLayout';
import InputForm from './../../Shared/InputForm/InputForm';
import ModuleTable from './../../Shared/ModuleTable/ModuleTable';
import ModalForm from './../../Shared/ModalForm/ModalForm';

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
            sideNavActiveIndex: null,
            activeItemMain: 'POS',
            posData: [],
            branchData: [],
            productData: [],
            productUploadData: [],
            selectedSummary: null,
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);

        //will load from view or api call
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
        ]
        this.setState({ posData: posData, sideNavActiveIndex: 0 });
    }

    handleSideNavMenuClick = (e, titleProps) => {
        const {index} = titleProps,
            {sideNavActiveIndex} = this.state,
            newIndex = sideNavActiveIndex === index ? -1 : index;
    
        this.setState({ sideNavActiveIndex: newIndex });
    }

    handleItemClickMain = (e, { name }) => {
        this.setState({ activeItemMain: name });
        
        //will pull with ajax call - switch statement will specify URL
        setTimeout(() => { 
            switch (name) {
                case 'Branch':
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

                default:
                    //error message
            }
            
        }, 2000); 
    }

    handleSecondaryItemClick = (e, data) => {
        //would fire ajax call to load selected summary data and update state based on response

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
            submissionUploadFile: null,
            cleanUploadFile: null,
            comment: ''
        };

        this.setState({ selectedSummary: summary });
    }
    
    // handleBulkUpload = () => {
    //     debugger;
    // }
    
    // handleDownloadAll = () => {
    //     debugger;
    // }
    
    // handleBranchUploadTemplate = () => {
    //     debugger;
    // }

    // handleDownloadProducts = (data) => {
    //     console.log(data);
    // }

    // handleFilterProductData = (e, data) => {
    //     debugger;
    // }

    // handleDownloadProductUpload = () => {
    //     debugger;
    // }

    // handleSubmissionTableButtonClick = () => {

    // }

    handleAddBranch = (data) => {
        //would fire ajax call and update state based on response, instead of 'data' param

        let newUser = {id: 21, branchId: data.branchId, city: data.city, state: data.state, zipCode: data.zipCode, status: data.status,  dateAdded: '5/25/2020', details: data.details};
        this.setState((prevState) => ({
            branchData: [newUser, ...prevState.branchData]
        }));
    }

    handleUploadSubmission = (e) => {
        //would send post call to server with upload data, then update submissions table with new entry based on response

        const {selectedSummary} = this.state;
        selectedSummary.submissionUploadFile = e.target.files[0].name;
        this.setState({ selectedSummary });
    }

    handleUploadCleanFile = (e) => {
        //would send post call to server with upload data, then update submissions table with new entry based on response
        
        const {selectedSummary} = this.state;
        selectedSummary.cleanUploadFile = e.target.files[0].name;
        this.setState({ selectedSummary });
    }

    handleAddComment = (e) => {
        const {selectedSummary} = this.state;
        //post call to server with selectedSummary.comment

        //update state with comment based on success response
        selectedSummary.submissionComments.push(selectedSummary.comment);
        selectedSummary.comment = '';
        this.setState({ selectedSummary });
    }

    handleCommentChange = (e, info) => {
        const {selectedSummary} = this.state;
        selectedSummary.comment = info.value;
        this.setState({ selectedSummary });
    } 

    handleAddBranchClick = () => {
        let formData = {status: '', branchId: '', city: '', state: '', zipCode: '', details: ''};
        this.addBranchModal.handleOpenModal(formData);
    }

    render() {
        const {activeItemMain, sideNavActiveIndex, branchData, selectedSummary, productData, productUploadData, posData} = this.state;

        const mainSideNavInfo = [
            {name: 'POS', iconName: 'shopping cart'},
            {name: 'Branch', iconName: 'map marker alternate'},
            {name: 'Product', iconName: 'grid layout'}
        ];

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

        const addBranchModal = <ModalForm ref={(addBranchModal) => { this.addBranchModal = addBranchModal; }} modalInfo={addBranchModalInfo} handleSubmit={this.handleAddBranch} />;

        const secondSideNavContent = (
            <>
                {posData.map((data, i) => {
                    return (
                        <Menu.Item key={i}>
                            <Accordion styled>
                                <Accordion.Title key={i} className='second-side-nav-menu-item main-background-color' active={sideNavActiveIndex === i} index={i} onClick={this.handleSideNavMenuClick}>
                                    <Icon name='dropdown' />
                                    {data.title}
                                </Accordion.Title>
                                <Accordion.Content active={sideNavActiveIndex === i}>
                                    <List relaxed selection verticalAlign='middle'>
                                        {data.content.map((data, i) => {
                                            let labelColor = data.status === 3 ? 'yellow' : data.status === 2 ? 'teal' : 'red',
                                                labelText = data.status === 3 ? 'Uploaded' : data.status === 2 ? 'Submitted' : 'Missing';
                                            return (
                                                <List.Item key={i} className='second-side-nav-list-item' onClick={(e) => this.handleSecondaryItemClick(e, data)}>
                                                    {data.month}
                                                    <Label className='status-label' size='tiny' color={labelColor} content={labelText} />
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
        
        const secondarySideNavInfo = {
            title: 'Data Summary',
            menuItems: secondSideNavContent
        };

        const branchPageInfo = {
            title: 'Manage Branch Data',
            headerButtons: [
                {content: 'Add Branch', iconName: 'building', className: 'inner-button', clickFunction: this.handleAddBranchClick},
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

        const submissionTableInfo = {
            title: 'Data Submissions',
            hasClickEvents: true,
            headers: [
                    {text: 'Filename'},
                    {text: 'Status'},
                    {text: 'Number of Records'},
                    {text: 'Total Quantity'},
                    {text: 'Notes', props: {textAlign: 'center'}},
                    {text: 'Download', props: {textAlign: 'center'}}
                ],
            cellData: [
                {type: 'text', value: 'fileName'},
                {type: 'text', value: 'status'},
                {type: 'text', value: 'recordsAmount'},
                {type: 'text', value: 'totalQuantity'},
                {type: 'clickItem', iconName: 'sticky note', cellFunction: 'submissionNotes'},
                {type: 'clickItem', iconName: 'cloud download', cellFunction: 'downloadSubmissions'}
            ]
        };

        const dataSummaryContent = selectedSummary !== null ? (
            <Grid relaxed padded>
                <Grid.Column width={16}>
                    <Header as='h2'>{`${selectedSummary.month} ${selectedSummary.year} Data Summary`}</Header>
                    <Label className='file-upload-container' basic as="label" htmlFor="upload-submission">
                        <Button icon="upload" label={{ content: 'Upload Submission' }} labelPosition="right" />
                        {selectedSummary.submissionUploadFile}
                        <input id="upload-submission" hidden type="file" onChange={(e) => this.handleUploadSubmission(e)} />
                    </Label>
                </Grid.Column>
                {selectedSummary.status && selectedSummary.status > 1 ? (
                    <>
                        <Grid.Column width={16} className='submission-table-container'>
                            <ModuleTable tableInfo={submissionTableInfo} tableData={selectedSummary.submissionData} handleTableButtonClick={this.handleSubmissionTableButtonClick} />
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Message>
                                <Message.Header>
                                    Submission Notes
                                </Message.Header>
                                <Message.List>
                                    {selectedSummary.submissionNotes.map((note, i) => {
                                        return (
                                            <Message.Item key={i}>{note}</Message.Item>
                                        )
                                    })}
                                </Message.List>
                            </Message>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Label className='file-upload-container' basic as="label" htmlFor="upload-clean-file">
                                <Button icon="upload" label={{ content: 'Upload Clean File' }} labelPosition="right" />
                                {selectedSummary.cleanUploadFile}
                                <input id="upload-clean-file" hidden type="file" onChange={(e) => this.handleUploadCleanFile(e)} />
                            </Label>
                        </Grid.Column>
                        {selectedSummary.status === 3 ? (
                            <Grid.Column width={16}>
                                <Message info>
                                    <Message.Header>
                                        Review Notes
                                    </Message.Header>
                                    <Message.List>
                                    {selectedSummary.reviewNotes.map((note, i) => {
                                            return (
                                                <Message.Item key={i}>{note}</Message.Item>
                                            )
                                        })}
                                    </Message.List>
                                </Message>
                            </Grid.Column>
                        ) : (
                            null
                        )}
                        {selectedSummary.submissionComments.length > 0 ? (
                            <Grid.Column width={16}>
                                <Message>
                                    <Message.Header>
                                        Comments
                                    </Message.Header>
                                    <Message.List>
                                    {selectedSummary.submissionComments.map((comment, i) => {
                                            return (
                                                <Message.Item key={i}>{comment}</Message.Item>
                                            )
                                        })}
                                    </Message.List>
                                </Message>
                            </Grid.Column>
                        ) : (
                            null
                        )}
                        <Grid.Column width={16}>
                            <Form onSubmit={this.handleAddComment}>
                                <Form.TextArea label='Add New Comment' value={selectedSummary.comment} onChange={this.handleCommentChange} />
                                <Button className='main-button-color' type='submit' content='Save' />
                            </Form>
                        </Grid.Column>
                    </>
                ) : (
                    null
                )}
            </Grid>
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
                {addBranchModal}
                <SideNav menuInfo={mainSideNavInfo} activeItem={activeItemMain} handleItemClick={this.handleItemClickMain} />
                {activeItemMain === 'POS' ? (
                    <SecondarySideNav menuInfo={secondarySideNavInfo} />
                ) : (
                    null
                )}
                <Grid className='manage-data-content-container'>
                    {activeItemMain === 'POS' ? (
                        <Grid.Column>
                            {selectedSummary === null ? (
                                <Segment>
                                    Please select a year from the Data Summary menu to view or upload data.
                                </Segment>
                            ) : (
                                <>
                                    {dataSummaryContent}
                                </>
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