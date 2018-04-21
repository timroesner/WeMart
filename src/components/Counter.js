import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon} from "ic-snacks";

let spanStyle = {
    width: "24%",
    fontSize: "1.4em",
    alignItems: "center",
    justifyContent: "center",
    display: "inline-flex"
};

export default class Counter extends React.Component{

    render(){
        return(<div style={{height: '100%', width:'100%'}} >
            <Button size="small" type="button" onClick={this.props.onDecrease}
                    disabled={this.props.quantity === 1}>
                <i class="fas fa-minus"></i>
            </Button>
            <span style={spanStyle}>{this.props.quantity}</span>
            <Button style={{marginRight: '1rem'}} size="small" type="button" onClick={this.props.onIncrease}>
                <i class="fas fa-plus"></i>
            </Button>
            <Button size="small" type="button" onClick={this.props.onRemove}>
                <i class="far fa-trash-alt"></i>
            </Button>
        </div>);
    }
}

Counter.propTypes = {
    quantity: PropTypes.number.isRequired,
    onIncrease: PropTypes.func,
    onDecrease: PropTypes.func,
    onRemove: PropTypes.func
};