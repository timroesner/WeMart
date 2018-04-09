// CheckoutForm.js
import React from 'react';
import {
    CardCVCElement, CardExpiryElement, CardNumberElement, injectStripe,
    PostalCodeElement
} from 'react-stripe-elements';
import {Button} from "ic-snacks";

const handleBlur = () => {
    console.log('[blur]');
};
const handleChange = change => {
    console.log('[change]', change);
};
const handleClick = () => {
    console.log('[click]');
};
const handleFocus = () => {
    console.log('[focus]');
};
const handleReady = () => {
    console.log('[ready]');
};

class CheckoutForm extends React.Component {
    handleSubmit = (ev) => {
        // We don't want to let default form submission happen here, which would refresh the page.
        ev.preventDefault();

        // Within the context of `Elements`, this call to createToken knows which Element to
        // tokenize, since there's only one in this group.
        // this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
        //     console.log('Received Stripe token:', token);
        // });

        if (this.props.stripe) {
            this.props.stripe
                .createToken()
                .then(payload => console.log('[token]', payload));
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }


        // However, this line of code will do the same thing:
        // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Card number
                    <CardNumberElement
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onReady={handleReady}
                    />
                </label>
                <label>
                    Expiration date
                    <CardExpiryElement
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onReady={handleReady}
                    />
                </label>
                <label>
                    CVC
                    <CardCVCElement
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onReady={handleReady}
                    />
                </label>
                <label>
                    Postal code
                    <PostalCodeElement
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onReady={handleReady}
                    />
                </label>
                <div>
                    <Button>Place Order</Button>
                </div>
            </form>
        );
    }
}

export default injectStripe(CheckoutForm);