'use strict';

import React from 'react/addons';
import Griddle from 'griddle-react';
import chrono from 'chrono-node';
import _ from 'underscore';
import ReactFireMixin from 'vendor/reactfire';
import MealsTableCell from './MealsTableCell';
import MealsTableCellActions from './MealsTableCellActions';

export default React.createClass({

	mixins: [ReactFireMixin],

	columns: {
		date: {
			columnName: 'date',
			// type: 'date',
			customComponent: MealsTableCell
		},
		time: {
			columnName: 'time',
			customComponent: MealsTableCell
		},
		meal: {
			columnName: 'meal',
			customComponent: MealsTableCell
		},
		calories: {
			columnName: 'calories',
			customComponent: MealsTableCell
		},
		actions: {
			columnName: 'actions',
			customComponent: MealsTableCellActions
		}
	},

	getInitialState() {
		return {
			items: {},
			calories: 0
		};
	},

	componentWillMount() {
		this.bindAsObject(this.props.dataRef.child('users/' + this.props.userKey + '/calories'), 'calories');
		this.bindAsObject(this.props.dataRef.child('users/' + this.props.userKey + '/items'), 'items');
		_.extend(this.columns.actions, {
			dataRef: this.firebaseRefs.items,
			filterRef: this.setFilter
		});
	},

	componentDidMount() {
		this.refs.griddle.setFilter = this.setFilter;
	},

	componentDidUpdate() {
		if (this.refs.loader.getDOMNode().classList.contains('spin')) {
			this.refs.loader.getDOMNode().classList.remove('spin');
		}
	},

	// Used to override Griddle filter in a way that doesn't require external data hooks
	setFilter(filter) {
		var that = this.refs.griddle;
		filter = filter === null ? (that.state.filter || '') : filter;
		var updatedState = { page: 0, filter: filter };

		var result = chrono.parse(filter)[0];
		if (result && result.start && result.end) {
			if (result.end.date() - result.start.date() < 3600000 * 24) {

				updatedState.filteredResults = _.filter(that.props.results, function(item) {
					var time = item.time.split(':');
					var hour = parseInt(time[0]);
					var minutes = parseInt(time[1]);
					var startHour = result.start.date().getHours();
					var endHour = result.end.date().getHours();
					var startMinutes = result.start.date().getMinutes();
					var endMinutes = result.end.date().getMinutes();

					if (startHour < hour && endHour > hour) {
						return true;
					} else if (startHour === endHour && startHour === hour && startMinutes <= minutes && endMinutes >= minutes) {
						return true;
					} else if (startHour === hour && endHour > hour && startMinutes <= minutes) {
						return true;
					} else if (startHour < hour && endHour === hour && endMinutes >= minutes) {
						return true;
					}

					return false;
				});
			} else {
				updatedState.filteredResults = _.filter(that.props.results, function(item) {
					var date = new Date(item.date);
					date.setHours('12');
					if (date >= result.start.date() && date <= result.end.date()) {
						return true;
					}
					return false;
				});
			}
		} else {
			// Obtain the state results.
			updatedState.filteredResults = _.filter(that.props.results, function(item) {
				var arr = _.values(item);
				for (var i = 0; i < arr.length; i++) {
					if ((arr[i] || '').toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
						return true;
					}
				}
				return false;
			});
		}

		// Update the max page.
		updatedState.maxPage = that.getMaxPage(updatedState.filteredResults);

		//if filter is null or undefined reset the filter.
		if (_.isUndefined(filter) || _.isNull(filter) || _.isEmpty(filter)) {
			updatedState.filter = filter;
			updatedState.filteredResults = null;
		}

		// Set the state.
		that.setState(updatedState);
	},

	getResults() {
		let itemKeys = Object.keys(this.state.items || {}); 
		return this.state.items ? itemKeys.map(key => {
			let mealResult = this.state.items[key];
			mealResult.key = key;
			mealResult.hasExceedDailyCalories = itemKeys
				.filter(dateKey => this.state.items[dateKey].date === mealResult.date)
				.map(caloriesKey => parseInt(this.state.items[caloriesKey].calories, 10))
				.reduce((prev, curr) => prev + curr) > this.state.calories;
			return mealResult;
		}) : [];
	},

	render() {
		let columns = Object.keys(this.columns);
		return (
			<div className="MealsTable">
				<div ref="loader" className="loader spin">Loading...</div>
				<Griddle 
					showFilter={true} 
					ref="griddle" 
					tableClassName="pure-table pure-table-horizontal"
					gridClassName="pure-form"
					useGriddleStyles={false}
					enableInfiniteScroll={true}
					useFixedHeader={true}
					bodyHeight={300}
					columns={columns}
					columnMetadata={columns.map(key => this.columns[key])}
					results={this.getResults()} />
			</div>
		);
	}
});
