import React, {Component} from 'react'
import { Grid } from 'semantic-ui-react'

// import SideNavigation from './SideNavigation'
// import ContentContainer from './ContentContainer'
// import SharedTopNavigation from '../Shared/TopNavigation/TopNavigation'
 
import './layout.scss'

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {/* <SharedTopNavigation auth={this.props.auth}/> */}
                <Grid className='home-content-container' style={{ backgroundColor: '#F1F1F1' }}>
                    <Grid.Row className='tablet-side-nav-row' only='tablet'>a
                        {/* <SideNavigation className='module-side-nav-mobile' screen='tablet' iconClassName='side-nav-icon' styleAttributes={{pointing: true, secondary: true, size: 'large'}} auth={this.props.auth}/> */}
                    </Grid.Row>
                    <Grid.Row className='mobile-side-nav-row' only='mobile'>b
                        {/* <SideNavigation className='module-side-nav-mobile' screen='mobile' iconClassName='mobile-side-nav-icon' styleAttributes={{pointing: true, secondary: true, size: 'large'}} auth={this.props.auth} /> */}
                    </Grid.Row>
                    <Grid.Column className='side-nav-container-computer' only='computer' width={3} stretched>c
                        {/* <SideNavigation className='module-side-nav' screen='computer' iconClassName='side-nav-icon' styleAttributes={{pointing: true, secondary: true, vertical: true, size: 'large'}} auth={this.props.auth} /> */}
                    </Grid.Column>
                    <Grid.Column stretched width={1}></Grid.Column>         
                    <Grid.Column className='module-main-content-container' stretched computer={11} mobile={14}d>
                        {/* <ContentContainer auth={this.props.auth}/> */}
                    </Grid.Column>
                    <Grid.Column stretched width={1}></Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Layout;