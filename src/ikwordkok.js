
var cookbook = require('./cookbook/cookbook');
var player = require('./player/player');
var view_cookbook = require('./views/cookbook');
var view_level = require('./views/level');
var view_game = require('./views/game');

var game = function(config) {
    var game_ = {};
    var views = {};

    var current_player = player("jaap");

    var current_view = view_cookbook(game_, current_player, {});

    function show_cookbook(rank, recipe) {
        current_view.remove();
        current_view = view_cookbook(game_, current_player, {});
    }

    function show_game(rank, recipe) {
        current_view.remove();
        current_view = view_game(
                game_,
                current_player,
                rank,
                recipe
        );
    }

    function show_level_intro(rank, recipe) {
        current_view.remove();
        current_view = view_level(
                game_,
                "Opdracht",
                "<h1>" + recipe.title + "</h1>" +
                "<p>beschikbare tijd: 29 seconden</p>",
                [{
                    name: 'next',
                    label: 'Start het spel',
                    callback: function() {
                        show_game(rank, recipe);
                    }
                }
                ]
                );
    }


    function show_level_recipe(rank, recipe) {
        current_view.remove();
        current_view = view_level(
                game_,
                "Recept",
                "<h1>" + recipe.title + "</h1>" +
                recipe.description,
                [
                {
                    name: 'next',
                    label: 'Terug naar het kookboek',
                    callback: function() {
                        show_cookbook(rank, recipe);
                    }
                },
                {
                    name: 'again',
                    label: 'Speel het spel opnieuw',
                    callback: function() {
                        show_game(rank, recipe);
                    }
                }
                ]
                );
    }


    function show_level_failure(rank, recipe) {
        current_view.remove();
        current_view = view_level(
                game_,
                "Recept",
                "<h1>" + recipe.title + "</h1>" +
                recipe.description,
                [
                {
                    name: 'next',
                    label: 'Terug naar het kookboek',
                    callback: function() {
                        show_cookbook(rank, recipe);
                    }
                },
                {
                    name: 'again',
                    label: 'Speel het spel opnieuw',
                    callback: function() {
                        show_level_recipe(rank, recipe);
                    }
                }
                ]
                );
    }

    function show_level_up(rank, recipe) {
        current_view.remove();
        current_view = view_level(
                game_,
                "Level Up!",
                "<h1>Je bent nu " + RANKS[rank+1] + "</h1>",
                [
                {
                    name: 'next',
                    label: 'Terug naar het kookboek',
                    callback: function() {
                        show_cookbook(rank, recipe);
                    }
                },
                {
                    name: 'again',
                    label: 'Speel het spel opnieuw',
                    callback: function() {
                        show_level_recipe(rank, recipe);
                    }
                }
                ]
                );
    }

    // public interface
    game_.show_cookbook = show_cookbook;
    game_.show_level_intro = show_level_intro;
    game_.show_game = show_game;
    game_.show_level_recipe = show_level_recipe;
    game_.show_level_failure = show_level_failure;
    game_.show_level_up = show_level_up;
    return game_;
};

game({});
