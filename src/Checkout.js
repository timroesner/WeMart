// CheckoutForm.js
import React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from "./components/CheckoutForm";
import Header from "./components/header";

let key = 'pk_test_ccBJoXsCQn6kn5dkF098Xywl';

//STYLES
const checkout = {margin: '2rem'};

export default class Checkout extends React.Component {

    render() {
        return (
            <diV>
                <Header/>
                <div style={checkout}>
                    <StripeProvider apiKey={key}>
                        <Elements>
                            <CheckoutForm/>
                        </Elements>
                    </StripeProvider>
                </div>
            </diV>
        );
    }
}