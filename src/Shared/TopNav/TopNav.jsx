import React, { Component } from 'react';
// import axios from 'axios';
import { Icon, Menu, Responsive, Dropdown, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import './top-nav.scss'

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showAccountDropdown: false
    }
  }

    handleItemClick = (menuItem) => {
        this.props.history.push(menuItem.url);
    }

    handleMainLogoClick = () => {
        let loggedIn = sessionStorage.getItem('loggedIn'),
            path = loggedIn === 'true' ? '/home' : '/login';
        this.props.history.push(path);
    }

    handleAccountMenuClick = (pathTarget) => {
        this.props.history.push('/account', {pathTarget});
    }

    handleLogOut = () => {
        sessionStorage.setItem('loggedIn', false);
        this.props.history.push('/login');
    }

    render() {
        const {pathname} = this.props.location;

        //would pull from session data
        const userInfo = {username: 'UserABC', lastLogin: '5/20/2020'}

        const accountDropdownItems = {
            userData: userInfo,
            menuLinks: [
                {icon: 'user', text: 'My Account', pathTarget: 'My Account'},
                {icon: 'briefcase', text: 'Manage Users', pathTarget: 'Manage Users'},
                {icon: 'building', text: 'Manage Organization', pathTarget: 'Manage Organization'}
            ]
        };

        const menuItems = [
            {type: 'pageLink', name: 'Dashboard', url:'/home', iconName: 'dashboard', iconSize: null, content: 'Dashboard', clickFunction: null},
            {type: 'pageLink', name: 'Manage Data', url:'/manage-data', iconName: 'database', iconSize: null, content: 'Manage Data', clickFunction: null},
            {type: 'pageLink', name: 'Reporting', url:'/reporting', iconName: 'chart line', iconSize: null, content: 'Reporting', clickFunction: null},
            {type: 'pageLink', name: 'FAQs', url:'/FAQs', iconName: 'question circle', iconSize: null, content: 'FAQs', clickFunction: null},
            {type: 'dropdown', name: 'User Menu', url: '/account', iconClass: 'account-dropdown-logo', iconName: 'user circle', iconSize: 'big', content: null, clickFunction: null, dropdownMenuItems: accountDropdownItems}
        ];

        const mainLogoProps = {src: 'https://drintl.com/wp-content/uploads/2018/05/dr-footer.png', height: '35', className: 'main-logo'};

        //will be controlled by session data in back-end
        let loggedIn = sessionStorage.getItem('loggedIn');

        return (
        <>
            <Responsive as={Menu} className='main-nav top-nav main-background-color' size='massive' minWidth={796} borderless>
                <div className='main-logo-container'>
                    <img {...mainLogoProps} alt='Logo' onClick={this.handleMainLogoClick}></img>
                </div>
                {loggedIn === 'true' ? (
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
                                        <Dropdown.Menu>
                                            <Dropdown.Header>
                                                <span>{item.dropdownMenuItems.userData.username}</span>
                                                <br />
                                                <span className='last-login-text'>{item.dropdownMenuItems.userData.lastLogin}</span>
                                            </Dropdown.Header>
                                            <Dropdown.Divider />
                                            {item.dropdownMenuItems.menuLinks.map((data, i) => {
                                                return (
                                                    <Dropdown.Item key={i} icon={{name: data.icon, className: 'main-color'}} text={data.text} onClick={(e) => this.handleAccountMenuClick(data.pathTarget)} />
                                                )
                                            })}
                                            <Dropdown.Divider className='logout-divider' />
                                            <div className='logout-button-container'>
                                                <Button className='main-button-color' onClick={this.handleLogOut}>Log Out</Button>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu.Item>
                            ) : (
                                null
                            )
                        })}
                    </Menu.Menu>
                ) : (
                    null
                )}
            </Responsive>

            <Responsive as={Menu} className='main-nav top-nav main-background-color' size='massive' maxWidth={795} icon borderless>
                <div className='main-logo-container'>
                    <img {...mainLogoProps} alt='Logo' onClick={() => this.props.history.push('/home')}></img>
                </div>
                <Menu.Menu position='right'>
                    {menuItems.map((item, i) => {
                       return item.type === 'pageLink' ? (
                            <Menu.Item key={i} className='top-nav-link' name={item.name} active={item.url === pathname} onClick={e => this.handleItemClick(item)}>
                                <Icon className={item.iconClass} name={item.iconName} size={item.iconSize} onClick={item.clickFunction}></Icon>
                            </Menu.Item>
                        ) : item.type === 'dropdown' ? (
                            <Menu.Item key={i} className='top-nav-link' name={item.name} active={item.url === pathname}>
                                <Dropdown icon={{name: item.iconName, size: item.iconSize, className: item.iconClass}} pointing='top right'>
                                    <Dropdown.Menu>
                                        <Dropdown.Header>
                                            <span>{item.dropdownMenuItems.userData.username}</span>
                                            <br />
                                            <span className='last-login-text'>{item.dropdownMenuItems.userData.lastLogin}</span>
                                        </Dropdown.Header>
                                        <Dropdown.Divider />
                                        {item.dropdownMenuItems.menuLinks.map((data, i) => {
                                            return (
                                                <Dropdown.Item key={i} icon={{name: data.icon, className: 'main-color'}} text={data.text} onClick={(e) => this.handleAccountMenuClick(data.pathTarget)} />
                                            )
                                        })}
                                        <Dropdown.Divider className='logout-divider' />
                                        <div className='logout-button-container'>
                                            <Button onClick={this.handleLogOut}>Log Out</Button>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Item>
                        ) : (
                            null
                        )
                    })}
                </Menu.Menu>
            </Responsive>
        </>
        );
    }
}

export default withRouter(TopNav);