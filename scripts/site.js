(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */

function p(n) {
  return (+n).toLocaleString();
}

function pr(n) {
  return p(Math.round(+n));
}

var Panel = require('./panel'),
    FormGroup = require('./form-group');

var CharacterStats = React.createClass({displayName: 'CharacterStats',
  render: function () {
    return (
      React.DOM.div({className: "col-md-6"}, 
        Panel({heading: "Character Stats"}, 
          FormGroup({for: "primaryAttribute", label: "Primary Attribute"}, 
            React.DOM.input({type: "text", id: "primaryAttribute", value: this.props.primaryAttribute, className: "form-control"})
          ), 
          FormGroup({for: "attackSpeed", label: "Attack Speed"}, 
            React.DOM.input({type: "text", id: "attackSpeed", value: this.props.attackSpeed, className: "form-control"})
          ), 
          FormGroup({for: "critChance", label: "Critical Hit Chance"}, 
            React.DOM.input({type: "text", id: "critChance", value: this.props.critChance, className: "form-control"})
          ), 
          FormGroup({for: "critDamage", label: "Critical Hit Damage"}, 
            React.DOM.input({type: "text", id: "critDamage", value: this.props.critDamage, className: "form-control"})
          ), 
          FormGroup({for: "passiveDamage", label: "Passive Damage"}, 
            React.DOM.input({type: "text", id: "passiveDamage", value: this.props.passiveDamage, className: "form-control"})
          ), 
          FormGroup({for: "elementalDamage", label: "Elemental Damage"}, 
            React.DOM.input({type: "text", id: "elementalDamage", value: this.props.elementalDamage, className: "form-control"})
          ), 
          FormGroup({for: "eliteDamage", label: "Elite Damage"}, 
            React.DOM.input({type: "text", id: "eliteDamage", value: this.props.eliteDamage, className: "form-control"})
          ), 
          FormGroup({label: "Sheet Damage"}, 
            React.DOM.p({className: "form-control-static", title: 'Exact: ' + p(this.props.sheetDamage)}, pr(this.props.sheetDamage))
          ), 
          FormGroup({label: "× Elemental"}, 
            React.DOM.p({className: "form-control-static", title: 'Exact: ' + p(this.props.sheetElementalDamage)}, pr(this.props.sheetElementalDamage))
          ), 
          FormGroup({label: "× Elite"}, 
            React.DOM.p({className: "form-control-static", title: 'Exact: ' + p(this.props.eliteElementalDamage)}, pr(this.props.eliteElementalDamage))
          )
        )
      )
    );
  }
});

module.exports = CharacterStats;

},{"./form-group":2,"./panel":5}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
/** @jsx React.DOM */

function pct(n) {
  return +n * 0.01;
}

function calcAttacksPerSecond(a, b) {
  if (b) {
    return (2 * +a * +b) / (+a + +b);
  } else {
    return +a;
  }
}

function calcSheetDamage(x) {
  var s = 1 + pct(x.primaryAttribute),
      c = 1 + (pct(x.critChance) * pct(x.critDamage)),
      r = (1 + pct(x.attackSpeed)) * calcAttacksPerSecond(x.weapon1AttacksPerSecond, x.weapon2AttacksPerSecond),
      a = (+x.weapon1MinDamage + +x.weapon1MaxDamage + +x.weapon2MinDamage + +x.weapon2MaxDamage) / (x.weapon2AttacksPerSecond ? 4.0 : 2.0),
      m = 1 + pct(x.passiveDamage);
  return s * c * r * a * m;
}

var Header = require('./header'),
    Row = require('./row'),
    Weapon = require('./weapon'),
    CharacterStats = require('./character-stats');

var Page = React.createClass({displayName: 'Page',
  getInitialState: function () {
    return {
      weapon1MinDamage: 1343,
      weapon1MaxDamage: 1841,
      weapon1AttacksPerSecond: 1.47,
      weapon2MinDamage: 1287,
      weapon2MaxDamage: 1763,
      weapon2AttacksPerSecond: 1.4,
      primaryAttribute: 7490,
      attackSpeed: 46.4,
      critChance: 41.5,
      critDamage: 423,
      passiveDamage: 8,
      elementalDamage: 54,
      eliteDamage: 0
    };
  },
  handleChange: function (e) {
    var state = {};
    state[e.target.id] = e.target.value
    this.setState(state);
  },
  render: function () {
    var dps1 = +this.state.weapon1AttacksPerSecond * (+this.state.weapon1MinDamage + +this.state.weapon1MaxDamage) / 2.0,
        dps2 = +this.state.weapon2AttacksPerSecond * (+this.state.weapon2MinDamage + +this.state.weapon2MaxDamage) / 2.0,
        sheetDamage = calcSheetDamage(this.state),
        sheetElementalDamage = sheetDamage * (1 + pct(this.state.elementalDamage)),
        eliteElementalDamage = sheetElementalDamage * (1 + pct(this.state.eliteDamage));
    return (
      React.DOM.div({className: "container"}, 
        Header(null), 
        React.DOM.form({className: "form-horizontal", onChange: this.handleChange}, 
          Row(null, 
            Weapon({number: "1", 
                minDamage: this.state.weapon1MinDamage, 
                maxDamage: this.state.weapon1MaxDamage, 
                attacksPerSecond: this.state.weapon1AttacksPerSecond, 
                dps: dps1}), 
            Weapon({number: "2", 
                minDamage: this.state.weapon2MinDamage, 
                maxDamage: this.state.weapon2MaxDamage, 
                attacksPerSecond: this.state.weapon2AttacksPerSecond, 
                dps: dps2})
          ), 
          Row(null, 
            CharacterStats({
                primaryAttribute: this.state.primaryAttribute, 
                attackSpeed: this.state.attackSpeed, 
                critChance: this.state.critChance, 
                critDamage: this.state.critDamage, 
                passiveDamage: this.state.passiveDamage, 
                elementalDamage: this.state.elementalDamage, 
                eliteDamage: this.state.eliteDamage, 
                sheetDamage: sheetDamage, 
                sheetElementalDamage: sheetElementalDamage, 
                eliteElementalDamage: eliteElementalDamage})
          )
        )
      )
    );
  }
});

module.exports = Page;

},{"./character-stats":1,"./header":3,"./row":6,"./weapon":7}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
/** @jsx React.DOM */

function p(n) {
  return (+n).toLocaleString();
}

function pr(n) {
  return p((+n).toFixed(1));
}

var Panel = require('./panel'),
    FormGroup = require('./form-group');

var Weapon = React.createClass({displayName: 'Weapon',
  render: function () {
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
            React.DOM.p({className: "form-control-static", title: 'Exact: ' + p(this.props.dps)}, pr(this.props.dps))
          )
        )
      )
    );
  }
});

module.exports = Weapon;

},{"./form-group":2,"./panel":5}],8:[function(require,module,exports){
(function () {
  'use strict';

  React.renderComponent(
    require('./components/page')(null),
    document.getElementById('container'));
})();

},{"./components/page":4}]},{},[8]);
