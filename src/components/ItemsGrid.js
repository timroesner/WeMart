import React from 'react';
import PropTypes from 'prop-types';
import ItemCard from "./ItemCard";

//STYLES
const itemGrid = {listStyle:'none',maxWidth:'104rem',display:'table-cell',padding:'0',margin:'0'};
const itemGrid_itemCard = {display:'inline-block',position:'relative',width:'20.8rem',verticalAlign:'top'};

export default class ItemsGrid extends React.Component{
    renderItems(){
        if(this.props.items.length === 0) {
            // Make an empty array of specified size to show the loading elements
            let empty = Array.apply(null,Array(this.props.size).map(() => {}));
            return (
                empty.map(() => <li style={itemGrid_itemCard}>
                    <ItemCard/>
                </li>)
            );
        } else{
            return this.props.items.map((item) => <li style={itemGrid_itemCard}>
                <ItemCard
                    itemID={item.itemid} name={item.name} image={item.image} price={item.price}
                    weight={item.quantity} salePrice={item.sale} departmentid={item.departmentid}/>
            </li>);
        }
    }

    render(){
        return (
            <ul style={itemGrid}>
                {this.renderItems()}
            </ul>
        );
    }
}

ItemsGrid.defaultProps = {
    size: 5
};

ItemsGrid.propTypes = {
  items: PropTypes.array.isRequired,
    size: PropTypes.number
};