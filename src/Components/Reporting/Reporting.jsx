import React, { Component } from 'react';
import { Dropdown, Button, Grid, Header, Message, Menu, Accordion, List, Icon, Checkbox, Divider, Image, Dimmer, Modal, Loader } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import SideNav from './../../Shared/SideNav/SideNav';
import SecondarySideNav from './../../Shared/SecondarySideNav/SecondarySideNav';
import ErrorModal from './../../Shared/ErrorModal/ErrorModal';
import LoadSpinnerFullPage from './../../Shared/LoadSpinnerFullPage/LoadSpinnerFullPage';

import './reporting.scss';

class Reporting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPageLoading: false,
            reportTableStatus: {},
            isQueryEdited: false,
            menuItemLimit: 10,
            sideNavActiveIndexes: null,
            activeItemMain: null,
            queryFilterMenuData: [],
            queryFilterCriteria: {},
            showMenuModal: false,
            menuModalData: {},
            salesData: [],
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

    loadSubPageData = (index) => {
        const {loadedPageIndexes} = this.state;
        
        loadedPageIndexes.push(index);
        this.setState({ loadedPageIndexes, currentlyLoadingIndex: index });
      
        switch (index) {
            case 0:
                this.handleLoadDataExportsPage();
                break;

            case 1:
                this.handleLoadCustomQueryPage();
                break;

            default:
                //pass
        }
    }

    handleLoadDataExportsPage = () => {
        axios.get('/reporting/status').then(response => {
            if (response.data.success) {
                const {reportTableStatus} = response.data.data;
                this.setState({ reportTableStatus });
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ currentlyLoadingIndex: null });
        });
    }

    handleLoadCustomQueryPage = () => {
        axios.get('/reporting/sales-data').then(response => {
            if (response.data.success) {
                const {queryFilterMenuData, salesData} = response.data.data;

                let filterCriteria = {
                    timePeriod: {
                        allSelected: false,
                        selected: []
                    }, 
                    location: {
                        allSelected: false,
                        selected: []
                    }, 
                    segment: {
                        allSelected: false,
                        selected: []
                    }
                };
        
                let sidenavIndexes = [],
                    filterCount = Object.keys(filterCriteria).length; 
        
                for (let i = 0; i < filterCount; i++) {
                    sidenavIndexes.push(i);
                }
        
                this.setState({ queryFilterMenuData, salesData, queryFilterCriteria: filterCriteria, sideNavActiveIndexes: sidenavIndexes });
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ currentlyLoadingIndex: null });
        });
    }

    //for component SideNav, prop handleItemClick
    handleItemClickMain = (e, { index }) => {
        this.handleUpdateActivePage(index);
    }

    handleUpdateReportTables = () => {
        this.setState({ isPageLoading: true });

        axios.put('/reporting/status').then(response => {
            if (response.data.success) {
                const {reportTableStatus} = response.data.data;
                this.setState({ reportTableStatus });
            }else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false });
        });
    }

    handleSecondaryItemClick = (e, data) => {
        this.setState({ isQueryEdited: true });

        const {queryFilterCriteria} = this.state;
        let category = queryFilterCriteria[data.category].selected,
            allSelected = queryFilterCriteria[data.category].allSelected,
            value = data.value;
            
        if (allSelected) {
            queryFilterCriteria[data.category].allSelected = false;
        }

        if (data) {
            if (category.includes(value)) {
                category.splice(category.indexOf(value), 1);
            } else {
                category.push(value);
            }
    
            this.setState({ queryFilterCriteria });
        }
    }

    handleSecondaryItemSelectAll = (e, info, data) => {
        this.setState( {isQueryEdited: true });

        const {queryFilterCriteria, queryFilterMenuData} = this.state;
        
        if (info.checked) {
            let targetMenu = queryFilterMenuData.find((obj => obj.category === data.category)).content,
                targetCriteria = queryFilterCriteria[data.category].selected;
                
            for (let i = 0; i < targetMenu.length; i++) {
                let value = targetMenu[i].value;
                if (!targetCriteria.includes(value)) {
                    targetCriteria.push(value);
                }
            }
            queryFilterCriteria[data.category].allSelected = true;

        } else {
            queryFilterCriteria[data.category].selected = [];
            queryFilterCriteria[data.category].allSelected = false;
        }
        this.setState({ queryFilterCriteria });
    }

    handleSideNavMenuClick = (e, titleProps) => {
        const {index} = titleProps;
        const {sideNavActiveIndexes} = this.state;
        const newIndex = sideNavActiveIndexes;
        const currentIndexPosition = sideNavActiveIndexes.indexOf(index);

        if (currentIndexPosition > -1) {
          newIndex.splice(currentIndexPosition, 1);
        } else {
          newIndex.push(index);
        }
    
        this.setState({ sideNavActiveIndexes: newIndex });
    }

    handleSideNavMenuClickMobile = (e, data) => {
        this.setState({ menuModalData: data, showMenuModal: true });
    }

    handleExpandMenu = (e, data) => {
        const {queryFilterMenuData} = this.state;
        let targetMenu = queryFilterMenuData.find((obj => obj.category === data.category));

        targetMenu.showAll = !targetMenu.showAll;
        this.setState({ queryFilterMenuData });
    }

    handleClearFilters = () => {
        this.setState( {isQueryEdited: false });

        const {queryFilterCriteria} = this.state;
        let filters = Object.values(queryFilterCriteria);
        
        for (let i = 0; i < filters.length; i++) {
            filters[i].selected = [];
            filters[i].allSelected = false;
        }
        this.setState({ queryFilterCriteria });
    }

    handleUpdateGraphs = () => {
        this.setState({ isPageLoading: true });

        axios.post('/reporting/sales-data').then(response => {
            if (response.data.success) {
                const {salesData} = response.data.data;
                this.setState({ salesData });
            } else {
                throw new Error(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageLoading: false, isQueryEdited: false });
        });
    }

    render() {
        const {isPageLoading, isQueryEdited, currentlyLoadingIndex, reportTableStatus, menuItemLimit, activeItemMain, sideNavActiveIndexes, queryFilterMenuData, queryFilterCriteria, showMenuModal, menuModalData} = this.state;

        //for component SideNav, prop menuInfo
        const mainSideNavInfo = [
            {index: 0, name: 'Data Exports', iconName: 'file alternate'},
            {index: 1, name: 'Custom Query', iconName: 'search'}
        ];

        //placeholder
        let dropdownYears = [
            {key: 1, value: 2015, text: 2015},
            {key: 2, value: 2016, text: 2016},
            {key: 3, value: 2017, text: 2017},
            {key: 4, value: 2018, text: 2018},
            {key: 5, value: 2019, text: 2019},
            {key: 6, value: 2020, text: 2020}
        ];

        //placeholder
        let dropdownOrgs = [
            {key: 1, value: 'Org A', text: 'Org A'},
            {key: 2, value: 'Org B', text: 'Org B'},
            {key: 3, value: 'Org C', text: 'Org C'}
        ];

        const secondSideNavContent = (
            <>
                {queryFilterMenuData.map((data, i) => {
                    let content = data.showAll ? data.content : data.content.slice(0, menuItemLimit);
                    return (
                        <Menu.Item key={i}>
                            <Accordion styled>
                                <Accordion.Title key={i} className='second-side-nav-menu-item main-button-color' index={i} active={sideNavActiveIndexes.includes(i)} onClick={this.handleSideNavMenuClick}>
                                    <Icon name='dropdown' />
                                    {data.title}
                                </Accordion.Title>
                                <Accordion.Content active={sideNavActiveIndexes.includes(i)}>
                                    <List relaxed>
                                        <List.Item>
                                            <Checkbox label='Select All' checked={queryFilterCriteria[data.category].allSelected} onClick={(e, info) => this.handleSecondaryItemSelectAll(e, info, data)} />
                                        </List.Item>
                                        {content.map((contentData, i) => {
                                            return (
                                                <List.Item key={i}>
                                                    <Checkbox label={contentData.value} checked={queryFilterCriteria[data.category].allSelected || queryFilterCriteria[data.category].selected.includes(contentData.value)} onClick={(e) => this.handleSecondaryItemClick(e, contentData)} />
                                                </List.Item>
                                            )
                                        })}
                                        {data.limitData && (
                                            <List.Item>
                                                <p className='main-color menu-expand-text' onClick={(e) => this.handleExpandMenu(e, data)}>{data.showAll ? '‒ Show Less' : '+ Show All'}</p>
                                            </List.Item>
                                        )}
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
                {queryFilterMenuData.map((data, i) => {                    
                    return (
                        <Menu.Item key={i}>
                            <Button className='main-button-color mobile-side-nav-button' content={data.title} onClick={(e) => this.handleSideNavMenuClickMobile(e, data)} />
                        </Menu.Item>
                    )
                })}
            </>
        );

        const secondarySideNavMobileMenu = showMenuModal && ( 
            <Modal className='mobile-menu-modal' dimmer='blurring' closeIcon open={showMenuModal} closeOnDimmerClick={false} onClose={() => this.setState({ showMenuModal: false, menuModalData: {} })}>
                <Modal.Header>
                    {menuModalData.title}
                </Modal.Header>
                <Modal.Content scrolling>
                    <List relaxed>
                        <List.Item>
                            <Checkbox label='Select All' checked={queryFilterCriteria[menuModalData.category].allSelected} onClick={(e, info) => this.handleSecondaryItemSelectAll(e, info, menuModalData)} />
                        </List.Item>
                        {menuModalData.content.map((contentData, i) => {
                            return (
                                <List.Item key={i}>
                                    <Checkbox label={contentData.value} checked={queryFilterCriteria[menuModalData.category].allSelected || queryFilterCriteria[menuModalData.category].selected.includes(contentData.value)} onClick={(e) => this.handleSecondaryItemClick(e, contentData)} />
                                </List.Item>
                            )
                        })}
                   </List>
                </Modal.Content>
            </Modal>
        );

        //for component SecondarySideNav, prop menuInfo    
        const secondarySideNavInfo = {
            title: 'Query Filters',
            menuItems: secondSideNavContent,
            menuItemsMobile: secondSideNavMobileContent
        };

        //using image placeholders instead of real data for now
        const customQueryGraphs = [
            {
                graphs: [
                    {
                        title: 'Year-Over-Year Sales Growth',
                        data: <Image src={require('../../img/example-chart.JPG')} fluid />
                    },
                    {
                        title: 'Year-Over-Year Market Sales Growth',
                        data: <Image src={require('../../img/example-chart.JPG')} fluid />
                    }
                ]
            },
            {
                graphs: [
                    {
                        title: 'Market Sales by Product Type',
                        data: <Image src={require('../../img/example-chart.JPG')} fluid />
                    },
                    {
                        title: 'Estimated Market Sales by Product Type',
                        data: <Image src={require('../../img/example-chart.JPG')} fluid />
                    }
                ]
            },
            {
                graphs: [
                    {
                        title: 'Market Sales by Customer Segment',
                        data: <Image src={require('../../img/example-chart.JPG')} fluid />
                    },
                    {
                        title: 'Estimated Market Sales by Customer Segment',
                        data: <Image src={require('../../img/example-chart.JPG')} fluid />
                    }
                ]
            },
            {
                graphs: [
                    {
                        title: 'Market Sales by Geographic Region',
                        data: <Image src={require('../../img/example-chart.JPG')} fluid />
                    },
                    {
                        title: 'Estimated Market Sales by Geographic Region',
                        data: <Image src={require('../../img/example-chart.JPG')} fluid />
                    }
                ]
            }
        ];

        const reportStatusContainer = (
            <Dimmer.Dimmable blurring dimmed={currentlyLoadingIndex === 0}>
                <Dimmer active={currentlyLoadingIndex === 0}>
                    <Loader>Loading</Loader>
                </Dimmer>
                <Message className={`report-status-message ${reportTableStatus.status === 1 ? 'positive' : 'warning'}`}>
                    <Message.Header>{reportTableStatus.status === 1 ? 'Tables Updated' : 'Update In Progress'}</Message.Header>
                    <p>{reportTableStatus.summary}</p>
                </Message>
            </Dimmer.Dimmable>
        );

        const errorModal = (
            <ErrorModal ref={(errorModal) => { this.errorModal = errorModal; }} />
        );

        const pageLoadSpinner = isPageLoading && (
            <LoadSpinnerFullPage />
        ); 

        return (
            <>
                {pageLoadSpinner}
                {errorModal}
                {secondarySideNavMobileMenu}
                <SideNav menuInfo={mainSideNavInfo} activeItem={activeItemMain} handleItemClick={this.handleItemClickMain} />
                {activeItemMain === 1 && (
                    <SecondarySideNav isLoading={currentlyLoadingIndex === 1} menuInfo={secondarySideNavInfo} />
                )}
                <Grid className='manage-data-content-container'>
                    {activeItemMain === 0 && (
                        <>
                            <Grid.Row centered>
                                <Grid.Column width={12}>
                                    <Grid className='data-exports-top-row' stackable doubling>
                                        <Header as='h2' className='data-exports-header'>Update Custom Report Tables</Header>
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                {reportStatusContainer}
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                <Button className='main-button-color' fluid disabled={reportTableStatus.status === 2} onClick={this.handleUpdateReportTables}>Update</Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered>
                                <Grid.Column width={12}>
                                    <Grid className='data-exports-middle-row' stackable doubling>
                                        <Header as='h2' className='data-exports-header'>Update Data Exports</Header>
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                <Dropdown placeholder='Please select...' fluid selection options={dropdownOrgs} />
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                <Button className='main-button-color' fluid>Update</Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered>
                                <Grid.Column width={12}>
                                    <Grid className='data-exports-bottom-row' stackable doubling>
                                        <Header as='h2' className='data-exports-header'>Update Custom Report Tables</Header>
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                <span>Monthly Data Exports</span>
                                                <Dropdown className='data-exports-dropdown' placeholder='Please select...' fluid selection options={dropdownYears} />
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                <span>Quarterly Data Exports</span>
                                                <Dropdown className='data-exports-dropdown' placeholder='Please select...' fluid selection options={dropdownYears} />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                        </>
                    )}
                    {activeItemMain === 1 && (
                        <>
                            <Grid className='custom-query-content-container'>
                                <Grid.Column textAlign='right' width={16}>
                                    {isQueryEdited && (
                                        <Button className='inner-button' size='small' icon='undo' labelPosition='left' content='Clear All Filters' onClick={this.handleClearFilters} />
                                    )}
                                    <Button className='main-button-color' size='small' icon='save' labelPosition='left' content='Save Search' />
                                    <Divider />
                                </Grid.Column>
                                <Grid.Column width={16}>
                                    <Dimmer.Dimmable blurring dimmed={isQueryEdited}>
                                        <Dimmer className='custom-query-dimmer' inverted verticalAlign='top' active={isQueryEdited}>
                                            <Grid centered>
                                                <Grid.Column width={8}>
                                                    <Header as='h3'>You have changed the filter inputs so that they no longer match the graphs. Click <span className='dimmer-clear-graphs-text main-button-color' onClick={this.handleClearFilters}>here</span> to undo your changes.</Header>
                                                    <Button className='main-button-color' fluid onClick={this.handleUpdateGraphs}>
                                                        <Icon name='chart bar' />
                                                        Update Graphs
                                                    </Button>
                                                </Grid.Column>
                                            </Grid>
                                        </Dimmer>
                                        <Grid stackable doubling padded relaxed>
                                            {customQueryGraphs.map((row, i) => {
                                                return (
                                                    <Grid.Row key={i}>
                                                        {row.graphs.map((graph, j) => {
                                                            return (
                                                                <Grid.Column key={j} width={8} textAlign='center'>
                                                                    <Header as='h3'>{graph.title}</Header>
                                                                    {graph.data}
                                                                </Grid.Column>
                                                            )
                                                        })}
                                                    </Grid.Row>
                                                )
                                            })}
                                        </Grid>
                                    </Dimmer.Dimmable>
                                </Grid.Column>
                            </Grid>
                        </>
                    )}
                </Grid>
            </>
        );
    }
}

export default withRouter(Reporting);