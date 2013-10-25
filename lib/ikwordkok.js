;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){

var cookbook = function(config) {
};

module.exports = cookbook;

},{}],2:[function(require,module,exports){

var cookbook = require('./cookbook/cookbook');
var player = require('./player/player');

var p = player("jaap");

console.log(p.rank().name);

},{"./cookbook/cookbook":1,"./player/player":3}],4:[function(require,module,exports){
module.exports = [
    {
        name: "keukenhulpje"
    },{
        name: "sous-chef"
    }, {
        name: "chef"
    }
];

},{}],3:[function(require,module,exports){

var RANKS = require('../constants/ranks');

var EMPTY_COOKBOOK = require('../database/cookbook');

var player = function(name_, rank_, cookbook_) {
    var _player = {};

    var rank_ = rank_ || RANKS[0];
    var cookbook_ = cookbook_ || EMPTY_COOKBOOK;

    function name() {
        return name_;
    }

    function rank(new_ranking) {
        if (arguments.length === 1) {
            rank_ = new_ranking;
        }
        return rank_;
    }


    function has_recipe_discovered(recipe) {
        return cookbook_[recipe.rank][recipe.id];
    }

    function discover_new_recipe(recipe) {
        if (!has_discovered(recipe)) {
            cookbook_[recipe.rank][recipe.id] = recipe;
        }
    }


    // public interface
    _player.name = name;
    _player.rank = rank;
    _player.has_recipe_discovered = has_recipe_discovered;
    _player.discover_new_recipe = discover_new_recipe;
    return _player;
};

module.exports = player;

},{"../constants/ranks":4,"../database/cookbook":5}],5:[function(require,module,exports){
var cookbook = [
    {
        rank: 0,
        recipes: [
            {
                id: "tom1",
                name: "tomatensoep"
            }, {
                id: "sla1",
                name: "sla"
            }
        ]
    }, {
        rank: 1,
        recipes: [
            {
                id: "aardappelpuree1",
                name: "aardappelpuree"
            }, {
                id: "appelsap",
                name: "appelsap"
            }
        ]
    }, {
        rank: 2,
        recipes: [
            { 
                id: "tortilla1",
                name: "tortilla"
            }
        ]
    }
];

module.exports = cookbook;

},{}]},{},[2])
;