$ = jQuery = require('jquery');
var React = require('react');
var Home = require('./components/homePage');

// get our home page component and attach it to app element on
// the main page
React.render(<Home />, document.getElementById('app'));