import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import TopNav from '../Shared/TopNav/TopNav';
import BottomNav from '../Shared/BottomNav/BottomNav';
import Dashboard from '../Components/Dashboard/Dashboard';
import ManageData from '../Components/ManageData/ManageData';
 
import './layout.scss';

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <TopNav location={this.props.location} />
                <Grid className='main-content-container'>
                    <Switch>
                        <Route path='/home' component={Dashboard}></Route>
                        <Route path='/manage-data' component={ManageData}></Route>
                    </Switch>
                </Grid>
                <BottomNav />
            </>
        )
    }
}

export default Layout;