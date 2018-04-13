import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon} from "ic-snacks";

let spanStyle = {
    width: "4.4rem",
    fontSize: "1.7rem",
    alignItems: "center",
    justifyContent: "center",
    display: "inline-flex"
};

export default class Counter extends React.Component{

    render(){
        return(<div>
            <Button size="small" type="button" onClick={this.props.onDecrease}
                    disabled={this.props.quantity === 1}>
                <Icon name="minus"/>
            </Button>
            <span style={spanStyle}>{this.props.quantity}</span>
            <Button style={{marginRight: '1rem'}} size="small" type="button" onClick={this.props.onIncrease}>
                <Icon name="plus"/>
            </Button>
            <Button size="small" type="button" onClick={this.props.onRemove}>
                <Icon name="trash"/>
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
