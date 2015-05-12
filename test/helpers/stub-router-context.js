var React = require('react/addons');
export default function(Component, props, stubs) {

  function RouterStub() { };
  RouterStub.makePath = function() {};
  RouterStub.makeHref = function() {};
  RouterStub.transitionTo = function() {};
  RouterStub.replaceWith = function() {};
  RouterStub.goBack = function() {};
  RouterStub.getCurrentPath = function() {};
  RouterStub.getCurrentRoutes = function() {};
  RouterStub.getCurrentPathname = function() {};
  RouterStub.getCurrentParams = function() {};
  RouterStub.getCurrentQuery = function() {};
  RouterStub.isActive = function() {};
  RouterStub.getRouteAtDepth = function() {};
  RouterStub.setRouteComponentAtDepth = function() {};

  return React.createClass({
    childContextTypes: {
      router: React.PropTypes.func,
      routeDepth: React.PropTypes.number,
      makePath: React.PropTypes.func,
      makeHref: React.PropTypes.func,
      transitionTo: React.PropTypes.func,
      replaceWith: React.PropTypes.func,
      goBack: React.PropTypes.func,
      isActive: React.PropTypes.func,
      getCurrentPath: React.PropTypes.func,
      getCurrentRoutes: React.PropTypes.func,
      getCurrentPathname: React.PropTypes.func,
      getCurrentParams: React.PropTypes.func,
      getCurrentQuery: React.PropTypes.func,
      getRouteAtDepth: React.PropTypes.func,
      setRouteComponentAtDepth: React.PropTypes.func,
    },

    getChildContext() {
      return {
        router: RouterStub,
        makePath: function() {},
        makeHref: function() {},
        transitionTo: function() {},
        replaceWith: function() {},
        goBack: function() {},
        isActive: function() {},
        getCurrentPath: function() {},
        getCurrentRoutes: function() {},
        getCurrentPathname: function() {},
        getCurrentParams: function() {},
        getCurrentQuery: function() {},
        getRouteAtDepth: function() {},
        setRouteComponentAtDepth: function() {},
        routeDepth: 0
      };
    },

    getComponent() {
      return this.refs.component;
    },

    render () {
      return <Component ref="component" {...props} />
    }
  });
};