import React from 'react';
import PropTypes from 'prop-types'
import {Link} from "ic-snacks";
import '../stylesheets/line.css'

//TODO change the columns to IC Snacks columns.

export default class Line extends React.Component{
    render(){
        return(
            <div className="line">
                <span className="line_title">{this.props.title}</span>
                <span className="line_value">{this.props.value}</span>
                <span className="line_change">
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