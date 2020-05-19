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
    
    const secondarySideNavInfo = {
        title: 'Content',
        initialIndex: null,
        menuItems: [
            {title: 'Anti-Trust', link: 'anti-trust'},
            {title: 'Security and Confidentiality', link: 'security-and-confidentiality'},
            {title: 'Account Set-Up', link: 'account-set-up'},
            {title: 'Data Submission', link: 'data-submission'},
            {title: 'Reporting', link: 'reporting'},
            {title: 'Data Export', link: 'data-export'}
        ]
    };

    let placeholder = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    const faqs = [
        {title: 'Anti-Trust', id: 'anti-trust', content: placeholder},
        {title: 'Security and Confidentiality', id: 'security-and-confidentiality', content: placeholder},
        {title: 'Account Set-Up', id: 'account-set-up', content: placeholder},
        {title: 'Data Submission', id: 'data-submission', content: placeholder},
        {title: 'Reporting', id: 'reporting', content: placeholder},
        {title: 'Data Export', id: 'data-export', content: placeholder}
    ];

    return (
        <>

            <SecondarySideNav menuInfo={secondarySideNavInfo} handleItemClick={this.handleSecondaryItemClick}/>
            <Grid className='manage-data-content-container'>
                <Grid.Column>
                    <Grid centered verticalAlign='middle'>
                        <Grid.Row centered>
                            <Grid.Column width={12}>
                                <Segment basic textAlign='center'>
                                    <Header as='h2'>Frequently Asked Questions (FAQs)</Header>
                                    <Divider fitted />
                                    <Search input={{ fluid: true }} style={{marginTop: '15px'}} />
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column width={12}>
                                {faqs.map((faq, i) => {
                                    return (
                                        <Segment key={i} id={faq.id} className='faq-container'>
                                            <Header className='main-color' size='small'>{faq.title}</Header>
                                            <p>{faq.content}</p>
                                        </Segment>
                                    )
                                })}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </Grid>
        </>
    );
  }
}

export default withRouter(FAQs);