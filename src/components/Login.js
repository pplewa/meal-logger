'use strict';

import React from 'react/addons';
import { Navigation as NavigationMixin } from 'react-router';
import promisify from 'es6-promisify';
import 'styles/Login.css';
import 'purecss/build/buttons.css';
import 'purecss/build/forms.css';

export default React.createClass({

	mixins: [NavigationMixin],

	getInitialState() {
		return {
			error: '',
			email: '',
			password: ''
		};
	},

	handleInputChange(evt) {
		this.state[evt.target.name] = evt.target.value;
		this.setState(this.state);
	},

	onLogin(evt) {
		if (evt) {
			evt.preventDefault();
		}

		this.refs.loader.getDOMNode().classList.add('spin');
		let authWithPassword = promisify(this.props.dataRef.authWithPassword.bind(this.props.dataRef));
		authWithPassword({ email: this.state.email, password: this.state.password })
			.then(authData => this.transitionTo('home'))
			.catch(this.onError);
	},

	onRegister(evt) {
		if (evt) {
			evt.preventDefault();
		}

		this.refs.loader.getDOMNode().classList.add('spin');
		let createUser = promisify(this.props.dataRef.createUser.bind(this.props.dataRef));
		createUser({ email: this.state.email, password: this.state.password })
			.then(userData => {
				this.props.dataRef.child('users').update({
					[this.state.email.toLowerCase().replace(/\./g, ',')]: {
						calories: 0
					}
				});
				this.onLogin();
			})
			.catch(this.onError);
	},

	onError(error) {
		this.refs.loader.getDOMNode().classList.remove('spin');
		this.setState({ error: error.message });
	},

	render() {
		return (
			<form className="Login pure-form">
				<aside>{this.state.error}</aside>
				<fieldset className="pure-group">
					<input placeholder="Email" name="email" type="email" value={this.state.email} onChange={this.handleInputChange} />
					<input placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
				</fieldset>
				<div className="pure-controls">
					<button className="pure-button pure-button-primary" onClick={this.onLogin}>Login</button>
					<button className="pure-button" onClick={this.onRegister}>Register</button>
					<div ref="loader" className="loader">Loading...</div>
				</div>
			</form>
		);
	}

});
