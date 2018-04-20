$ = jQuery = require('jquery');
var React = require('react');
var Headers = require('./components/common/header');
var Home = require('./components/homePage');
var About = require('./components/about/aboutPage');

(function(win){
    "use strict";
    var App = React.createClass({
        render: function(props) {
            var Child;

            switch(this.props.route) {
                case 'about': Child = About;
                    break;
                default: Child = Home;
            }

            return (
                <div>
                    <Headers />
                    <Child />
                </div>
            );
        }
    });

    function render() {
        var route = win.location.hash.substr(1);
        React.render(<App route={route}/>, document.getElementById('app'));
    }

    // when application renders we need to look for
    win.addEventListener('hashchange', render);
    render();
})(window);