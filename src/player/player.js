
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
