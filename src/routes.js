import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from './pages/App';
// import List from './pages/Issue';
// import Detail from './pages/IssueDetail';
// import User from './pages/User';
import Issue from './pages/Issue';
import IssueDetail from './pages/IssueDetail';

const routes = (
    <Route path="/" component={ App }>
         <IndexRoute component={ Issue } />
         <Route path="issue/:issueID" component={ IssueDetail } />


    </Route>
);

export default routes;
