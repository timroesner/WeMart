import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import {themer} from "ic-snacks";
import {wemartTheme} from './wemartTheme';
import {SetStyles} from "ic-snacks";
import {StyleRoot} from "radium";

import Router from './Router.js';
import {StripeProvider} from "react-stripe-elements";
themer.themeConfig = wemartTheme; //IC-Snacks theme for WeMart
var stripeKey;

if(process.env.NODE_ENV === 'development'){
    stripeKey = require('./stripeKey').stripeAPIKey;
} else{
    stripeKey = process.env.REACT_APP_Stripe_Key
}

const fonts = 'https://s3-us-west-1.amazonaws.com/wemartimages/fonts'

ReactDOM.render(
    <StripeProvider apiKey={stripeKey}>
       <StyleRoot>
        <SetStyles assetsUrl={fonts} />
          <BrowserRouter>
            <Router />
          </BrowserRouter>
      </StyleRoot>,
    </StripeProvider>,

  document.getElementById('root')
);

registerServiceWorker();
