import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

// All pages here
import AccountSettings from "./AccountSettings";
import LogIn from "./LogIn";

const Router = () => (
  <main>
    <Switch>
      <Route path={'/accountsettings'} component={AccountSettings}/>
      <Route path={'/login'} component={LogIn}/>
    </Switch>
  </main>
)

export default Router
