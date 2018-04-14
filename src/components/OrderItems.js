import React from 'react'
import PropTypes from 'prop-types'
import {Column, Grid, Row} from "ic-snacks";
import {StyleRoot} from "radium";

const columnStyles = {display:'inline-block', marginRight:'.5rem', width:'4rem'};

export default class OrderItems extends React.Component{

    renderChildren(){
        return(this.props.items.map((item)=>
            <div  style={columnStyles}>
                <div style={{ top: '.8rem', left: '.8rem', height: '2rem', width:'10rem', zIndex: '1',
                    backgroundRepeat:'no-repeat'}}><p>{item.quantity}</p></div>
                <img style={{width:'100%'}} src={item.item.image} alt={item.name}/>
                <p>{item.item.price * item.quantity}</p>
            </div>
        ))
    }

    render(){
        return(<div>
            {this.renderChildren()}
        </div>)
    }
}

OrderItems.propTypes = {
    items: PropTypes.array
}
