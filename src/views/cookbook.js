
var ORIGINAL_COOKBOOK = require('../database/cookbook');
var RANKS = require('../constants/ranks');
var view = require('./view');
var dom = require('../dom/dom');

var cookbook = function(game, player, config) {

    var fragment = document.createDocumentFragment();

    var rank = fragment.appendChild(dom.create({
        name: 'span',
        value: player.rank().name,
        attributes: {
            'class': 'rank'
        }
    }));
    
    var heading_text = player.name() + "s Kookboek";
    var heading = fragment.appendChild(dom.create({
        name: 'h2',
        value: heading_text
    }));

    var COLS = config.cols || 3;

    function createCookbookTable(cb) {

        console.log(cb);
        var table = dom.create({
            name: "table"
        });

        function createRank(rank) {
            var recipes = rank.recipes;
            var ROWS = Math.floor(recipes.length / COLS);
            if (recipes.length % COLS > 0) {
                ROWS++;
            }

            var row = table.appendChild(dom.create({
                name: 'tr'
            }));

            
            var rank_cell = row.appendChild(dom.create({
                name: 'th',
                value: RANKS[rank.rank].name
            }));

            var col_nr = 0, row_nr = 0, recipe_number = 0;
            while (row_nr < ROWS) {
                for (var i = 0; i < COLS; i++) {
                    var title = '';
                    if (recipe_number < recipes.length) {
                        var recipe = recipes[recipe_number];
                        title = recipe.title;
                        row.appendChild(dom.create({
                            name: "td",
                            value: title,
                            on: {
                                type: 'click',
                                callback: start_level(rank.rank, recipe)
                            }
                        }));
                    } else {
                        row.appendChild(dom.create({
                            name: "td",
                            value: title
                        }));
                    }
                    recipe_number++;
                }

                row = table.appendChild(dom.create({
                    name: 'tr',
                }));

                row_nr++;
            }

            rank_cell.setAttribute('rowspan', ROWS);

        }
        
        cb.forEach(createRank);
       
        return table; 
    }


    fragment.appendChild(createCookbookTable(ORIGINAL_COOKBOOK));

    var view_ = view('cookbook', {});
    view_.append(fragment);
    
    function start_level(rank, recipe) {
        return function(event) {
            game.show_level_intro(rank, recipe);
        };
    }

    return view_;
};

module.exports = cookbook;
