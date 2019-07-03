import React, { Component } from "react";
import { StyleRoot } from "radium";
import Fonts from "./Fonts";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { StripeProvider } from "react-stripe-elements";
import { themer } from "ic-snacks";
import { wemartTheme } from "./wemartTheme";
import './App.css'



themer.themeConfig = wemartTheme; //IC-Snacks theme for WeMart
var stripeKey;

if (process.env.NODE_ENV === "development") {
  stripeKey = require("./stripeKey").stripeAPIKey;
} else {
  stripeKey = process.env.REACT_APP_Stripe_Key;
}

const fonts = "https://s3-us-west-1.amazonaws.com/wemartimages/fonts";

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey={stripeKey}>
        <StyleRoot>
          <Fonts assetsUrl={fonts} />
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </StyleRoot>
      </StripeProvider>
    );
  }
}

export default App;
