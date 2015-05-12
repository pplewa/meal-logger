'use strict';

import React from 'react/addons';
import { default as Router, Route } from 'react-router';
import MealLoggerApp from './MealLoggerApp';
import Login from './Login';
import Logout from './Logout';
import Meals from './Meals';
import Account from './Account';

Router.run((
	<Route handler={MealLoggerApp}>
		<Route name="home" path="/" handler={Meals}/>
		<Route name="login" path="/login" handler={Login}/>
		<Route name="logout" path="/logout" handler={Logout}/>
		<Route name="account" path="/account" handler={Account}/>
	</Route>
), Handler => {
	React.render(<Handler/>, document.getElementById('content'));
});
