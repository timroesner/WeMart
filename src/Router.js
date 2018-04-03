import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

// All pages here
import SignUp from './SignUp'
import LogIn from './LogIn'
import Confirm from './Confirm'
import PasswordReset from './PasswordReset'
import ZipCodeCheck from './ZipCodeCheck'

const Router = () => (
  <main>
    <Switch>
      <Route exact path='/signup' component={SignUp}/>
      <Route path='/login' component={LogIn}/>
      <Route path='/confirm' component={Confirm}/>
      <Route path='/passwordreset' component={PasswordReset}/>
      <Route path='/' component={ZipCodeCheck}/>
    </Switch>
  </main>
)

export default Router

