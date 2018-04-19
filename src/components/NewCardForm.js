import React from 'react';
import {
    CardCVCElement, CardElement, CardExpiryElement, CardNumberElement, injectStripe,
    PostalCodeElement
} from 'react-stripe-elements';
import PropTypes from 'prop-types'
import {Button} from "ic-snacks";

//STYLES
const checkoutForm = {padding:'2rem'};
const label = {display: 'block', fontSize:'2rem', color:'#808080', borderRadius:'.6rem'}
const cardElement = {
    base: {
        fontSize:'20px',
        color: '#424770',
        letterSpacing: '0.025em',
        '::placeholder': {
            color: '#aab7c4',
        }}, invalid: {
        color: '#9e2146',
        border:'1px solid grey'
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

        if (this.props.stripe) {
            this.props.stripe.createSource({
                type: 'card',
                currency: 'usd',
                owner:{name:this.props.name} })
                .then(payload => {this.props.onSubmit(payload);} );
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={checkoutForm} id={'newcard'}>
                <label style={label}>
                    Card details
                </label>
                <div style={{padding:'1.5rem', borderRadius:'.6rem', boxShadow:'0 0 7px 0px #828282'}}>
                    <CardElement
                        style={cardElement}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onReady={handleReady}
                    />
                </div>

            </form>
        );
    }
}

NewCardForm.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    onSubmit: PropTypes.func
}

export default injectStripe(NewCardForm);