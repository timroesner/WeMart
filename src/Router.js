import React from 'react';
import { Route, Switch } from 'react-router-dom';

// All pages here
import SignUp from './SignUp'
import LogIn from './LogIn'
import Confirm from './Confirm'
import PasswordReset from './PasswordReset'
import ZipCodeCheck from './ZipCodeCheck'
import Home from './Home'
import Item from './Item'
import Departments from './Departments'
import ShoppingList from './ShoppingList'

const Router = () => (
  <main>
    <Switch>
      <Route exact path='/signup' component={SignUp}/>
      <Route path='/login' component={LogIn}/>
      <Route path='/confirm' component={Confirm}/>
      <Route path='/passwordreset' component={PasswordReset}/>
      <Route path='/home' component={Home} />
      <Route path='/item' component={Item} />
      <Route path='/departments' component={Departments}/>
      <Route path='/shoppinglist' component={ShoppingList}/>
      <Route path='/' component={ZipCodeCheck}/>
    </Switch>
  </main>
)

export default Router
