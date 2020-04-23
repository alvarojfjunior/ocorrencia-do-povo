import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Loading from './components/Loading';
import PostOccurrences from './pages/PostOccurrences';
import Occurrence from './pages/Occurrence';
import NotFound from './pages/NotFound';


const Routes = (props) => (
    <BrowserRouter>
        {
            props.state.loading.visible ? <Loading /> :
                <Switch>
                    <Route exact path="/" component={Main}></Route>
                    <Route exact path="/post" component={PostOccurrences}></Route>
                    <Route path="/occurrence/:id" component={Occurrence}></Route>
                    <Route path='*' component={NotFound} />
                </Switch>
        }
    </BrowserRouter>
);


export default connect(state => ({ state }))(Routes);