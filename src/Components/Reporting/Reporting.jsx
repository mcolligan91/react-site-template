import React, { Component } from 'react';
import { Dropdown, Button, Grid, Header, Icon, Menu, Table, Segment, Divider, Message, Label } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import ModuleTable from './../../Shared/ModuleTable/ModuleTable';
import SideNav from './../../Shared/SideNav/SideNav';
import SecondarySideNav from './../../Shared/SecondarySideNav/SecondarySideNav';

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

    return (
        <>
            <SideNav menuInfo={mainSideNavInfo} activeItem={activeItemMain} handleItemClick={this.handleItemClickMain} />
            <Grid className='manage-data-content-container'>
                {activeItemMain === 'Data Exports' ? (
                    <>
                        <Grid.Row centered>
                            <Grid.Column width={12}>
                                <Grid stackable doubling style={{marginTop: '45px'}}>
                                    <Header as='h2' style={{marginBottom: 0}}>Update Custom Report Tables</Header>
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <Message info>
                                                <Message.Header>Update in progress</Message.Header>
                                                <p>User A began updating the reporting tables on 5/1/2020.</p>
                                            </Message>
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <Button fluid>Update</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column width={12}>
                                <Grid stackable doubling style={{marginTop: '30px'}}>
                                    <Header as='h2' style={{marginBottom: 0}}>Update Data Exports</Header>
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <Dropdown placeholder='Please select...' fluid selection />
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <Button fluid>Update</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column width={12}>
                                <Grid stackable doubling style={{marginBottom: '45px', marginTop: '30px'}}>
                                    <Header as='h2' style={{marginBottom: 0}}>Update Custom Report Tables</Header>
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <span>Monthly Data Exports</span>
                                            <Dropdown style={{marginTop: '5px'}} placeholder='Please select...' fluid selection />
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <span>Quarterly Data Exports</span>
                                            <Dropdown style={{marginTop: '5px'}} placeholder='Please select...' fluid selection />
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