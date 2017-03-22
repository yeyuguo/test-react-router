import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/Main';

// Render the main component into the dom
// ReactDOM.render(<App />, document.getElementById('app'));

// import PicApp from './components/Picture'
// ReactDOM.render(<PicApp />, document.getElementById('app'));

import {Router} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

const history = createBrowserHistory()

import routes from './components/routes/main'


const TopRoutes=(
    <Router history={history}>
        {routes}
    </Router>
)

ReactDOM.render(TopRoutes, document.getElementById('app'))



