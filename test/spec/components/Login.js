'use strict';

describe('Login', function () {

	var React = require('react/addons');
	var stubRouterContext = require('../../helpers/stub-router-context');
	var TestUtils = React.addons.TestUtils;
	var Login, component, firebaseSpy;

	beforeEach(function () {
		firebaseSpy = jasmine.createSpyObj('firebaseSpy', ['authWithPassword', 'createUser', 'child']);
		Login = React.createFactory(stubRouterContext(require('components/Login.js'), { dataRef: firebaseSpy }));
		component = TestUtils.renderIntoDocument(Login()).getComponent();
	});

	it('should create a new instance of Login', function () {
		expect(component).toBeDefined();
	});

	it('should attempt and fail to log in user', function(done){
		var state = { email: 'foo@foo.bar', password: 'foo' };
		var error = 'error';
		firebaseSpy.authWithPassword.and.callFake(function(args, callback) {
			callback({ message: error });
		});

		component.setState(state);
		component.onLogin();
		expect(firebaseSpy.authWithPassword.calls.argsFor(0)[0]).toEqual(state);
		setTimeout(function(){
			expect(component.state.error).toEqual(error);
			done();
		}, 1);
	});

	it('should attempt and succeed to log in user', function(done){
		var state = { email: 'foo@foo.bar', password: 'foo' };
		spyOn(component, 'transitionTo');
		firebaseSpy.authWithPassword.and.callFake(function(args, callback) {
			callback();
		});

		component.setState(state);
		component.onLogin();
		expect(firebaseSpy.authWithPassword.calls.argsFor(0)[0]).toEqual(state);
		expect(component.state.error).toEqual('');
		setTimeout(function(){
			expect(component.transitionTo).toHaveBeenCalledWith('home');
			done();
		}, 1);
	});

	it('should attempt and fail to register user', function(done){
		var state = { email: 'foo@foo.bar', password: 'foo' };
		var error = 'error';
		firebaseSpy.createUser.and.callFake(function(args, callback) {
			callback({ message: error });
		});

		component.setState(state);
		component.onRegister();
		expect(firebaseSpy.createUser.calls.argsFor(0)[0]).toEqual(state);
		setTimeout(function(){
			expect(component.state.error).toEqual(error);
			done();
		}, 1);
	});

	it('should attempt and succeed to register user', function(done){
		var state = { email: 'foo@foo.bar', password: 'foo' };
		var updateSpy = jasmine.createSpy();
		spyOn(component, 'transitionTo');
		firebaseSpy.createUser.and.callFake(function(args, callback) {
			callback();
		});
		firebaseSpy.child.and.returnValue({ update: updateSpy });

		component.setState(state);
		component.onRegister();
		expect(firebaseSpy.createUser.calls.argsFor(0)[0]).toEqual(state);
		setTimeout(function(){
			expect(updateSpy).toHaveBeenCalledWith({
				'foo@foo,bar': { calories: 0 }
			});
			done();
		}, 1);
	});

});