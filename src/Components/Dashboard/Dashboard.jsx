import React, { Component } from 'react';
import { Message, Grid, Header, Dimmer, Loader } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import ModuleTable from './../../Shared/ModuleTable/ModuleTable';
import ErrorModal from './../../Shared/ErrorModal/ErrorModal';

import './dashboard.scss';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPageContentLoading: true,
            showAnnouncements: true,
            announcements: [],
            tasks: [],
            events: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);

        //for component ModuleTable, prop isLoading
        //for component ModuleTable, prop tableData
        axios.get('/dashboard').then(response => {
            if (response.data.success) {
                const {announcements, tasks, events} = response.data.data;
                this.setState({ announcements, tasks, events });
            } else {
                this.errorModal.handleOpenModal(response.data.message);
            }
        }).catch(error => {
            this.errorModal.handleOpenModal(error.message);
        }).finally(() => {
            this.setState({ isPageContentLoading: false });
        });
    }

    handleHideAnnouncements = () => {
        this.setState({ showAnnouncements: false });
    } 

    render() {
        const {isPageContentLoading, showAnnouncements, announcements, tasks, events} = this.state;

        //for component ModuleTable, prop tableInfo
        const taskTable = {
            title: 'My Tasks',
            headers: [
                    {width: 14, text: 'Summary'},
                    {width: 2, text: 'Date'}
                ],
            cellData: [
                {type: 'text', value: 'summary'},
                {type: 'text', value: 'date'}
            ]
        };

        //for component ModuleTable, prop tableInfo
        const eventTable = {
            title: 'Recent Activity',
            headers: [
                    {width: 14, text: 'Summary'},
                    {width: 2, text: 'Date'}
                ],
            cellData: [
                {type: 'text', value: 'summary'},
                {type: 'text', value: 'date'}
            ]
        };

        const errorModal = (
            <ErrorModal ref={(errorModal) => { this.errorModal = errorModal; }} />
        );

        return (
            <>
                {errorModal}
                {showAnnouncements && (
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Grid padded>
                                <Grid.Column>
                                    <Header as='h3'>Announcements</Header>
                                    <Dimmer.Dimmable className='announcements-dimmer' blurring dimmed={isPageContentLoading}>
                                        <Dimmer active={isPageContentLoading}>
                                            <Loader>Loading</Loader>
                                        </Dimmer>
                                        <Message info onDismiss={this.handleHideAnnouncements}>
                                            {announcements && announcements.length > 0 ? (
                                                <Message.List items={announcements} />
                                            ) : (
                                                <p>
                                                    There are currently no announcements to display.
                                                </p>
                                            )}
                                        </Message>
                                    </Dimmer.Dimmable>
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                )}
                <Grid.Row columns={2} className='dashboard-tables-container'>
                    <Grid.Column computer={10} tablet={16} mobile={16}>
                        <Grid padded>
                            <ModuleTable isLoading={isPageContentLoading} tableInfo={taskTable} tableData={tasks} />
                        </Grid>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={16} mobile={16}>
                        <Grid padded>
                            <ModuleTable isLoading={isPageContentLoading} tableInfo={eventTable} tableData={events} />
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </>
        );
    }
}

export default withRouter(Dashboard);