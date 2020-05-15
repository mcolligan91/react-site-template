import React, { Component } from 'react';
// import axios from 'axios';
import { Form, Button, Grid, Header, Icon, Menu, Segment } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom'

import './top-nav.scss'

class TopNav extends Component {
  constructor(props) {
    super(props);
  }

    handleItemClick = (menuItem) => {
        if (menuItem.name === 'User Menu') {
            this.handleAccountDropdown();
        } else {
            this.props.history.push(menuItem.url);
        }
    }
        

    handleAccountDropdown = () => {
        alert('user dropdown');
    }

    render() {
        const {pathname} = this.props.location;

        const menuItems = [
            {name: 'Dashboard', url:'/home', iconName: 'dashboard', iconSize: null, content: 'Dashboard', clickFunction: null},
            {name: 'Manage Data', url:'/manage-data', iconName: 'database', iconSize: null, content: 'Manage Data', clickFunction: null},
            {name: 'Reporting', url:'/reporting', iconName: 'chart line', iconSize: null, content: 'Reporting', clickFunction: null},
            {name: 'FAQs', url:'/FAQs', iconName: 'question circle', iconSize: null, content: 'FAQs', clickFunction: null},
            {name: 'User Menu', iconClass: 'account-dropdown-logo', iconName: 'user circle', iconSize: 'big', content: null, clickFunction: null}
        ];

        const mainLogoProps = {src: 'https://drintl.com/wp-content/uploads/2018/05/dr-footer.png', alt: 'D+R', height: '35', className: 'main-logo'}

        return (
        <>
            <Menu className='main-nav top-nav main-background-color' size='massive' borderless stackable>
                <div className='main-logo-container'>
                    <img {...mainLogoProps} onClick={() => this.props.history.push('/home')}></img>
                </div>
                <Menu.Menu position='right'>
                    {menuItems.map((item, i) => {
                        let currentItem = item.name;
                        return (
                            <Menu.Item key={i} className='top-nav-link' name={currentItem} active={item.url === pathname} onClick={e => this.handleItemClick(item)}>
                                <Icon className={item.iconClass} name={item.iconName} size={item.iconSize} onClick={item.clickFunction}></Icon>
                                <span>{item.content}</span>
                            </Menu.Item>
                        )
                    })}
                </Menu.Menu>
            </Menu>
        </>
        );
    }
}

export default withRouter(TopNav);