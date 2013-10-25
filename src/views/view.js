var dom = require('../dom/dom');

var view = function(classname, config) {
    var view_ = {};
    var parent = document.getElementsByTagName('main')[0];   
    var child = parent.appendChild(dom.create({
        name: 'div'
    }));
    child.classList.add(classname);

    view_.append = function(fragment) {
        child.appendChild(fragment);
    };
    view_.remove = function() {
        parent.removeChild(child);
    };
    return view_;
};

module.exports = view;
