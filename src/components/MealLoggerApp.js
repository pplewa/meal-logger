'use strict';

import React from 'react/addons';
import { default as Router, RouteHandler } from 'react-router';
import Firebase from 'firebase';
import 'normalize.css';
import 'styles/main.css';

const FIREBASE_URI = '';
let ref = new Firebase(FIREBASE_URI);

export default React.createClass({
	statics: {
		willTransitionTo(transition, params, query, callback) {
			if (!ref.getAuth() && transition.path !== '/login') {
				transition.redirect('/login', {});
			}
		}
	},	
	render() {
		return (
			<div className="MealLogger">
				<header>
					<h1>MealLogger</h1>
					<h2>Keep your calories in check</h2>
				</header>
				<RouteHandler 
					dataRef={ref} 
					userKey={ref.getAuth() && ref.getAuth().password.email.toLowerCase().replace(/\./g, ',')} />
			</div>
		);
	}
});
