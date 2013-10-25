
var dom = require('../dom/dom');
var view = require('../views/view');

var level = function(game, title, body, actions, config) { 
    var fragment = document.createDocumentFragment();

    var title_ = fragment.appendChild(dom.create({
        name: "h2",
        value: title
    }));

    var body_ = fragment.appendChild(dom.create({
        name: "div",
        attributes: {
            "class": "content"
        }
    }));

    body_.innerHTML = body;

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

    actions = actions || [];
    actions.forEach(createAction);


    var view_ = view('level', {});
    view_.append(fragment);
    return view_;
};

module.exports = level;
