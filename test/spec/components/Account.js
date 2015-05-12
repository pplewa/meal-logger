'use strict';

// window.root = {};
describe('Account', function () {
	var React = require('react/addons');
	var MockFirebase = require('mockfirebase/src/firebase');
	var stubRouterContext = require('../../helpers/stub-router-context');
	var TestUtils = React.addons.TestUtils;
	var Account, component, firebaseSpy;

	beforeEach(function () {
		firebaseSpy = new MockFirebase();
		firebaseSpy._auth.userData = { password: { email: 'foo@foo.bar' }};
		Account = React.createFactory(stubRouterContext(require('components/Account.js'), { 
			dataRef: firebaseSpy, 
			userKey: 'foo@foo.bar' 
		}));
		component = TestUtils.renderIntoDocument(Account()).getComponent();
	});

	it('should create a new instance of Account', function () {
		expect(component).toBeDefined();
	});

	it('should set calories', function () {
		expect(component.state.calories).toEqual(0);
		component.firebaseRefs.calories.set(100);
		component.firebaseRefs.calories.flush();
		expect(component.state.calories).toEqual(100);
	});

});
