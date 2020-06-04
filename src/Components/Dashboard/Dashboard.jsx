import React, { Component } from 'react';
import { Message, Grid, Header, Dimmer, Loader } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import ModuleTable from './../../Shared/ModuleTable/ModuleTable';

import './dashboard.scss';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnnouncements: true,
            announcements: null,
            tasks: [],
            events: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);

        axios.get('/dashboard').then(response => {
            if (response.data.success) {
                const {announcements, tasks, events} = response.data.data;
                this.setState({ announcements, tasks, events });
            } else {
                //error modal
            }
        }).catch(error => {
            //error modal
        });
    }

    handleHideAnnouncements = () => {
        this.setState({ showAnnouncements: false });
    } 

    render() {
        const {showAnnouncements, announcements, tasks, events} = this.state;

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

        return (
            <>
                {showAnnouncements ? (
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Grid padded>
                                <Grid.Column>
                                    <Header as='h3'>Announcements</Header>
                                    <Dimmer.Dimmable className='announcements-dimmer' blurring dimmed={announcements === null}>
                                        <Dimmer active={announcements === null}>
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
                ) : (
                    null
                )}
                <Grid.Row columns={2} className='dashboard-tables-container'>
                    <Grid.Column computer={10} tablet={16} mobile={16}>
                        <Grid padded>
                            <ModuleTable tableInfo={taskTable} tableData={tasks} />
                        </Grid>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={16} mobile={16}>
                        <Grid padded>
                            <ModuleTable tableInfo={eventTable} tableData={events} />
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </>
        );
    }
}

export default withRouter(Dashboard);