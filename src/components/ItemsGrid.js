import React from 'react';

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
            });
            index += 1;
            return <li style={itemGrid_itemCard}>{component}</li>;
        })
    }

    render(){
        return (
            <ul style={itemGrid}>
                {this.renderChildren()};
            </ul>
        );
    }
}