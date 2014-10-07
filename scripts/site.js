(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */

var Panel = require('./panel'),
    FormGroup = require('./form-group'),
    FormControlStatic = require('./form-control-static');

var CharacterStats = React.createClass({displayName: 'CharacterStats',
  render: function () {
    return (
      React.DOM.div({className: "col-md-6"}, 
        Panel({heading: "Character Stats"}, 
          FormGroup({for: "primaryAttribute", label: "Primary Attribute"}, 
            React.DOM.input({type: "text", id: "primaryAttribute", value: this.props.primaryAttribute, className: "form-control"})
          ), 
          FormGroup({for: "attackSpeed", label: "Attack Speed", suffix: "%"}, 
            React.DOM.input({type: "text", id: "attackSpeed", value: this.props.attackSpeed, className: "form-control"})
          ), 
          FormGroup({for: "critChance", label: "Critical Hit Chance", suffix: "%"}, 
            React.DOM.input({type: "text", id: "critChance", value: this.props.critChance, className: "form-control"})
          ), 
          FormGroup({for: "critDamage", label: "Critical Hit Damage", suffix: "%"}, 
            React.DOM.input({type: "text", id: "critDamage", value: this.props.critDamage, className: "form-control"})
          ), 
          FormGroup({for: "passiveDamage", label: "Passive Damage", suffix: "%"}, 
            React.DOM.input({type: "text", id: "passiveDamage", value: this.props.passiveDamage, className: "form-control"})
          ), 
          FormGroup({for: "elementalDamage", label: "Elemental Damage", suffix: "%"}, 
            React.DOM.input({type: "text", id: "elementalDamage", value: this.props.elementalDamage, className: "form-control"})
          ), 
          FormGroup({for: "eliteDamage", label: "Elite Damage", suffix: "%"}, 
            React.DOM.input({type: "text", id: "eliteDamage", value: this.props.eliteDamage, className: "form-control"})
          ), 
          FormGroup({label: "Sheet Damage"}, 
            FormControlStatic({value: this.props.sheetDamage})
          ), 
          FormGroup({label: "× Elemental"}, 
            FormControlStatic({value: this.props.sheetElementalDamage})
          ), 
          FormGroup({label: "× Elite"}, 
            FormControlStatic({value: this.props.eliteElementalDamage})
          )
        )
      )
    );
  }
});

module.exports = CharacterStats;

},{"./form-control-static":4,"./form-group":5,"./panel":8}],2:[function(require,module,exports){
/** @jsx React.DOM */

var Panel = require('./panel'),
    FormGroup = require('./form-group'),
    FormControlStatic = require('./form-control-static'),
    Definition = require('./definition'),
    Character = require('../models/character');

var DamagePerStat = React.createClass({displayName: 'DamagePerStat',
  render: function () {
    var c = this.props.character,
        sheetDamage = c.sheetDamage,
        sheetElementalDamage = c.sheetElementalDamage,
        eliteElementalDamage = c.eliteElementalDamage,
        weaponDamage = new Character(c, 'weapon1MinDamage').sheetDamage,
        primaryAttribute = new Character(c, 'primaryAttribute').sheetDamage,
        critChance = new Character(c, 'critChance', 0.5).sheetDamage,
        critDamage = new Character(c, 'critDamage').sheetDamage,
        attackSpeed = new Character(c, 'attackSpeed').sheetDamage,
        passiveDamage = new Character(c, 'passiveDamage').sheetDamage,
        elementalDamage = new Character(c, 'elementalDamage').sheetElementalDamage,
        eliteDamage = new Character(c, 'eliteDamage').eliteElementalDamage;
    return (
      React.DOM.div({className: "col-md-6"}, 
        Panel({heading: "Damage per Stat"}, 
          React.DOM.p(null, "Each number represents how much damage you will gain by increasing the specified stat by 1."), 
          React.DOM.p(null, "Critical Hit Chance damage is based on an increase of 0.5 instead of 1."), 
          React.DOM.dl({className: "dl-horizontal"}, 
            React.DOM.dt(null, "Weapon Damage"), 
            Definition({value: weaponDamage - sheetDamage}), 
            React.DOM.dt(null, "Primary Attribute"), 
            Definition({value: primaryAttribute - sheetDamage}), 
            React.DOM.dt(null, "Critical Hit Chance"), 
            Definition({value: critChance - sheetDamage}), 
            React.DOM.dt(null, "Critical Hit Damage"), 
            Definition({value: critDamage - sheetDamage}), 
            React.DOM.dt(null, "Attack Speed"), 
            Definition({value: attackSpeed - sheetDamage}), 
            React.DOM.dt(null, "Passive Damage"), 
            Definition({value: passiveDamage - sheetDamage}), 
            React.DOM.dt(null, "× Elemental"), 
            Definition({value: elementalDamage - sheetElementalDamage}), 
            React.DOM.dt(null, "× Elite"), 
            Definition({value: eliteDamage - eliteElementalDamage})
          )
        )
      )
    );
  }
});

module.exports = DamagePerStat;

},{"../models/character":11,"./definition":3,"./form-control-static":4,"./form-group":5,"./panel":8}],3:[function(require,module,exports){
/** @jsx React.DOM */

var Definition = React.createClass({displayName: 'Definition',
  render: function () {
    var precision = +this.props.precision,
        exact = this.props.value.toLocaleString(),
        rounded = (+this.props.value.toFixed(precision)).toLocaleString();
    return (
      React.DOM.dd({title: 'Exact: ' + exact}, rounded)
    );
  }
});

module.exports = Definition;

},{}],4:[function(require,module,exports){
/** @jsx React.DOM */

var FormControlStatic = React.createClass({displayName: 'FormControlStatic',
  render: function () {
    var precision = +this.props.precision,
        exact = this.props.value.toLocaleString(),
        rounded = (+this.props.value.toFixed(precision)).toLocaleString();
    return (
      React.DOM.p({className: "form-control-static", title: 'Exact: ' + exact}, rounded)
    );
  }
});

module.exports = FormControlStatic;

},{}],5:[function(require,module,exports){
/** @jsx React.DOM */

var FormGroup = React.createClass({displayName: 'FormGroup',
  render: function () {
    if (this.props.suffix) {
      return (
        React.DOM.div({className: "form-group"}, 
          React.DOM.label({for: this.props.for, className: "col-sm-3 col-md-5 col-lg-4 control-label"}, this.props.label), 
          React.DOM.div({className: "col-sm-9 col-md-7 col-lg-8"}, 
            React.DOM.div({className: "input-group"}, 
              this.props.children, 
              React.DOM.span({className: "input-group-addon"}, this.props.suffix)
            )
          )
        )
      );
    } else {
      return (
        React.DOM.div({className: "form-group"}, 
          React.DOM.label({for: this.props.for, className: "col-sm-3 col-md-5 col-lg-4 control-label"}, this.props.label), 
          React.DOM.div({className: "col-sm-9 col-md-7 col-lg-8"}, 
            this.props.children
          )
        )
      );
    }
  }
});

module.exports = FormGroup;

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
/** @jsx React.DOM */

var Header = require('./header'),
    Row = require('./row'),
    Weapon = require('./weapon'),
    CharacterStats = require('./character-stats'),
    DamagePerStat = require('./damage-per-stat'),
    Character = require('../models/character');

var Page = React.createClass({displayName: 'Page',
  getInitialState: function () {
    return { character: new Character() };
  },
  handleChange: function (e) {
    var character = new Character(this.state.character);
    character[e.target.id] = e.target.value;
    this.setState({ character: character });
  },
  render: function () {
    var c = this.state.character;
    return (
      React.DOM.div({className: "container"}, 
        Header(null), 
        React.DOM.form({className: "form-horizontal", onChange: this.handleChange}, 
          Row(null, 
            Weapon({number: "1", 
                minDamage: c.weapon1MinDamage, 
                maxDamage: c.weapon1MaxDamage, 
                attacksPerSecond: c.weapon1AttacksPerSecond, 
                dps: c.weapon1DPS}), 
            Weapon({number: "2", 
                minDamage: c.weapon2MinDamage, 
                maxDamage: c.weapon2MaxDamage, 
                attacksPerSecond: c.weapon2AttacksPerSecond, 
                dps: c.weapon2DPS})
          ), 
          Row(null, 
            CharacterStats({
                primaryAttribute: c.primaryAttribute, 
                attackSpeed: c.attackSpeed, 
                critChance: c.critChance, 
                critDamage: c.critDamage, 
                passiveDamage: c.passiveDamage, 
                elementalDamage: c.elementalDamage, 
                eliteDamage: c.eliteDamage, 
                sheetDamage: c.sheetDamage, 
                sheetElementalDamage: c.sheetElementalDamage, 
                eliteElementalDamage: c.eliteElementalDamage}), 
            DamagePerStat({character: c})
          )
        )
      )
    );
  }
});

module.exports = Page;

},{"../models/character":11,"./character-stats":1,"./damage-per-stat":2,"./header":6,"./row":9,"./weapon":10}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
/** @jsx React.DOM */

var Panel = require('./panel'),
    FormGroup = require('./form-group'),
    FormControlStatic = require('./form-control-static');

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
            FormControlStatic({value: this.props.dps, precision: "1"})
          )
        )
      )
    );
  }
});

