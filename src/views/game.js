var view = require('./view');
var dom = require('../dom/dom');
var RANKS = require('../constants/ranks');
var PRODUCTS = require('../database/products');

var view_game = function(game, player, rank, recipe, config) {

    var fragment = document.createDocumentFragment();

    var rank_spec = RANKS[rank];
    var size = rank_spec.size;
    var time = size * rank_spec.time_per_square;

    var time_line = fragment.appendChild(dom.create({
        name: "div",
        attributes: {
            "class": "timer"
        },
        children: [{
            name: "p",
            value: time + " seconden over"
        }]
    }));

    var playing_board = fragment.appendChild(dom.create({
        name: "table"
    }));

    function fill_board(size, recipe) {
        var products = recipe.products;

        function product_to_square(prod) {
            return {
                id: prod.id,
                title: prod.title,
                img: prod.img
            };
        }
        var squares = products.map(product_to_square);
        var rest = size*size - squares.length;


        function random_elt(arr) {
            var ps = arr.length;
            var elt = arr[Math.floor(Math.random()*ps)];
            return elt;
        }
        // generate squares
        for (var i = 0; i < rest; i++) {
            squares.push(random_elt(PRODUCTS));
        }

        squares = squares.sort(function() {return 0.5 - Math.random();});

        var nr_of_squares = 0;
        var row = playing_board.appendChild(dom.create({
            name: "tr"
        }));
        for (var i = 0; i < squares.length; i++) {
            if (nr_of_squares % size === 0 && nr_of_squares !== squares.length) {
                row = playing_board.appendChild(dom.create({
                    name: "tr"
                }));
            }

            var product = squares[i];

            row.appendChild(dom.create({
                name: "td",
                attributes: {
                    "data-id": product.id
                },
                children: [
                    {
                        name: "img",
                        attributes: {
                            src: "img/" + product.image,
                            alt: product.title
                        }
                    }  
                ],
                on: {
                    type: "click",
                    callback: toggle_square
                }
            }));
    
            nr_of_squares++;
        }

    }

    function toggle_square(event) {
        this.classList.toggle('selected');
    }

    fill_board(size, recipe);

    var action_buttons = fragment.appendChild(dom.create({
        name: "div",
        attributes: {
            "class": "actions"
        }
    }));

    function createAction(action) {
        action_buttons.appendChild(dom.create({
            name: "button",
            value: action.label,
            attributes: {
                id: action.name
            },
            on: {
                type: 'click',
                callback: action.callback
            }
        }));
    }

    var actions = [
                {
                    name: 'finish',
                    label: 'Klaar!',
                    callback: finish
                },
                {
                    name: 'stop',
                    label: 'Terug naar het kookboek',
                    callback: stop
                }
        ];
    actions.forEach(createAction);

    function finish() {
        var selected_squares = playing_board.querySelectorAll("td.selected");
        var selected = [];
        for (var j = 0; j < selected_squares.length; j++) {
            var sel = selected_squares[j];
        }
        var products_obj = {};
        PRODUCTS.forEach(function(p) {
            products_obj[p.id] = p;
        });

        var in_recipe = [];

        function find_in_arr(field, value, arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][field] == value) {
                    return true;
                }
            }
            return false;
        }

        for (var i = 0; i < selected.length; i++) {
            var sel = selected[i];
            if (find_in_array('id', sel, recipe.producs)) {
                in_recipe.push(sel);
            }
        }

        var not_in_recipe = [];

    }

    function stop() {
        game.show_cookbook(rank, recipe);
    }

    var view_ = view('game', {});
    view_.append(fragment);
   

    return view_;
};

module.exports = view_game;
