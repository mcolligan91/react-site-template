import React, { Component } from 'react';
import { Grid, Segment, Icon, Menu, Accordion, List, Label, Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import SideNav from './../../Shared/SideNav/SideNav';
import SecondarySideNav from './../../Shared/SecondarySideNav/SecondarySideNav';
import LoadSpinnerFullPage from './../../Shared/LoadSpinnerFullPage/LoadSpinnerFullPage';
import ErrorModal from './../../Shared/ErrorModal/ErrorModal';
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
            activeItemMain: null,
            selectedSummary: null,
            posData: [],
            branchData: [],
            productData: [],
            productUploadData: [],
            currentlyLoadingIndex: null,
            loadedPageIndexes: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        this.handleUpdateActivePage(0);
    }

    handleUpdateActivePage = (index) => { 
        //for component SideNav, prop activeItem (activeItemMain)
        this.setState({ activeItemMain: index });
        
        if (!this.state.loadedPageIndexes.includes(index)) {
            this.loadSubPageData(index);
        }
    }

    //for component SideNav, prop handleItemClick
    handleItemClickMain = (e, { index }) => {
        this.handleUpdateActivePage(index);
    }

    loadSubPageData = (index) => {
        const {loadedPageIndexes} = this.state;
        
        loadedPageIndexes.push(index);
        this.setState({ loadedPageIndexes, currentlyLoadingIndex: index });
      
        switch (index) {
            case 0:
                this.handleLoadPosPageData();
                break;

            case 1:
                this.handleLoadBranchData();
                break;

            case 2:
                this.handleLoadProductData();
                break;

            default:
                //pass
        }
    }

    handleLoadPosPageData = () => {
        axios.get('/data/pos').then(response => {
            if (response.data.success) {
                const {posData} = response.data.data;
                this.setState({ posData, sideNavActiveIndex: 0 });
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ currentlyLoadingIndex: null });
        });
    }

    //for component Branch, prop tableContent
    handleLoadBranchData = () => {
        axios.get('/data/branch').then(response => {
            if (response.data.success) {
                const {branchData} = response.data.data;
                this.setState({ branchData });
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ currentlyLoadingIndex: null });
        });
    }

    //for component Product, prop productData (productData)
    //for component Product, prop productUploadData (productUploadData)
    handleLoadProductData = () => {
        axios.get('/data/product').then(response => {
            if (response.data.success) {
                const {productData, productUploadData} = response.data.data;
                this.setState({ productData, productUploadData });
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ currentlyLoadingIndex: null });
        });
    }

    handleSideNavMenuClick = (e, titleProps) => {
        const {index} = titleProps,
            {sideNavActiveIndex} = this.state,
            newIndex = sideNavActiveIndex === index ? -1 : index;
    
        this.setState({ sideNavActiveIndex: newIndex });
    }

    handleSecondaryItemClick = (e, data) => {
        this.setState({ isPageLoading: true });

        //for component DataSummaryContent, prop selectedSummary
        axios.get(`/data/summary/${data.id}`).then(response => {
            if (response.data.success) {
                const {selectedSummary} = response.data.data;
                this.setState({ selectedSummary });
                window.scrollTo(0, 0);
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }

    //for component Branch, prop handleAddBranch
    handleAddBranch = (data) => {
        //would fire ajax call and update state based on response, instead of 'data' param
        this.setState({ isPageLoading: true });

        axios.post('/data/branch', data).then(response => {
            if (response.data.success) {
                const {newBranch} = response.data.data;
                this.setState((prevState) => ({
                    branchData: [newBranch, ...prevState.branchData]
                }));
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
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
        const {isPageLoading, currentlyLoadingIndex, activeItemMain, sideNavActiveIndex, branchData, selectedSummary, productData, productUploadData, posData} = this.state;

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

        const pageLoadSpinner = isPageLoading && (
            <LoadSpinnerFullPage />
        ); 

        const errorModal = (
            <ErrorModal ref={(errorModal) => { this.errorModal = errorModal; }} />
        );

        return (
            <>
                {errorModal}
                {pageLoadSpinner}
                <SideNav menuInfo={mainSideNavInfo} activeItem={activeItemMain} handleItemClick={this.handleItemClickMain} />
                {activeItemMain === 0 && (
                    <SecondarySideNav isLoading={currentlyLoadingIndex === 0} menuInfo={secondarySideNavInfo} />
                )}
                <Grid className='manage-data-content-container'>
                    {activeItemMain === 0 && (
                        <Grid.Column>
                            {selectedSummary === null ? (
                                <Segment className='data-summary-prompt'>
                                    Please select a year from the Data Summary menu to view or upload data.
                                </Segment>
                            ) : (
                                <DataSummaryContent selectedSummary={selectedSummary} handleUploadSubmission={this.handleUploadSubmission} handleUploadCleanFile={this.handleUploadCleanFile} handleAddComment={this.handleAddComment} handleSubmissionTableButtonClick={this.handleSubmissionTableButtonClick} />
                            )}
                        </Grid.Column>
                    )}
                    {activeItemMain === 1 && (
                        <Branch isLoading={currentlyLoadingIndex === 1} branchTableContent={branchData} handleAddBranch={this.handleAddBranch} handleBulkUpload={this.handleBulkBranchUpload} handleDownloadAll={this.handleDownloadAllBranches} />
                    )}
                    {activeItemMain === 2 && (
                        <Product isLoading={currentlyLoadingIndex === 2} productData={productData} productUploadData={productUploadData} handleFilterProductData={this.handleFilterProductData} handleDownloadProducts={this.handleDownloadProducts} />     
                    )}
                </Grid>
            </>
        );
    }
}

export default withRouter(ManageData);