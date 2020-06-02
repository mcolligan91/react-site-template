import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import TopNav from '../Shared/TopNav/TopNav';
import BottomNav from '../Shared/BottomNav/BottomNav';
import Dashboard from '../Components/Dashboard/Dashboard';
import ManageData from '../Components/ManageData/ManageData';
import Reporting from '../Components/Reporting/Reporting';
import FAQs from '../Components/FAQs/FAQs';
import Account from '../Components/Account/Account';
import TermsAndConditions from '../Components/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './../Components/PrivacyPolicy/PrivacyPolicy';
 
import './layout.scss';

const Layout = (props) => {    
    return (
        <>
            <div id='app'>
                <TopNav location={props.location} />
                    <Grid className='main-content-container'>
                        <Switch>
                            <Route path='/home' component={Dashboard}></Route>
                            <Route path='/manage-data' component={ManageData}></Route>
                            <Route path='/reporting' component={Reporting}></Route>
                            <Route path='/faqs' component={FAQs}></Route>
                            <Route path='/account' component={Account}></Route>
                            <Route path='/terms-and-conditions' component={TermsAndConditions}></Route>
                            <Route path='/privacy-policy' component={PrivacyPolicy}></Route>
                        </Switch>
                    </Grid>
                    <BottomNav />
            </div>
        </>
    );
}

export default Layout;