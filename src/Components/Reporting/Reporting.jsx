import React, { Component } from 'react';
import { Button, Grid, Header, Menu, Accordion, List, Icon, Checkbox, Divider, Image, Dimmer, Modal } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import SideNav from './../../Shared/SideNav/SideNav';
import SecondarySideNav from './../../Shared/SecondarySideNav/SecondarySideNav';
import ErrorModal from './../../Shared/ErrorModal/ErrorModal';
import LoadSpinnerFullPage from './../../Shared/LoadSpinnerFullPage/LoadSpinnerFullPage';
import DataExports from './DataExports/DataExports';
import CustomQuery from './CustomQuery/CustomQuery';

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


    /*
	summary: calls handleUpdateActivePage to update activeItemMain state

	params: none

	returns: none
    */
    componentDidMount = () => {
        window.scrollTo(0, 0);
        this.handleUpdateActivePage(0);
    }


    /*
	summary: updates activeItemMain state with index for showing selected subpage, then checks loadedPageIndexes state to see if that subpage api call has already happened since the user has visited the main Manage Data module. If the subpage is not in the loadedPageIndexes array, the loadSubPageData function is called to load the subpage data

	params: index - used for updating activeItemMain state with selected subpage index

	returns: none
    */
    handleUpdateActivePage = (index) => { 
        //for component SideNav, prop activeItem (activeItemMain)
        this.setState({ activeItemMain: index });
        
        if (!this.state.loadedPageIndexes.includes(index)) {
            this.loadSubPageData(index);
        }
    }


    /*
	summary: updates loadedPageIndexes state with selected index, sets currentlyLoadingIndex state to selected index, then calls subpage loading function based on selected index 

	params: index - used for updating loadedPageIndexes state with selected subpage index so function can be bypassed if user selects subpage again while still in main Account module (handleLoadDataExportsPage, handleLoadCustomQueryPage)

	returns: none
    */
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


    /*
	summary: makes api call to load Data Exports subpage data - updates reportTableStatus state with response data on successful response, calls function to open ErrorModal and show error message on unsuccessful response

	params: none

	returns: none
    */
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


    /*
	summary: makes api call to load Custom Query subpage data - updates queryFilterMenuData and salesData states with response data on successful response, updates queryFilterCriteria with filter content info, calculates the amount of sideNav menu items and updates sideNavActiveIndexes state for keeping track of which menu accordions are open and closed (all will start out as open), calls function to open ErrorModal and show error message on unsuccessful response

	params: none

	returns: none
    */
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


    /*
	summary: gets subpage index from clickEvent data and calls handleUpdateActivePage to update activeItemMain state

	params: e and index from clickEvent data

	returns: none
    */
    //for component SideNav, prop handleItemClick
    handleItemClickMain = (e, { index }) => {
        this.handleUpdateActivePage(index);
    }


    /*
	summary: api call that triggers reporting tables to update in the back-end, updates reportTableStatus state with status info for status message display on successful response, calls function to open ErrorModal and show error message on unsuccessful response

	params: none

	returns: none
    */
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


    /*
	summary: updates queryFilterCriteria state when user clicks checkbox in sidenav

	params: e - click event data; data - clicked checkbox div value (e.g. 2020, Alabama) and category (e.g. 'timePeriod', 'location') 

	returns: none
    */
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


    /*
	summary: updates queryFilterCriteria when user clicks on any of the 'Select All' checkboxes in the sidenav menus

	params: e - click event data; info - clicked checkbox div info (checked, label, type, etc.); data - data from the actual menu that was clicked (time period, location, or customer segment)

	returns: none
    */
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


    /*
	summary: updates sideNavActiveIndexes state when user clicks on menu item to trigger clicked menu accordion opening or closing

	params: e - click event data; titleProps - data from menu title Accordion div (index, className, etc.) 

	returns: none
    */
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


    /*
	summary: updates menuModalData state with sidenav modal content based on what menu item was clicked, updates showMenuModal state to true so modal is displayed

	params: e - click event data; data - query filter menu data from menu that was clicked on (category, content, title, etc.)

	returns: none
    */
    handleSideNavMenuClickMobile = (e, data) => {
        this.setState({ menuModalData: data, showMenuModal: true });
    }


    /*
	summary: updates queryFilterMenuData state when user clicks 'Show All' button on sidenav menu that is limiting the amount of menu items shown (currently the Location menu isn't showing all 50 states)

	params: e - click event data; data - query filter menu data from menu that was clicked on (category, content, title, etc.)

	returns: none
    */
    handleExpandMenu = (e, data) => {
        const {queryFilterMenuData} = this.state;
        let targetMenu = queryFilterMenuData.find((obj => obj.category === data.category));

        targetMenu.showAll = !targetMenu.showAll;
        this.setState({ queryFilterMenuData });
    }


    /*
	summary: resets all sidenav menu items by unchecking any checkboxes that are checked, updates isQueryEdited state to false and updates queryFilterCriteria state with everything unchecked

	params: none

	returns: none
    */
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


    /*
	summary: api call that sends data in queryFilterCriteria state to server to update graphs based on user selection, updates salesData state with response data on successful response, calls function to open ErrorModal and show error message on unsuccessful response

	params: none

	returns: none
    */
    handleUpdateGraphs = () => {
        const {queryFilterCriteria} = this.state;
        this.setState({ isPageLoading: true });

        axios.post('/reporting/sales-data', queryFilterCriteria).then(response => {
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
        const {isPageLoading, isQueryEdited, currentlyLoadingIndex, reportTableStatus, menuItemLimit, activeItemMain, sideNavActiveIndexes, queryFilterMenuData, queryFilterCriteria, showMenuModal, menuModalData, salesData} = this.state;

        //for component SideNav, prop menuInfo
        const mainSideNavInfo = [
            {index: 0, name: 'Data Exports', iconName: 'file alternate'},
            {index: 1, name: 'Custom Query', iconName: 'search'}
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
                            <DataExports isLoading={currentlyLoadingIndex === 0} reportTableStatus={reportTableStatus} handleUpdateReportTables={this.handleUpdateReportTables} />
                        </>
                    )}
                    {activeItemMain === 1 && (
                        <>
                            <CustomQuery isQueryEdited={isQueryEdited} salesData={salesData} handleUpdateGraphs={this.handleUpdateGraphs} handleClearFilters={this.handleClearFilters} />
                        </>
                    )}
                </Grid>
            </>
        );
    }
}

export default withRouter(Reporting);