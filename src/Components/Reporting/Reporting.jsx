import React, { Component } from 'react';
import { Dropdown, Button, Grid, Header, Message, Menu, Accordion, List, Icon, Checkbox } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import SideNav from './../../Shared/SideNav/SideNav';
import SecondarySideNav from './../../Shared/SecondarySideNav/SecondarySideNav';

import './reporting.scss';

//for populating query filter menu - would actually be pulled from database
let states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

class Reporting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItemLimit: 10,
            sideNavActiveIndexes: [0, 1, 2],
            activeItemMain: 'Data Exports',
            queryFilterMenuData: [],
            queryFilterCriteria: {}
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);

        //temp function for states list - would load from database
        let statesList = [];
        for (let i = 0; i < states.length; i++) {
            statesList.push({value: states[i], category: 'location'});
        }
        //will load from api call
        let filterData = [
            {
                title: 'Time Period',
                category: 'timePeriod',
                content: [
                    {value: 2020, category: 'timePeriod'},
                    {value: 2019, category: 'timePeriod'},
                    {value: 2018, category: 'timePeriod'},
                    {value: 2017, category: 'timePeriod'},
                    {value: 2016, category: 'timePeriod'},
                    {value: 2015, category: 'timePeriod'}
                ],
                showAll: true,
                limitData: false
            },
            {
                //cutting list short for this site template
                title: 'Location',
                category: 'location',
                content: statesList,
                showAll: false,
                limitData: true
            },
            {
                title: 'Customer Segment',
                category: 'segment',
                content: [
                    {value: 'Commercial', category: 'segment'},
                    {value: 'Industrial', category: 'segment'},
                    {value: 'Government', category: 'segment'},
                    {value: 'Residential', category: 'segment'},
                    {value: 'Utility', category: 'segment'},
                    {value: 'Unclassified', category: 'segment'}
                ],
                showAll: true,
                limitData: false
            }
        ];

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

        this.setState({ queryFilterMenuData: filterData, queryFilterCriteria: filterCriteria })
    }

    handleItemClickMain = (e, { name }) => {
        this.setState({ activeItemMain: name });
    }

    handleSecondaryItemClick = (e, data) => {
        
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

    handleExpandMenu = (e, data) => {
        const {queryFilterMenuData} = this.state;
        let targetMenu = queryFilterMenuData.find((obj => obj.category === data.category));

        targetMenu.showAll = !targetMenu.showAll;
        this.setState({ queryFilterMenuData });
    }

  render() {
    const {menuItemLimit, activeItemMain, sideNavActiveIndexes, queryFilterMenuData, queryFilterCriteria} = this.state;

    const mainSideNavInfo = [
        {name: 'Data Exports', iconName: 'file alternate'},
        {name: 'Custom Query', iconName: 'search'}
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
                            <Accordion.Title key={i} className='second-side-nav-menu-item main-background-color' index={i} active={sideNavActiveIndexes.includes(i)} onClick={this.handleSideNavMenuClick}>
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
                                    {data.limitData ? (
                                        <List.Item>
                                            <p className='main-color menu-expand-text' onClick={(e) => this.handleExpandMenu(e, data)}>{data.showAll ? '‒ Show Less' : '+ Show All'}</p>
                                        </List.Item>
                                    ) : (
                                        null
                                    )}
                                </List>
                            </Accordion.Content>
                        </Accordion> 
                    </Menu.Item>
                )
            })}
        </>
    );
        
    const secondarySideNavInfo = {
        title: 'Query Filters',
        menuItems: secondSideNavContent
    };

    return (
        <>
            <SideNav menuInfo={mainSideNavInfo} activeItem={activeItemMain} handleItemClick={this.handleItemClickMain} />
            <Grid className='manage-data-content-container'>
                {activeItemMain === 'Data Exports' ? (
                    <>
                        <Grid.Row centered>
                            <Grid.Column width={12}>
                                <Grid className='data-exports-top-row' stackable doubling>
                                    <Header as='h2' className='data-exports-header'>Update Custom Report Tables</Header>
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <Message info>
                                                <Message.Header>Update in progress</Message.Header>
                                                <p>User A began updating the reporting tables on 5/1/2020.</p>
                                            </Message>
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
                ) : (
                    null
                )}
                {activeItemMain === 'Custom Query' ? (
                    <>
                        <SecondarySideNav menuInfo={secondarySideNavInfo} />
                        <p>custom query</p>
                    </>
                ) : (
                    null
                )}
            </Grid>
        </>
    );
  }
}

export default withRouter(Reporting);