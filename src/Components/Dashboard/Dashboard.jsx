import React, { Component } from 'react';
import { Message, Button, Grid, Header, Icon, Menu, Table } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom'

import './dashboard.scss';

import TopNav from '../../Shared/TopNav/TopNav';
import BottomNav from '../../Shared/BottomNav/BottomNav'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnnouncements: true,
            announcements: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);

        this.setState({ announcements: ['Example announcement 1', 'Example announcement 2', 'Example announcement 3'] });
    }

    handleHideAnnouncements = () => {
        this.setState({ showAnnouncements: false });
    } 

  render() {
    const {showAnnouncements, announcements} = this.state;

    return (
      <>
        <TopNav location={this.props.location} />
        <Grid className='dashboard-main-container'>
            {showAnnouncements ? (
            <Grid.Row>
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
            <Grid.Row columns={2}>
                <Grid.Column computer={10} tablet={16} mobile={16}>
                    <Grid padded>
                        <Grid.Column>
                            <Header as='h3'>My Tasks</Header>
                            My Tasks
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column computer={6} tablet={16} mobile={16}>
                    <Grid padded>
                        <Grid.Column>
                            <Header as='h3'>Recent Activiy</Header>
                            Recent Activiy
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <BottomNav />
      </>
    );
  }
}

export default withRouter(Dashboard);