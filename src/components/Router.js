import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './Login'
import App from './App.js'
import NotFound from './NotFound'

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/user/:userId" component={App}/>
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;