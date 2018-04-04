import React from 'react';
import {
    CardElement,
    injectStripe,
} from 'react-stripe-elements'
import {Button} from "ic-snacks";
import CardSection from "./CardSection";
import AddressSelect from "./AddressSelect";
import PropTypes from 'prop-types'

let formStyle = {paddingTop: '2rem', paddingBottom: '2rem'};


class _NewCardForm extends React.Component{

    handleSubmit = (e,model) =>{
        //TODO implement handle submit
        e.preventDefault();
        console.log(model, e);

        this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
            console.log('Received Stripe token:', token );
        });


    };

    render() {
        return (
            <form style={formStyle} onSubmit={this.handleSubmit} id='newCard'>
                <CardSection/>
                <AddressSelect user={this.props.user}/>
            </form>
        );
    }
}

export const NewCardForm = injectStripe(_NewCardForm);

NewCardForm.propTypes = {
    user: PropTypes.object.isRequired,
};