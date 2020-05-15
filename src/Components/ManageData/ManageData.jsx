import React, { Component } from 'react';
import { Message, Button, Grid, Header, Icon, Menu, Table } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import ModuleTable from './../../Shared/ModuleTable/ModuleTable';

import './manage-data.scss';

class ManageData extends Component {
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
            {value: 'summary'},
            {value: 'date'}
        ]
    };

    const eventTable = {
        title: 'Recent Activity',
        headers: [
                {width: 14, text: 'Summary'},
                {width: 2, text: 'Date'}
            ],
        cellData: [
            {value: 'summary'},
            {value: 'date'}
        ]
    };

    return (
        <>
            <Menu icon='labeled' vertical>
                <Menu.Item>
                    <Icon name='shopping cart'></Icon>
                    POS
                </Menu.Item>
                <Menu.Item>
                    <Icon name='shopping cart'></Icon>
                    POS
                </Menu.Item>
                <Menu.Item>
                    <Icon name='shopping cart'></Icon>
                    POS
                </Menu.Item>
                <Menu.Item>
                    <Icon name='shopping cart'></Icon>
                    POS
                </Menu.Item>
            </Menu>
                

        </>
    );
  }
}

export default withRouter(ManageData);