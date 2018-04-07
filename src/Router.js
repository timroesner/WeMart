import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

// All pages here
import ItemGridTest from "./ItemGridTest";

const Router = () => (
  <main>
    <Switch>
        <Route path='/itemgridtest' component={ItemGridTest}/>
    </Switch>
  </main>
)

export default Router
