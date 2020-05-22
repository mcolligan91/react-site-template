import React, { Component } from 'react';
import { Dropdown, Button, Grid, Header, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import SideNav from './../../Shared/SideNav/SideNav';

import './reporting.scss';

class Reporting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemMain: 'Data Exports',
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
    }

    handleItemClickMain = (e, { name }) => {
        this.setState({ activeItemMain: name })
    }

  render() {
    const {activeItemMain} = this.state;

    const mainSideNavInfo = [
        {name: 'Data Exports', iconName: 'file alternate'},
        {name: 'Custom Query', iconName: 'search'}
    ];

    //placeholder
    let dropdownYears = [
        {key: 1, text: '2015', value: 2015},
        {key: 2, text: '2016', value: 2016},
        {key: 3, text: '2017', value: 2017},
        {key: 4, text: '2018', value: 2018},
        {key: 5, text: '2019', value: 2019},
        {key: 6, text: '2010', value: 2020},
    ];

    //placeholder
    let dropdownOrgs = [
        {key: 1, text: 'Org A', value: 1},
        {key: 2, text: 'Org B', value: 2},
        {key: 3, text: 'Org C', value: 3},
    ];

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
                    <p>custom query</p>
                ) : (
                    null
                )}
            </Grid>
        </>
    );
  }
}

export default withRouter(Reporting);