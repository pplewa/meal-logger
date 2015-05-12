'use strict';

describe('Logout', function () {
	var React = require('react/addons');
	var stubRouterContext = require('../../helpers/stub-router-context');
	var TestUtils = React.addons.TestUtils;
	var Logout, component, firebaseSpy;

	beforeEach(function () {
		firebaseSpy = jasmine.createSpyObj('firebaseSpy', ['unauth']);
		Logout = React.createFactory(stubRouterContext(require('components/Logout.js'), { dataRef: firebaseSpy }));
		component = Logout();
	});

	it('should create a new instance of Logout', function () {
		expect(component).toBeDefined();
	});

	it('should log out user', function () {
		TestUtils.renderIntoDocument(component);
		expect(firebaseSpy.unauth).toHaveBeenCalled();
	});

});
