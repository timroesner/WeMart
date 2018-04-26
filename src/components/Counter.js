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
        return(<div style={{height: '100%'}} >
              <button style={{height: '100%', width: '24%', padding: '0'}} class="primary" onClick={this.props.onDecrease} disabled={this.props.quantity === 1}>
                <i class="fa fa-minus" />
              </button>
              <span style={spanStyle}>{this.props.quantity}</span>
              <button style={{height: '100%', width: '24%', marginRight: '4%', padding: '0'}} class="primary" onClick={this.props.onIncrease}>
                <i class="fa fa-plus" />
              </button>
              <button style={{height: '100%', width: '24%', padding: '0'}} class="primary" onClick={this.props.onRemove}>
                <i class="fa fa-trash" />
              </button>
              </div>);
    }
}

Counter.propTypes = {
    quantity: PropTypes.number.isRequired,
    onIncrease: PropTypes.func,
    onDecrease: PropTypes.func,
    onRemove: PropTypes.func
};
