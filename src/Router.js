import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

// All pages here
import SignUp from './SignUp'
import LogIn from './LogIn'
import Confirm from './Confirm'
import PasswordReset from './PasswordReset'
import ZipCodeCheck from './ZipCodeCheck'
import Home from './components/Home'
import Checkout from "./Checkout";

const Router = () => (
  <main>
    <Switch>
        <Route path={'/checkout'} component={Checkout}/>
    </Switch>
  </main>
)

export default Router
