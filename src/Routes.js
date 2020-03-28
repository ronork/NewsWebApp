
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import NewsSources from './modules/SourcesList/NewsSources';
import NewsFeed from './modules/Feed/NewsFeed';
import Page4XX from './utility/Error/errorPage';

export default function PageRouter() {
    return (<Router>
        <Switch>
            <Route exact path="/" component={NewsSources} />
            <Route path="/dailyfeed" component={NewsFeed} />
            <Route path="*" component={Page4XX} />
        </Switch>
    </Router>)
}

