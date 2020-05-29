import React, {Component} from 'react';
import { Header, Menu, Responsive, Grid } from 'semantic-ui-react';
 
import './secondary-side-nav.scss';

class SecondarySideNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {menuInfo} = this.props;
        const {title, menuItems, menuItemsMobile} = menuInfo;

        return (
            <>
                <Responsive as={Menu} className='side-nav secondary-side-nav' borderless vertical minWidth={907}>
                    <Header className='secondary-side-nav-header' textAlign='center' size='medium'>{title}</Header>
                    {menuItems}
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
        )
    }
}

export default SecondarySideNav;