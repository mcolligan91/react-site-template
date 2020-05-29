import React, {Component} from 'react';
import { Menu, Icon, Responsive, Grid } from 'semantic-ui-react';
 
import './side-nav.scss';

class SideNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {menuInfo, activeItem, handleItemClick} = this.props;

        return (
            <>
                <Responsive as={Menu} className='side-nav main-side-nav' borderless icon='labeled' vertical minWidth={907}>
                    {menuInfo.map((data, i) => {
                        return (
                            <Menu.Item key={i} name={data.name} className='main-color' active={activeItem === data.name} onClick={handleItemClick}>
                                <Icon name={data.iconName}></Icon>
                                {data.name}
                            </Menu.Item>
                        )
                    })}
                </Responsive>

                <Responsive className='side-nav-mobile-container' maxWidth={906}>
                    <Grid.Column>
                        <Menu className='side-nav main-side-nav side-nav-mobile' borderless icon='labeled'>
                            <Menu.Menu>
                                {menuInfo.map((data, i) => {
                                    return (
                                        <Menu.Item key={i} name={data.name} className='main-color' active={activeItem === data.name} onClick={handleItemClick}>
                                            <Icon name={data.iconName}></Icon>
                                            {data.name}
                                        </Menu.Item>
                                    )
                                })}
                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                </Responsive>
            </>
        )
    }
}

export default SideNav;