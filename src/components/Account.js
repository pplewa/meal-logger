'use strict';

import React from 'react/addons';
import ReactFireMixin from 'vendor/reactfire';
import Navigation from './Navigation';
import promisify from 'es6-promisify';
import 'styles/Account.css';
import 'purecss/build/buttons.css';
import 'purecss/build/forms.css';

export default React.createClass({

	mixins: [ReactFireMixin],

	getInitialState() {
		return {
			calories: 0
		};
	},

	componentWillMount() {
		this.bindAsObject(this.props.dataRef.child('users/' + this.props.userKey + '/calories'), 'calories');
	},

	componentDidMount() {
	    this.refs.calories.getDOMNode().value = this.state.calories;
		this.refs.loader.getDOMNode().classList.add('spin');
	},

	componentDidUpdate(prevProps, prevState) {
	    this.refs.calories.getDOMNode().value = this.state.calories;
		this.refs.loader.getDOMNode().classList.remove('spin');
	},

	onSetCalories(evt) {
		if (evt) {
			evt.preventDefault();
		}

		this.refs.loader.getDOMNode().classList.add('spin');
		let setCalories = promisify(this.firebaseRefs.calories.set.bind(this.firebaseRefs.calories));
		setCalories(this.refs.calories.getDOMNode().value).then(() => {
			this.refs.loader.getDOMNode().classList.remove('spin');
		});
	},

	render() {
		return (
			<div className="Account">
				<Navigation {...this.props} />
				<form className="pure-form pure-form-aligned">
					<fieldset>
						<div className="pure-control-group">
							<label>Email</label>
							<input type="email" placeholder={this.props.dataRef.getAuth().password.email} disabled />
						</div>
						<div className="pure-control-group">
							<label htmlFor="calories">Calories</label>
							<input id="calories" ref="calories" type="text" />
						</div>
					</fieldset>
					<div className="pure-controls">
						<button className="pure-button pure-button-primary" onClick={this.onSetCalories}>Set Calories</button>
						<div ref="loader" className="loader">Loading...</div>
					</div>
				</form>
			</div>
		);
	}
});
