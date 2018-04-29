import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from "ic-snacks";

//STYLES
const addressCard = {fontSize:'1.6rem',padding:'1.5rem',cursor:'pointer',
margin:'1.5rem',
border:'1px solid #2333',
borderRadius:'.6rem'}
const addressCard_addressLabel = {fontWeight:'600',width:'30rem',display:'inline-block',paddingRight:'.8rem'}
const addressCard_addressIcon = {display:'inline-block',paddingRight:'.6rem',verticalAlign:'top'}

export default class AddressCard extends React.Component{

    render(){
        return (
            <div style={addressCard} onClick={this.props.onClick}>
                <span style={addressCard_addressIcon}>
                    <Icon name="home"/>
                </span>
                    <div style={addressCard_addressLabel}>
                        <div>{this.props.street}</div>
                        <div>{this.props.city}, {this.props.state} {this.props.zipCode}</div>
                    </div>
            </div>
        );
    }
}

AddressCard.propTypes = {
    city: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    state: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    zipCode: PropTypes.number.isRequired
};

