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

import AboutUs from './AboutUs'
import Locations from './Locations'
import Privacy from './Privacy'
import Terms from './Terms'
import Departments from './Departments'




const Router = () => (

  <main>
    <Switch>
      <Route exact path='/signup' component={SignUp}/>
      <Route path='/login' component={LogIn}/>
      <Route path='/confirm' component={Confirm}/>
      <Route path='/passwordreset' component={PasswordReset}/>
      <Route path='/home' component={Home} />
      <Route path='/item' component={Item} />

      <Route path='/aboutus' component={AboutUs} />
      <Route path='/locations' component={Locations} />
      <Route path='/privacy' component={Privacy} />
      <Route path='/terms' component={Terms} />

      <Route path='/departments' component={Departments}/>

      <Route path='/' component={ZipCodeCheck}/>
    </Switch>
  </main>
)

export default Router
