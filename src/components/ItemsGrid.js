import React from 'react';
import PropTypes from 'prop-types'
import ItemCard from "./ItemCard";

//STYLES
const gridContainer = {
    display: 'grid',
    gridTemplateColumns: 'repeat( auto-fit, minmax(14.8rem, 1fr) )',
    gridColumnGap: '5%',
    margin: '2%',
    width: '95%',
}

const itemGrid_itemCard = {display:'inline-block', position:'relative', verticalAlign:'top', margin: '3%'};

export default class ItemsGrid extends React.Component{

    constructor(){
        super();
        this.state = {
            currentTabIndex: null
        };
    }

    renderChildren() {
        if(this.props.items){
            return(this.props.items.map((item)=>
                <li style={itemGrid_itemCard}>
                    <ItemCard
                        itemID={item.itemid}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        quantity={item.quantity}
                        salePrice={item.sale}
                        departmentid={item.departmentid}
                    />
                </li>
            ))
        } else {
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
    }

    render(){
        return(
            <div style={gridContainer}>
                {this.renderChildren()}
            </div>
        );
    }
}

ItemsGrid.propTypes = {
    items: PropTypes.array,
}