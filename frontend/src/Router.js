import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';

class Router extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>                    
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />   
                    <Route exact path="/new" component={Form} />          
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;