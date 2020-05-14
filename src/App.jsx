import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Layout from './Layout/Layout';
import Login from './Components/Login/Login';
import TermsAndConditions from './Components/TermsAndConditions/TermsAndConditions';
import Dashboard from './Components/Dashboard/Dashboard';

class App extends Component {
	render() {
		return(
			<Switch>
				<Route path='/' exact component={Login}></Route>
				<Route path='/login' exact component={Login}></Route>
				{/* <PrivateRoute path='/*'>
					<Layout />
				</PrivateRoute> */}
				<Route path='/terms-and-conditions' exact component={TermsAndConditions}></Route>
				<Route path='/home' exact component = {Dashboard}></Route>
			</Switch>
		)
	}
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
	//auhtenticated user will have a non-null value
	const isUserAuthenticated = localStorage.getItem('userType');
	return (
	  <Route
		{...rest}
		render={({ location }) =>
		isUserAuthenticated ? (
			children
		  ) : (
			<Redirect
			  to={{
				pathname: "/",
				state: { from: location }
			  }}
			/>
		  )
		}
	  />
	);
  }

export default withRouter(App);
