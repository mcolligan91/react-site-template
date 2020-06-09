import React, { Component } from 'react';
import { Dropdown, Button, Grid, Header, Dimmer, Loader, Message } from 'semantic-ui-react';

import './data-exports.scss';

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

class DataExports extends Component {

    render() {
        const {isLoading, reportTableStatus, handleUpdateReportTables} = this.props;

        const reportStatusContainer = (
            <Dimmer.Dimmable blurring dimmed={isLoading}>
                <Dimmer className='report-status-dimmer' active={isLoading}>
                    <Loader>Loading</Loader>
                </Dimmer>
                <Message className={`report-status-message ${reportTableStatus.status === 1 ? 'positive' : 'warning'}`}>
                    <Message.Header>{reportTableStatus.status === 1 ? 'Tables Updated' : 'Update In Progress'}</Message.Header>
                    <p>{reportTableStatus.summary}</p>
                </Message>
            </Dimmer.Dimmable>
        );

        return (
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
                                    <Button className='main-button-color' fluid disabled={reportTableStatus.status === 2} onClick={handleUpdateReportTables}>Update</Button>
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
        );
    }
}

export default DataExports;

                        