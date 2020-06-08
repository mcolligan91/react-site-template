import React from 'react';
import { Header, Menu, Responsive, Grid, Dimmer, Loader } from 'semantic-ui-react';
 
import './secondary-side-nav.scss';

const SecondarySideNav = (props) => {
    const {isLoading, menuInfo} = props;
    const {title, menuItems, menuItemsMobile} = menuInfo;

    return (
        <>
            <Responsive as={Menu} className='side-nav secondary-side-nav' borderless vertical minWidth={907}>
                <Header className='secondary-side-nav-header' textAlign='center' size='medium'>{title}</Header>
                <Dimmer.Dimmable className='secondary-side-nav-dimmer' blurring dimmed={isLoading}>
                    <Dimmer active={isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    {menuItems}
                </Dimmer.Dimmable>
            </Responsive>

            {menuItemsMobile ? (
                <Responsive as={Grid} className='secondary-side-nav-container' maxWidth={906} stackable>                       
                    <Menu className='side-nav secondary-side-nav-mobile' borderless attached='top' fluid>
                        <Menu.Menu className='secondary-side-nav-mobile-content'>
                            {menuItemsMobile}
                        </Menu.Menu>
                    </Menu>
                </Responsive>
            ) : (
                null
            )} 
        </>
    );
}

export default SecondarySideNav;