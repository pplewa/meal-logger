'use strict';

import React from 'react/addons';
import promisify from 'es6-promisify';
import deleteURL from '../images/delete.svg';
import checkURL from '../images/check.svg';
import editURL from '../images/edit.svg';

export default React.createClass({

	onUpdateEntry(key, evt) {
		let rowEl = this._owner.getDOMNode();
		let meals = this.props.metadata.dataRef.child(key);
		let updateMeal = promisify(meals.update.bind(meals));
		updateMeal({ 
			date: rowEl.querySelector('[data-key="date-' + key + '"]').value.trim(),
			time: rowEl.querySelector('[data-key="time-' + key + '"]').value.trim(),
			meal: rowEl.querySelector('[data-key="meal-' + key + '"]').value.trim(),
			calories: rowEl.querySelector('[data-key="calories-' + key + '"]').value.trim()
		}).then(() => this.props.metadata.filterRef(null));
		rowEl.classList.remove('edit');
	},

	onEditEntry(key, evt) {
		let rowEl = this._owner.getDOMNode();
		rowEl.classList.add('edit');
		rowEl.querySelector('[data-key="meal-' + key + '"]').focus();
	},

	onDeleteEntry(key, evt) {
		let removeMeal = promisify(this.props.metadata.dataRef.child(key).remove.bind(this.props.metadata.dataRef.child(key)));
		removeMeal().then(() => this.props.metadata.filterRef(null));
	},

	render() {
		return (
			<div>
				<button className="pure-button pure-button-primary" name="edit" onClick={this.onEditEntry.bind(this, this.props.rowData.key)}><img src={editURL} height="14" /></button>
				<button className="pure-button pure-button-primary" name="update" onClick={this.onUpdateEntry.bind(this, this.props.rowData.key)}><img src={checkURL} height="14" /></button>
				<button className="pure-button pure-button-delete" name="delete" onClick={this.onDeleteEntry.bind(this, this.props.rowData.key)}><img src={deleteURL} height="14" /></button>
			</div>
		);
	}

});
