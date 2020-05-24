import React, {Component} from 'react';
import { Header, Menu } from 'semantic-ui-react';
 
import './secondary-side-nav.scss';

class SecondarySideNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {menuInfo} = this.props;

        return (
            <>
                <Menu className='side-nav secondary-side-nav' borderless vertical>
                    <Header className='secondary-side-nav-header' textAlign='center' size='medium'>{menuInfo.title}</Header>
                    {menuInfo.menuItems}
                </Menu>
            </>
        )
    }
}

export default SecondarySideNav;