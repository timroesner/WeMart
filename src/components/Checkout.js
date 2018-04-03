// CheckoutForm.js
import React from 'react';
import {Elements, injectStripe, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from "./CheckoutForm";

let key = 'pk_test_ccBJoXsCQn6kn5dkF098Xywl';

export default class Checkout extends React.Component {

    render() {
        return (
            <StripeProvider apiKey={key}>
                <Elements>
                    <CheckoutForm />
                </Elements>
            </StripeProvider>
        );
    }
}