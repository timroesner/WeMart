import React from 'react';
import PropTypes from 'prop-types';
import {MenuItem, Select} from "ic-snacks";

export default class AddressSelect extends React.Component{

    loadAddresses(){
        return this.props.user.deliveryAddresses.map((address) =>
            <MenuItem label={address.street} value={address.id}/>
        );
    }
    render(){
        return(
            <Select
                name="billingAddress"
                floatingLabelText="Billing Address"
                hintText="Select A Billing Address"
                fullWidth
                required
                validationErrorText='You Must Select A Billing Address'
            >{this.loadAddresses()}
            </Select>
        );
    }
}

AddressSelect.propTypes = {
    user: PropTypes.object.isRequired,
};