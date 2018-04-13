import React from 'react';

import { Route, Switch } from 'react-router-dom';

// All pages here
import Checkout from "./Checkout";

const Router = () => (
  <main>
    <Switch>
        <Route path={'/checkout'} component={Checkout}/>
    </Switch>
  </main>
)

export default Router
