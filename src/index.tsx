import React from 'react';
import ReactDOM from 'react-dom';
import Tasks from './client/components/pages/tasks';
import Profiles from './client/components/pages/profiles';
import Proxies from './client/components/pages/proxies';
import Settings from './client/components/pages/settings';
import { Route, HashRouter} from 'react-router-dom';
// eslint-disable-next-line
import Login from './client/components/pages/login';
import Root from './client/components/Root';



ReactDOM.render(
    <React.StrictMode>
        <Root/>
        <HashRouter>
            <Route path="/" exact component={Tasks} />
            <Route path="/tasks" exact component={Tasks} />
            <Route path="/profiles" exact component={Profiles} />
            <Route path="/proxies" exact component={Proxies} />
            <Route path="/settings" exact component={Settings} />
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