module.exports = Weapon;

},{"./form-control-static":4,"./form-group":5,"./panel":8}],11:[function(require,module,exports){
var Character = (function () {
  var stats = {
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


  function Character(state, stat, inc) {
    if (state) {
      this.loadFromState(state);
      if (stat) {
        this[stat] += inc || 1;
      }
    } else {
      if (localStorageSupport()) {
        this.loadFromLocalStorage();
      }
    }
  }


  Character.prototype.loadFromState = function (state) {
    Object.keys(state).forEach(function (key) {
      this[key] = state[key];
    }, this);
  };

  Character.prototype.loadFromLocalStorage = function () {
    var character = localStorage['character'];
    if (character) {
      this.loadFromState(JSON.parse(character));
    }
  };

  Character.prototype.saveToLocalStorage = function () {
    localStorage['character'] = JSON.stringify(this);
  };


  Object.keys(stats).forEach(function (key) {
    var field = '_' + key;
    Object.defineProperty(Character.prototype, key, {
      get: function () {
        if (field in this) {
          return this[field];
        } else {
          return stats[key];
        }
      },
      set: function (value) {
        this[field] = +value;
        if (localStorageSupport()) {
          this.saveToLocalStorage();
        }
      }
    });
  });

  Object.defineProperty(Character.prototype, 'weapon1DPS', {
    get: function () {
      return dps(
        this.weapon1MinDamage,
        this.weapon1MaxDamage,
        this.weapon1AttacksPerSecond);
    }
  });

  Object.defineProperty(Character.prototype, 'weapon2DPS', {
    get: function () {
      return dps(
        this.weapon2MinDamage,
        this.weapon2MaxDamage,
        this.weapon2AttacksPerSecond);
    }
  });

  Object.defineProperty(Character.prototype, 'attacksPerSecond', {
    get: function () {
      if (this.weapon2AttacksPerSecond > 0) {
        var a = this.weapon1AttacksPerSecond,
            b = this.weapon2AttacksPerSecond;
        return (2 * a * b) / (a + b);
      } else {
        return this.weapon1AttacksPerSecond;
      }
    }
  });

  Object.defineProperty(Character.prototype, 'sheetDamage', {
    get: function () {
      var s = 1 + pct(this.primaryAttribute),
          c = 1 + (pct(this.critChance) * pct(this.critDamage)),
          r = (1 + pct(this.attackSpeed)) * this.attacksPerSecond,
          a = (+this.weapon1MinDamage + +this.weapon1MaxDamage + +this.weapon2MinDamage + +this.weapon2MaxDamage) / (this.weapon2AttacksPerSecond ? 4.0 : 2.0),
          m = 1 + pct(this.passiveDamage);
      return s * c * r * a * m;
    }
  });

  Object.defineProperty(Character.prototype, 'sheetElementalDamage', {
    get: function () {
      return this.sheetDamage * (1 + pct(this.elementalDamage));
    }
  });

  Object.defineProperty(Character.prototype, 'eliteElementalDamage', {
    get: function () {
      return this.sheetElementalDamage * (1 + pct(this.eliteDamage));
    }
  });


  function localStorageSupport() {
    try {
      localStorage.setItem('x', 'x');
      localStorage.removeItem('x');
      return 'JSON' in window && 'parse' in JSON && 'stringify' in JSON;
    } catch (e) {
      return false;
    }
  }

  function dps(min, max, aps) {
    return aps * (min + max) / 2.0;
  }

  function pct(n) {
    return n * 0.01;
  }


  return Character;
})();

module.exports = Character;

},{}],12:[function(require,module,exports){
(function () {
  'use strict';

  React.renderComponent(
    require('./components/page')(null),
    document.getElementById('container'));
})();

},{"./components/page":7}]},{},[12]);
