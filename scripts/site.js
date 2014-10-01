(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */

var FormGroup = React.createClass({displayName: 'FormGroup',
  render: function () {
    return (
      React.DOM.div({className: "form-group"}, 
        React.DOM.label({for: this.props.for, className: "col-sm-3 col-md-5 col-lg-4 control-label"}, this.props.label), 
        React.DOM.div({className: "col-sm-9 col-md-7 col-lg-8"}, 
          this.props.children
        )
      )
    );
  }
});

module.exports = FormGroup;

},{}],2:[function(require,module,exports){
/** @jsx React.DOM */

var Header = React.createClass({displayName: 'Header',
  render: function () {
    return (
      React.DOM.div({className: "page-header"}, 
        React.DOM.h1(null, "D3PS :: Diablo 3 Damage Calculator")
      )
    );
  }
});

module.exports = Header;

},{}],3:[function(require,module,exports){
/** @jsx React.DOM */

var Header = require('./header'),
    Row = require('./row'),
    Weapon = require('./weapon');

var Page = React.createClass({displayName: 'Page',
  getInitialState: function () {
    return {
      weapon1MinDamage: 1343,
      weapon1MaxDamage: 1841,
      weapon1AttacksPerSecond: 1.47,
      weapon2MinDamage: 1287,
      weapon2MaxDamage: 1763,
      weapon2AttacksPerSecond: 1.4
    };
  },
  handleChange: function (e) {
    var state = {};
    state[e.target.id] = e.target.value
    this.setState(state);
  },
  render: function () {
    return (
      React.DOM.div({className: "container"}, 
        Header(null), 
        React.DOM.form({className: "form-horizontal", onChange: this.handleChange}, 
          Row(null, 
            Weapon({number: "1", minDamage: this.state.weapon1MinDamage, maxDamage: this.state.weapon1MaxDamage, attacksPerSecond: this.state.weapon1AttacksPerSecond}), 
            Weapon({number: "2", minDamage: this.state.weapon2MinDamage, maxDamage: this.state.weapon2MaxDamage, attacksPerSecond: this.state.weapon2AttacksPerSecond})
          )
        )
      )
    );
  }
});

module.exports = Page;

},{"./header":2,"./row":5,"./weapon":6}],4:[function(require,module,exports){
/** @jsx React.DOM */

var Panel = React.createClass({displayName: 'Panel',
  render: function () {
    return (
      React.DOM.div({className: "panel panel-default"}, 
        React.DOM.div({className: "panel-heading"}, this.props.heading), 
        React.DOM.div({className: "panel-body"}, 
          this.props.children
        )
      )
    );
  }
});

module.exports = Panel;

},{}],5:[function(require,module,exports){
/** @jsx React.DOM */

var Row = React.createClass({displayName: 'Row',
  render: function () {
    return (
      React.DOM.div({className: "row"}, 
        this.props.children
      )
    );
  }
});

module.exports = Row;

},{}],6:[function(require,module,exports){
/** @jsx React.DOM */

var Panel = require('./panel'),
    FormGroup = require('./form-group');

var Weapon = React.createClass({displayName: 'Weapon',
  render: function () {
    var dps = +this.props.attacksPerSecond * (+this.props.minDamage + +this.props.maxDamage) / 2,
        dpsExact = dps.toLocaleString(),
        dpsFriendly = (+dps.toFixed(1)).toLocaleString();
    return (
      React.DOM.div({className: "col-md-6"}, 
        Panel({heading: 'Weapon ' + this.props.number}, 
          FormGroup({for: 'weapon' + this.props.number + 'MinDamage', label: "Minimum Damage"}, 
            React.DOM.input({type: "text", id: 'weapon' + this.props.number + 'MinDamage', value: this.props.minDamage, className: "form-control"})
          ), 
          FormGroup({for: 'weapon' + this.props.number + 'MaxDamage', label: "Maximum Damage"}, 
            React.DOM.input({type: "text", id: 'weapon' + this.props.number + 'MaxDamage', value: this.props.maxDamage, className: "form-control"})
          ), 
          FormGroup({for: 'weapon' + this.props.number + 'AttacksPerSecond', label: "Attacks per Second"}, 
            React.DOM.input({type: "text", id: 'weapon' + this.props.number + 'AttacksPerSecond', value: this.props.attacksPerSecond, className: "form-control"})
          ), 
          FormGroup({label: "Damage per Second"}, 
            React.DOM.p({className: "form-control-static", title: 'Exact: ' + dpsExact}, dpsFriendly)
          )
        )
      )
    );
  }
});

module.exports = Weapon;

},{"./form-group":1,"./panel":4}],7:[function(require,module,exports){
(function () {
  'use strict';

  React.renderComponent(
    require('./components/page')(null),
    document.getElementById('container'));
})();

},{"./components/page":3}]},{},[7]);
