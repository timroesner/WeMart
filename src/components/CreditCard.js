import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from "ic-snacks";


//TODO if statement for different cards
let ccStyle = {height: "5rem", width: "8.3rem", background: "url(https://d2guulkeunn7d8.cloudfront.net/assets/creditcards-3e439d861457b3b3b740394bdaa801d3.png)",
    color: "white", backgroundPosition: "0px 0", border: ".3rem solid #438ead", borderRadius:'1rem',
    margin: '.8rem', cursor:'pointer'
};

let lastFour = {fontSize: "1.1rem", color: '#c0d3d1', position: 'relative', left: '4.4rem', top: '.2rem'};
let label= {color: '#438ead', paddingTop: '3.5rem', fontWeight: 'bold', fontSize:'1.2rem', textAlign: 'center'};

export default class CreditCard extends React.Component{

    constructor(){
        super();
        this.state = {
            selected: false
        }
    }

    render(){
        return(
            <li style={ccStyle} onSelect={()=>{this.setState({selected: !this.state.selected})}}>
                <Icon name={'starFilled'} />
                <span style={lastFour} >{this.props.last4}</span>
                <div style={label}>{this.props.label}</div>
            </li>
        );
    }
}

CreditCard.propTypes = {
    brand: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    last4: PropTypes.string.isRequired,
    isDefault: PropTypes.bool.isRequired
};