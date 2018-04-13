import React from 'react'
import PropTypes from 'prop-types'
import {Column, Grid, Row} from "ic-snacks";
import {StyleRoot} from "radium";

const columnStyles = {display:'inline-block', marginRight:'.5rem', width:'4rem'};

export default class OrderItems extends React.Component{

    renderChildren(){
        return(this.props.items.map((item)=>
            <div  style={columnStyles}><img style={{width:'100%'}} src={item.image} alt={item.name}/></div>
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
