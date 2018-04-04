import React from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Icon, MenuItem, Select, TextField} from "ic-snacks";
import '../stylesheets/AddressCard.css'
import {Modal} from "react-bootstrap";

export default class AddressCard extends React.Component{

    render(){
        return (
            <div className="addressCard" onClick={this.props.onClick}>
                <span className="addressCard__addressIcon">
                     <Icon name="home"/>
                </span>
                <div className="addressCard__address-label">
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

