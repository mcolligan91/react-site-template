import React, { Component } from 'react';
import { Icon, Menu, Responsive, Dropdown, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import './top-nav.scss';

class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAccountDropdown: false
        }
    }

  
    /*
	summary: directs router to selected module (Dashboard, Manage Data, Reporting, FAQs, Account) 

	params: menuItem - data from clicked menu item div that contains url for router

	returns: none
    */
    handleItemClick = (menuItem) => {
        this.props.history.push(menuItem.url);
    }

    
    /*
	summary: directs router to home page when main logo is clicked (Dashboard if logged in, Login if not logged in) 

	params: none

	returns: none
    */
    handleMainLogoClick = () => {
        let loggedIn = sessionStorage.getItem('loggedIn'),
            path = loggedIn === 'true' ? '/home' : '/login';
        this.props.history.push(path);
    }


    /*
	summary: directs router to home page when main logo is clicked (Dashboard if logged in, Login if not logged in) 

	params: e - click event data; { index } - index value from selected menu item to be passed to Account module for loading correct subpage (0 - My Account, 1 - Manage Users, 2 - Manage Organization)

	returns: none
    */
    handleAccountMenuClick = (e, { index }) => {
        this.props.history.push('/account', {index});
    }


    /*
	summary: will be api call that fires logout process, for now updates sessionStorage to 'log out' user and returns to main login page

	params: none

	returns: none
    */
    handleLogOut = () => {
        sessionStorage.setItem('loggedIn', false);
        this.props.history.push('/login');
    }

    render() {
        const {pathname} = this.props.location;

        //would pull from session data
        const userInfo = {username: 'UserABC', lastLogin: '5/20/2020'}

        const accountDropdownItems = [
            {index: 0, icon: 'user', text: 'My Account'},
            {index: 1, icon: 'briefcase', text: 'Manage Users'},
            {index: 2, icon: 'building', text: 'Manage Organization'}
        ];

        const menuItems = [
            {type: 'pageLink', name: 'Dashboard', url:'/home', iconName: 'dashboard', iconSize: null, content: 'Dashboard', clickFunction: null},
            {type: 'pageLink', name: 'Manage Data', url:'/manage-data', iconName: 'database', iconSize: null, content: 'Manage Data', clickFunction: null},
            {type: 'pageLink', name: 'Reporting', url:'/reporting', iconName: 'chart line', iconSize: null, content: 'Reporting', clickFunction: null},
            {type: 'pageLink', name: 'FAQs', url:'/FAQs', iconName: 'question circle', iconSize: null, content: 'FAQs', clickFunction: null},
            {type: 'dropdown', name: 'User Menu', url: '/account', iconClass: 'account-dropdown-logo', iconName: 'user circle', iconSize: 'big', content: null, clickFunction: null}
        ];

        const mainLogoProps = {src: 'https://drintl.com/wp-content/uploads/2018/05/dr-footer.png', height: '35', className: 'main-logo'};

        //will be controlled by session data in back-end
        let loggedIn = sessionStorage.getItem('loggedIn');

        const mainLogoContainer = (
            <div className='main-logo-container'>
                <img {...mainLogoProps} alt='Logo' onClick={() => this.props.history.push('/home')}></img>
            </div>
        );

        const accountDropDownMenu = (
            <Dropdown.Menu className='dropdown-menu'>
                <Dropdown.Header>
                    <span>{userInfo.username}</span>
                    <br />
                    <span className='last-login-text'>{userInfo.lastLogin}</span>
                </Dropdown.Header>
                <Dropdown.Divider />
                {accountDropdownItems.map((data, i) => {
                    return (
                        <Dropdown.Item key={i} icon={{name: data.icon, className: 'main-color'}} text={data.text} index={data.index} onClick={this.handleAccountMenuClick} />
                    )
                })}
                <Dropdown.Divider className='logout-divider' />
                <div className='logout-button-container'>
                    <Button className='main-button-color' onClick={this.handleLogOut}>Log Out</Button>
                </div>
            </Dropdown.Menu>
        );

        return (
        <>
            <Responsive as={Menu} className='main-nav top-nav main-background-color' size='massive' minWidth={796} borderless>
                {mainLogoContainer}
                {loggedIn === 'true' && (
                    <Menu.Menu position='right'>
                        {menuItems.map((item, i) => {
                            return item.type === 'pageLink' ? (
                                <Menu.Item key={i} className='top-nav-link' name={item.name} active={item.url === pathname} onClick={e => this.handleItemClick(item)}>
                                    <Icon className={item.iconClass} name={item.iconName} size={item.iconSize} onClick={item.clickFunction}></Icon>
                                    <span>{item.content}</span>
                                </Menu.Item>
                            ) : item.type === 'dropdown' ? (
                                <Menu.Item key={i} className='top-nav-link' name={item.name} active={item.url === pathname}>
                                    <Dropdown icon={{name: item.iconName, size: item.iconSize, className: item.iconClass}} pointing='top right'>
                                        {accountDropDownMenu}
                                    </Dropdown>
                                </Menu.Item>
                            ) : (
                                null
                            )
                        })}
                    </Menu.Menu>
                )}
            </Responsive>

            <Responsive as={Menu} className='main-nav top-nav main-background-color' size='massive' maxWidth={795} icon borderless>
                {mainLogoContainer}
                {loggedIn === 'true' && (
                    <Menu.Menu position='right'>
                        {menuItems.map((item, i) => {
                            return item.type === 'pageLink' ? (
                                    <Menu.Item key={i} className='top-nav-link' name={item.name} active={item.url === pathname} onClick={e => this.handleItemClick(item)}>
                                        <Icon className={item.iconClass} name={item.iconName} size={item.iconSize} onClick={item.clickFunction}></Icon>
                                    </Menu.Item>
                                ) : item.type === 'dropdown' ? (
                                        <Menu.Item key={i} className='top-nav-link' name={item.name} active={item.url === pathname}>
                                            <Dropdown icon={{name: item.iconName, size: item.iconSize, className: item.iconClass}} pointing='top right'>
                                                {accountDropDownMenu}
                                            </Dropdown>
                                        </Menu.Item>
                                ) : (
                                    null
                                )
                            })}
                        </Menu.Menu>
                    )}
                </Responsive>
            </>
        );
    }
}

export default withRouter(TopNav);