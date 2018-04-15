import React from 'react'
import {Icon} from "ic-snacks";
import PropTypes from 'prop-types'

//STYLES
const checkoutPanel = {background:'#FFFFFF', marginBottom:'0', padding:'1rem', borderBottom:'1px solid rgb(234, 234, 234)', maxWidth:'104rem'}
const icon = {marginRight:'2rem'}
const title = {display:'inline-block', fontSize:'1.8rem'}
const dropdownArrow = {float:'right'}

export default class CheckoutPanel extends React.Component{

    render(){
        if(this.props.valid){
            return(
                <div style={checkoutPanel}>
                <span style={icon}>
                     <Icon name={this.props.icon} style={{fontSize:'2.4rem', color:'red'}}/>
                </span>
                    <h2 style={title}>{this.props.onValidTitle}</h2>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            )
        } else{
            return (
                <div style={checkoutPanel}>
                <span style={icon}>
                     <Icon name={this.props.icon} style={{fontSize:'2.4rem', color:'red'}}/>
                </span>
                    <h2 style={title}>{this.props.title}</h2>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            )
        }
    }
}

CheckoutPanel.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    onValidTitle: PropTypes.string,
    valid: PropTypes.bool
}