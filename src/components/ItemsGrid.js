import React from 'react';
import PropTypes from 'prop-types';
import ItemCard from "./ItemCard";

//STYLES
const itemGrid = {listStyle:'none',maxWidth:'104rem',display:'table-cell',padding:'0',margin:'0'};
const itemGrid_itemCard = {display:'inline-block',position:'relative',width:'20.8rem',verticalAlign:'top'};

export default class ItemsGrid extends React.Component{

    constructor(){
        super();
        this.state = {
            currentTabIndex: null
        };
    }

    renderChildren() {
        const { children, onSelect } = this.props;
        const { currentTabIndex } = this.state;
        let index = 0;

        return React.Children.map(children, (child) => {
            const component = React.cloneElement(child, {
                index: index,
                focus: currentTabIndex === index,
                onClick: onSelect,
                onMenuItemFocus: this.handleMenuItemFocus
            });
            index += 1;
            return component
        })
    }

    // Changed the way child elements render.
    renderItems(){
        if(this.props.children === null) {
            // Make an empty array of specified size to show the loading elements
            let empty = Array.apply(null,Array(this.props.size).map(() => {}));
            return (
                empty.map(() => <li style={itemGrid_itemCard}>
                    <ItemCard/>
                </li>)
            );
        } else{
            {this.renderChildren()}
        }
    }

    render(){
        return (
            <ul style={itemGrid}>
                {this.renderChildren()};
            </ul>
        );
    }
}