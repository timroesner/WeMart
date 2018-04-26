// CardSection.js
import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
    render() {
        return (
            <label style={{fontSize:'1.6rem'}}>
                Card details
                <CardElement style={{base: {fontSize: '18px'}}} />
            </label>
        );
    }
}

export default CardSection;