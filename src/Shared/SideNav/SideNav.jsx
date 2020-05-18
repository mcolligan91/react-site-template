import React, {Component} from 'react';
import { Menu, Icon } from 'semantic-ui-react';
 
import './side-nav.scss';

class SideNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {menuInfo, activeItem, handleItemClick} = this.props;

        return (
            <>
                <Menu className='side-nav main-side-nav' borderless icon='labeled' vertical>
                    {menuInfo.map((data, i) => {
                        return (
                            <Menu.Item key={i} name={data.name} className='main-color' active={activeItem === data.name} onClick={handleItemClick}>
                                <Icon name={data.iconName}></Icon>
                                {data.name}
                            </Menu.Item>
                        )
                    })}
                </Menu>
            </>
        )
    }
}

export default SideNav;