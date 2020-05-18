import React, { Component } from 'react';
import { Search, Button, Grid, Header, Icon, Menu, Table, Segment, Divider, Pagination } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import ModuleTable from './../../Shared/ModuleTable/ModuleTable';
import SideNav from './../../Shared/SideNav/SideNav';
import SecondarySideNav from './../../Shared/SecondarySideNav/SecondarySideNav';

import './manage-data.scss';

class ManageData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemMain: 'POS'
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);

    }

    handleItemClickMain = (e, { name }) => {
        this.setState({ activeItemMain: name })
    }

    handleSecondaryItemClick = () => {
        debugger;
    }

  render() {
    const {activeItemMain} = this.state;

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
                    <Grid.Column>
                        <Grid stackable style={{ padding: '15px' }}>
                            <Grid.Column width={16}>
                                <Header as='h2'>Manage Branch Data</Header>
                                <Divider fitted />
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Search input={{ fluid: true }} />
                            </Grid.Column>
                            <Grid.Column width={10} textAlign='right'>
                                <Button icon labelPosition='left'>
                                    <Icon name='pause' />
                                    Button
                                </Button>
                                <Button icon labelPosition='left'>
                                    <Icon name='pause' />
                                    Button
                                </Button>
                                <Button icon labelPosition='left'>
                                    <Icon name='pause' />
                                    Button
                                </Button>
                                <Button icon labelPosition='left'>
                                    <Icon name='pause' />
                                    Button
                                </Button>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                paging
                            </Grid.Column>
                            <Grid.Column width={8} textAlign='right'>
                                <Pagination
                                boundaryRange={0}
                                defaultActivePage={1}
                                siblingRange={1}
                                totalPages={10}
                                />
                            </Grid.Column>
                            <Grid.Column width={16}>
                                <Table selectable striped>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>
                                                title
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>
                                                content
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                content
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                content
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                content
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                ) : (
                    null
                )}
            </Grid>
        </>
    );
  }
}

export default withRouter(ManageData);