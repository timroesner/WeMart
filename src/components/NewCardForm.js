import React from 'react';
import {
    CardCVCElement, CardExpiryElement, CardNumberElement, injectStripe,
    PostalCodeElement
} from 'react-stripe-elements';
import PropTypes from 'prop-types'
import {Button} from "ic-snacks";

//STYLES
const checkoutForm = {padding:'3rem'};
const label = {display: 'block', fontSize:'2rem', color:'#808080', borderRadius:'.6rem'}
const cardElement = {
    base: {
        fontSize:'2.4rem',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
            color: '#aab7c4',
        }}, invalid: {
        color: '#9e2146',
    }};
const cardElementDiv = {border:'1px solid', padding:'1rem', borderRadius:'.6rem',
    maxHeight:'6rem'};

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

class NewCardForm extends React.Component {
    handleSubmit = (ev) => {
        // We don't want to let default form submission happen here, which would refresh the page.
        ev.preventDefault();

        // Within the context of `Elements`, this call to createToken knows which Element to
        // tokenize, since there's only one in this group.
        // this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
        //     console.log('Received Stripe token:', token);
        // });

        if (this.props.stripe) {
            this.props.onSubmit();
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
            <form onSubmit={this.handleSubmit} style={checkoutForm} id={'newcard'}>
                <label style={label}>
                    Card number
                    <div style={cardElementDiv}>
                        <CardNumberElement
                            style={cardElement}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onReady={handleReady}
                        />
                    </div>
                </label>
                <label style={label}>
                    Expiration date
                    <div style={cardElementDiv}>
                        <CardExpiryElement
                            style={cardElement}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onReady={handleReady}
                        />
                    </div>
                </label>
                <label style={label}>
                    CVC
                    <div style={cardElementDiv}>
                        <CardCVCElement
                            style={cardElement}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onReady={handleReady}
                        />
                    </div>
                </label>
                <label style={label}>
                    Postal code
                    <div style={cardElementDiv}>
                        <PostalCodeElement
                            style={{cardElement}}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onReady={handleReady}
                        />
                    </div>
                </label>
                <div>
                </div>
            </form>
        );
    }
}

NewCardForm.propTypes = {
    onSubmit: PropTypes.func
}

export default injectStripe(NewCardForm);