'use strict';

describe('MealsTable', function () {
	var React = require('react/addons');
	var MockFirebase = require('mockfirebase/src/firebase');	
	var TestUtils = React.addons.TestUtils;
	var MealsTable, component, firebaseSpy;

	beforeEach(function () {
		firebaseSpy = new MockFirebase();
		firebaseSpy._auth.userData = { password: { email: 'foo@foo.bar' }};
		MealsTable = React.createFactory(require('components/MealsTable.js'));
		component = TestUtils.renderIntoDocument(MealsTable({ 
			dataRef: firebaseSpy, 
			userKey: 'foo@foo.bar' 
		}));
		component.setState({
			calories: 100,
			items: {
				id_0: {
					meal: 'foo',
					date: '2015-04-01',
					calories: 50,
					time: '8:00'
				},
				id_1: {
					meal: 'bar',
					date: '2015-04-01',
					calories: 60,
					time: '9:00'
				},
				id_2: {
					meal: 'baz',
					date: '2015-04-03',
					calories: 80,
					time: '10:00'
				},
				id_3: {
					meal: 'zup',
					date: '2015-04-04',
					calories: 80,
					time: '15:00'
				}
			}
		});
	});

	it('should create a new instance of MealsTable', function() {
		expect(component).toBeDefined();
	});

	it('should format results', function() {
		var results = component.getResults();
		expect(results.length).toEqual(Object.keys(component.state.items).length);
		expect(results[0].hasExceedDailyCalories).toEqual(true);
		expect(results[1].hasExceedDailyCalories).toEqual(true);
		expect(results[2].hasExceedDailyCalories).toEqual(false);
	});

	it('should filter text results', function() {
		component.setFilter('ba');
		expect(component.refs.griddle.state.filteredResults.map(function(el){
			return el.meal;
		})).toEqual(['bar', 'baz']);
	});

	it('should filter time results', function() {
		component.setFilter('10:00');
		expect(component.refs.griddle.state.filteredResults).toEqual([
			component.state.items.id_2
		]);
	});

	it('should filter time range results', function() {
		component.setFilter('8 to 9');
		expect(component.refs.griddle.state.filteredResults).toEqual([
			component.state.items.id_0,
			component.state.items.id_1
		]);
	});

	it('should filter date results', function() {
		component.setFilter('2015-04-01');
		expect(component.refs.griddle.state.filteredResults).toEqual([
			component.state.items.id_0,
			component.state.items.id_1
		]);

		// component.setFilter('04/01/2015');
		// expect(component.refs.griddle.state.filteredResults).toEqual([
		// 	component.state.items.id_0,
		// 	component.state.items.id_1
		// ]);
	});

	it('should filter date range results', function() {
		component.setFilter('04/01/2015 to 04/03/2015');;
		expect(component.refs.griddle.state.filteredResults).toEqual([
			component.state.items.id_0,
			component.state.items.id_1,
			component.state.items.id_2
		]);
	});

});
