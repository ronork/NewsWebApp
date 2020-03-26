
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import NewsSources from './modules/SourcesList/NewsSources';
import NewsFeed from './modules/Feed/NewsFeed';
import pageNotFound from './modules/Error/pageNotFound';

export default function PageRouter() {
    return (<Router>
        <Switch>
            <Route exact path="/" component={NewsSources} />
            <Route path="/dailyfeed" component={NewsFeed} />
            <Route path="*" component={pageNotFound} />
        </Switch>
    </Router>)
}

