import React, {Component} from 'react';
import { Menu, Icon, Responsive, Grid } from 'semantic-ui-react';
 
import './side-nav.scss';

class SideNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {menuInfo, activeItem, handleItemClick} = this.props;

        const menuItems = (
            <>
                {menuInfo.map((data, i) => {
                    return (
                        <Menu.Item key={i} name={data.name} className='main-color' index={data.index} active={activeItem === data.index} onClick={handleItemClick}>
                            <Icon name={data.iconName}></Icon>
                            {data.name}
                        </Menu.Item>
                    )
                })}
            </>
        )

        return (
            <>
                <Responsive as={Menu} className='side-nav main-side-nav' borderless icon='labeled' vertical minWidth={907}>
                    {menuItems}
                </Responsive>

                <Responsive className='side-nav-mobile-container' maxWidth={906}>
                    <Grid.Column>
                        <Menu className='side-nav main-side-nav side-nav-mobile' borderless icon='labeled'>
                            <Menu.Menu>
                                {menuItems}
                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                </Responsive>
            </>
        )
    }
}

export default SideNav;