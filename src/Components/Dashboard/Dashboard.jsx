import React, { Component } from 'react';
import { Message, Grid, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import ModuleTable from './../../Shared/ModuleTable/ModuleTable';

import './dashboard.scss';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnnouncements: true,
            announcements: [],
            tasks: [],
            events: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);

        //would be loaded from view or from ajax call
        this.setState({ announcements: ['Example announcement 1', 'Example announcement 2', 'Example announcement 3', 'Example announcement 4'] });

        //would be loaded from view or from ajax call
        this.setState({ tasks: [
            {summary: 'Please submit your POS data for Organization A, January 2020.', date: '2/6/2020'},
            {summary: 'Please submit your POS data for Organization B, January 2020.', date: '2/6/2020'},
            {summary: 'Please submit your POS data for Organization C, January 2020.', date: '2/6/2020'},
            {summary: 'Please submit your POS data for Organization D, January 2020.', date: '2/5/2020'},
            {summary: 'Please submit your POS data for Organization E, January 2020.', date: '2/5/2020'},
            {summary: 'Please submit your POS data for Organization F, January 2020.', date: '2/5/2020'},
            {summary: 'Please submit your POS data for Organization G, January 2020.', date: '2/5/2020'},
            {summary: 'Please submit your POS data for Organization H, January 2020.', date: '2/5/2020'},
            {summary: 'Please submit your POS data for Organization I, January 2020.', date: '2/5/2020'}
        ] });

        //would be loaded from view or from ajax call
        this.setState({ events: [
            {summary: 'User A added a new Branch.', date: '2/6/2020'},
            {summary: 'User A submitted POS data for December 2019.', date: '2/6/2020'},
            {summary: 'User A submitted POS data for December 2019.', date: '2/6/2020'},
            {summary: 'User A submitted POS data for December 2019.', date: '2/6/2020'},
            {summary: 'User A submitted POS data for December 2019.', date: '2/6/2020'},
            {summary: 'User A submitted POS data for December 2019.', date: '2/6/2020'},
            {summary: 'User A submitted POS data for December 2019.', date: '2/6/2020'},
            {summary: 'User A submitted POS data for December 2019.', date: '2/6/2020'},
            {summary: 'User A submitted POS data for December 2019.', date: '2/6/2020'},
            {summary: 'User A submitted POS data for December 2019.', date: '2/6/2020'},
            {summary: 'User A submitted POS data for December 2019.', date: '2/6/2020'},
            {summary: 'User A submitted POS data for December 2019.', date: '2/6/2020'},
            {summary: 'User A submitted POS data for December 2019.', date: '2/6/2020'},
            {summary: 'User A submitted POS data for December 2019.', date: '2/6/2020'},
        ] });
    }

    handleHideAnnouncements = () => {
        this.setState({ showAnnouncements: false });
    } 

  render() {
    const {showAnnouncements, announcements, tasks, events} = this.state;

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
        <Grid.Row className='dash-contetnt-row'>
            <Grid.Column width={16}>
                <Grid padded>
                    <Grid.Column>
                        <Header as='h3'>Announcements</Header>
                        <Message info onDismiss={this.handleHideAnnouncements}>
                            <Message.List items={announcements} />
                        </Message>
                    </Grid.Column>
                </Grid>
            </Grid.Column>
        </Grid.Row>
        ) : (
            null
        )}
        <Grid.Row className='dash-contetnt-row' columns={2}>
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