import React, { Component } from 'react';
import { Dropdown, Button, Grid, Header, Message, Menu, Accordion, List, Icon, Checkbox } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import SideNav from './../../Shared/SideNav/SideNav';
import SecondarySideNav from './../../Shared/SecondarySideNav/SecondarySideNav';

import './reporting.scss';

class Reporting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideNavActiveIndexes: [0, 1, 2],
            activeItemMain: 'Data Exports',
            queryFilterMenuData: [],
            queryFilterCriteria: {timePeriod: [], location: [], segment: []}
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);

        //will load from view or api call
        let filterData = [
            {
                title: 'Time Period',
                content: [
                    {value: 2020, category: 'timePeriod'},
                    {value: 2019, category: 'timePeriod'},
                    {value: 2018, category: 'timePeriod'},
                    {value: 2017, category: 'timePeriod'},
                    {value: 2016, category: 'timePeriod'},
                    {value: 2015, category: 'timePeriod'}
                ]
            },
            {
                //cutting list short for this site template
                title: 'Location',
                content: [
                    {value: 'Alaska', category: 'location'},
                    {value: 'Alabama', category: 'location'},
                    {value: 'Arkansas', category: 'location'},
                    {value: 'Arizona', category: 'location'},
                    {value: 'California', category: 'location'},
                    {value: 'Colorado', category: 'location'}
                ]
            },
            {
                title: 'Customer Segment',
                content: [
                    {value: 'Commercial', category: 'segment'},
                    {value: 'Industrial', category: 'segment'},
                    {value: 'Government', category: 'segment'},
                    {value: 'Residential', category: 'segment'},
                    {value: 'Utility', category: 'segment'},
                    {value: 'Unclassified', category: 'segment'}
                ]
            }
        ];

        this.setState({ queryFilterMenuData: filterData })
    }

    handleItemClickMain = (e, { name }) => {
        this.setState({ activeItemMain: name });
    }

    handleSecondaryItemClick = (e, data) => {
        const {queryFilterCriteria} = this.state;
        
        if (queryFilterCriteria[data.category].includes(data.value)) {
            queryFilterCriteria[data.category].pop(data.value);
        } else {
            queryFilterCriteria[data.category].push(data.value);
        }

        this.setState({ queryFilterCriteria });
        console.log(this.state.queryFilterCriteria);
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

  render() {
    const {activeItemMain, sideNavActiveIndexes, queryFilterMenuData} = this.state;

    const mainSideNavInfo = [
        {name: 'Data Exports', iconName: 'file alternate'},
        {name: 'Custom Query', iconName: 'search'}
    ];

    //placeholder
    let dropdownYears = [
        {key: 1, value: '2015', value: 2015},
        {key: 2, value: '2016', value: 2016},
        {key: 3, value: '2017', value: 2017},
        {key: 4, value: '2018', value: 2018},
        {key: 5, value: '2019', value: 2019},
        {key: 6, value: '2010', value: 2020},
    ];

    //placeholder
    let dropdownOrgs = [
        {key: 1, value: 'Org A', value: 1},
        {key: 2, value: 'Org B', value: 2},
        {key: 3, value: 'Org C', value: 3},
    ];

    const secondSideNavContent = (
        <>
            {queryFilterMenuData.map((data, i) => {
                return (
                    <Menu.Item key={i}>
                        <Accordion styled>
                            <Accordion.Title key={i} className='second-side-nav-menu-item main-background-color' index={i} active={sideNavActiveIndexes.includes(i)} onClick={this.handleSideNavMenuClick}>
                                <Icon name='dropdown' />
                                {data.title}
                            </Accordion.Title>
                            <Accordion.Content active={sideNavActiveIndexes.includes(i)}>
                                <List relaxed>
                                    {data.content.map((data, i) => {
                                        return (
                                            <List.Item key={i} onClick={(e) => this.handleSecondaryItemClick(e, data)}>
                                                <Checkbox label={data.value} />
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