import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Layout from './Layout/Layout';
import Login from './Components/Login/Login';

class App extends Component {
	render() {
		return(
			<Switch>
				<Route path='/' exact component={Login}></Route>
				<Route path='/login' exact component={Login}></Route>
				<Route path='/*' component={Layout}></Route>
			</Switch>
		)
	}
}

export default withRouter(App);
