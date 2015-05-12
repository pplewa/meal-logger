'use strict';

import React from 'react/addons';
import { Link } from 'react-router';
import 'styles/Navigation.css';
import 'purecss/build/menus.css';

export default React.createClass({

	render() {
		return (
			<div className="Navigation pure-menu pure-menu-horizontal">
				<ul className="pure-menu-list">
					<li className="pure-menu-item"><Link to="home" className="pure-menu-link">Meals</Link></li>
					<li className="pure-menu-item"><Link to="account" className="pure-menu-link">User Account</Link></li>
					<li className="pure-menu-item"><Link to="logout" className="pure-menu-link">Logout</Link></li>
				</ul>
			</div>
		);
	}

});
