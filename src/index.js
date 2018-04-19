import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import {themer} from "ic-snacks";
import {wemartTheme} from './wemartTheme';

import Router from './Router.js';
import {StripeProvider} from "react-stripe-elements";
themer.themeConfig = wemartTheme; //IC-Snacks theme for WeMart
var stripeKey;

if(process.env.NODE_ENV === 'development'){
    stripeKey = require('./stripeKey').stripeAPIKey;
} else{
    stripeKey = process.env.REACT_APP_STRIPE_PK
}

ReactDOM.render(
    <StripeProvider apiKey={stripeKey}>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </StripeProvider>,
  document.getElementById('root')
);

registerServiceWorker();
