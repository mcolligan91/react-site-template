import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import TopNav from '../Shared/TopNav/TopNav';
import BottomNav from '../Shared/BottomNav/BottomNav';
import Dashboard from '../Components/Dashboard/Dashboard';
import ManageData from '../Components/ManageData/ManageData';
import Reporting from '../Components/Reporting/Reporting';
import FAQs from '../Components/FAQs/FAQs';
 
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
                        <Route path='/reporting' component={Reporting}></Route>
                        <Route path='/faqs' component={FAQs}></Route>
                    </Switch>
                </Grid>
                <BottomNav />
            </>
        )
    }
}

export default Layout;