import React, { Component } from 'react';
import { Search, Grid, Header, Segment, Divider, Menu, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import SecondarySideNav from './../../Shared/SecondarySideNav/SecondarySideNav';

import './faqs.scss';

class FAQs extends Component {

    componentDidMount = () => {
        window.scrollTo(0, 0);        
    }

    render() {

        let sideNavMenuInfo = [
            {title: 'Anti-Trust', abbrv: 'Anti-Trust', link: 'anti-trust'},
            {title: 'Security and Confidentiality', abbrv: 'Security', link: 'security-and-confidentiality'},
            {title: 'Account Set-Up', abbrv: 'Account', link: 'account-set-up'},
            {title: 'Data Submission', abbrv: 'Submission', link: 'data-submission'},
            {title: 'Reporting', abbrv: 'Reporting', link: 'reporting'},
            {title: 'Data Export', abbrv: 'Exporting', link: 'data-export'}
        ];

        const secondSideNavContent = (
            <>
                {sideNavMenuInfo.map((data, i) => {
                    return (
                        <Menu.Item key={i}>
                            <Button href={`#${data.link}`} className='second-side-nav-menu-item main-button-color' fluid>{data.title}</Button>
                        </Menu.Item>
                    )
                })} 
            </>
        );

        const secondSideNavContentMobile = (
            <>
                {sideNavMenuInfo.map((data, i) => {
                    return (
                        <Menu.Item key={i}>
                            <Button href={`#${data.link}`} className='second-side-nav-menu-item main-button-color mobile-side-nav-button' fluid>{data.abbrv}</Button>
                        </Menu.Item>
                    )
                })} 
            </>
        );
        
        //for component SecondarySideNav, prop menuInfo
        const secondarySideNavInfo = {
            title: 'Content',
            menuItems: secondSideNavContent,
            menuItemsMobile: secondSideNavContentMobile
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
                <SecondarySideNav menuInfo={secondarySideNavInfo} />
                <Grid className='manage-data-content-container'>
                    <Grid.Column>
                        <Grid centered verticalAlign='middle'>
                            <Grid.Row centered>
                                <Grid.Column width={12}>
                                    <Segment basic textAlign='center'>
                                        <Header as='h2'>Frequently Asked Questions (FAQs)</Header>
                                        <Divider fitted />
                                        <Grid centered>
                                            <Grid.Column width={10}>
                                                <Search className='faq-search-bar' input={{ fluid: true }} />  
                                            </Grid.Column>
                                        </Grid>
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