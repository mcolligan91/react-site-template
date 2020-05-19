import React, { Component } from 'react';
import { Search, Button, Grid, Header, Icon, Menu, Table, Segment, Divider, Pagination } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import SecondarySideNav from './../../Shared/SecondarySideNav/SecondarySideNav';

import './faqs.scss';


class FAQs extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount = () => {
        window.scrollTo(0, 0);        
    }

    handleSecondaryItemClick = () => {
        debugger;
    }

  render() {
    
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

            <SecondarySideNav menuInfo={secondarySideNavInfo} handleItemClick={this.handleSecondaryItemClick}/>

            <Grid className='manage-data-content-container'>
                <Grid.Column>
                    content
                </Grid.Column>
            </Grid>
        </>
    );
  }
}

export default withRouter(FAQs);