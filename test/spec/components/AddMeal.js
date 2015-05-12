'use strict';

describe('AddMeal', function () {
	var React = require('react/addons');
	var MockFirebase = require('mockfirebase/src/firebase');
	var TestUtils = React.addons.TestUtils;
	var AddMeal, component, firebaseSpy;

	beforeEach(function () {
		firebaseSpy = new MockFirebase();
		firebaseSpy._auth.userData = { password: { email: 'foo@foo.bar' }};
		AddMeal = React.createFactory(require('components/AddMeal.js'));
		component = TestUtils.renderIntoDocument(AddMeal({ 
			dataRef: firebaseSpy, 
			userKey: 'foo@foo.bar' 
		}));
	});

	it('should create a new instance of AddMeal', function () {
		expect(component).toBeDefined();
	});

	it('should set date to defaults', function () {
		// expect(component.refs.date.getDOMNode().value).toEqual(new Date());
		expect(component.refs.time.getDOMNode().value).toEqual('12:00');
	});

	it('should add new meal entry', function () {
		component.refs.date.getDOMNode().value = '2015-01-01';
		component.refs.time.getDOMNode().value = '10:00';
		component.refs.meal.getDOMNode().value = 'foo';
		component.refs.calories.getDOMNode().value = 'foo';
		component.onAddEntry();
		expect(component.refs.meal.getDOMNode().value).toEqual('');
		expect(component.refs.calories.getDOMNode().value).toEqual('');
	});

});
