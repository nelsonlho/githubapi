import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import List from './pages/List';
import Detail from './pages/Detail';
import User from './pages/User';
import Issue from './pages/Issue';

const routes = (
    <Route path="/" component={ App }>
        <IndexRoute component={ Issue } />
        <Route path="detail/:repo" component={ Detail } />
        <Route path="user/:user" component={ User } />
        

    </Route>
);

export default routes;
