import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import PostOccurrences from './pages/PostOccurrences';
import Occurrence from './pages/Occurrence';
import NotFound from './pages/NotFound';


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main}></Route>
            <Route exact path="/post" component={PostOccurrences}></Route>
            <Route path="/occurrence/:id" component={Occurrence}></Route>
            <Route path='*' component={NotFound} />
        </Switch>
    </BrowserRouter>
);


export default Routes;