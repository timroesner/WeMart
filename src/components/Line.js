import React from 'react';
import PropTypes from 'prop-types'
import {Link} from "ic-snacks";

//STYLES
const line = {fontSize:'1.4rem',lineHeight:'2.1rem',paddingRight:'3rem',paddingLeft:'3rem',paddingBottom:'1rem'}
const line_title = {width:'23.333%',display:'inline-block',marginBottom:'1.5rem',padding:'0 1.5rem 0 1.5rem'}
const line_value = {width:'50%',display:'inline-block',marginBottom:'1.5rem',padding:'0 1.5rem 0 1.5rem'}
const line_change = {width:'10%',display:'inline-block',marginBottom:'1.5rem',padding:'0 1.5rem 0 1.5rem', textAlign:'right'}


//TODO change the columns to IC Snacks columns.

export default class Line extends React.Component{
    render(){
        return(
            <div style={line}>
                <span style={line_title}>{this.props.title}</span>
                <span style={line_value}>{this.props.value}</span>
                <span style={line_change}>
                    <Link onClick={(e, props) => { e.preventDefault();this.props.onChange() }}>Change</Link>
                </span>
            </div>
        );
    }
}

Line.propTypes = {
    title: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
};

Line.defaultProps = {
    onChange: ()=>{console.log("change pressed")}
};