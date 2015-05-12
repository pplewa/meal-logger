'use strict';

import React from 'react/addons';
import { Navigation as NavigationMixin } from 'react-router';

export default React.createClass({

	mixins: [NavigationMixin],

	componentWillMount() {
		this.props.dataRef.unauth();
		this.transitionTo('login');
	},

	render() {
		return <div></div>;
	}

});
