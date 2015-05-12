'use strict';

import React from 'react/addons';
import ReactFireMixin from 'vendor/reactfire';
import 'styles/AddMeal.css';

export default React.createClass({

	componentDidMount() {
		this.refs.date.getDOMNode().valueAsDate = new Date();
		this.refs.time.getDOMNode().value = '12:00';
	},

	onAddEntry(evt) {
		if (evt) {
			evt.preventDefault();
		}
		this.props.dataRef.child('users/' + this.props.userKey + '/items').push({
			date: this.refs.date.getDOMNode().value.trim(),
			time: this.refs.time.getDOMNode().value.trim(),
			meal: this.refs.meal.getDOMNode().value.trim(),
			calories: this.refs.calories.getDOMNode().value.trim()
		});
		this.refs.meal.getDOMNode().value = '';
		this.refs.calories.getDOMNode().value = '';
	},

	render() {
		return (
			<form className="AddMeal pure-form" onSubmit={this.onAddEntry}>
				<table>
					<tbody>
						<tr>
							<td><input ref="date" data-style="en" type="date" required/></td>
							<td><input ref="time" step="600" type="time" required/></td>
						</tr>
						<tr>
							<td><input ref="meal" placeholder="Meal" type="text" required/></td>
							<td><input ref="calories" placeholder="Calories" type="number" min="0" step="1" required/></td>
						</tr>
						<tr>
							<td colSpan="2">
								<button className="pure-button pure-button-primary">Add Meal</button>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		);
	}
});
