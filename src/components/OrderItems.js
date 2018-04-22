import React from 'react'
import PropTypes from 'prop-types'
import {Column, Grid, Row} from "ic-snacks";
import {StyleRoot} from "radium";

const columnStyles = {display:'inline-block', margin:'.5rem', width:'4rem'};

export default class OrderItems extends React.Component{

    renderPrice =(item) =>{
        if(item.sale !== '0'){
            return Number(item.sale).toFixed(2)
        } else {
            return Number(item.price).toFixed(2)
        }
    }

    renderChildren(){
        return(this.props.items.map((item)=>
            <div  style={columnStyles}>
                <div style={{ top: '.8rem', left: '.8rem', height: '2rem', width:'10rem', zIndex: '1',
                    backgroundRepeat:'no-repeat'}}><p>{item.quantity}</p></div>
                <img style={{width:'100%'}} src={item.image} alt={item.name}/>
                <p>{this.renderPrice(item)}</p>
            </div>
        ))
    }

    render(){
        return(<div style={{maxHeight:'10rem', overflow:'hidden'}}>
            {this.renderChildren()}
        </div>)
    }
}

OrderItems.propTypes = {
    items: PropTypes.array
}
