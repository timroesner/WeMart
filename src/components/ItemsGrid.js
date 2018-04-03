import React from 'react';
import PropTypes from 'prop-types';
import ItemCard from "./ItemCard";
import '../stylesheets/ItemsGrid.css';

export default class ItemsGrid extends React.Component{
    renderItems(){
        if(this.props.items.length === 0) {
            // Make an empty array of specified size to show the loading elements
            let empty = Array.apply(null,Array(this.props.size).map(() => {}));
            return (
                empty.map(() => <li className="itemsGrid__itemsCard">
                    <ItemCard/>
                </li>)
            );
        } else{
            return this.props.items.map((item) => <li className="itemsGrid__itemsCard">
                <ItemCard
                    itemID={item.itemid} name={item.name} image={item.image} price={item.price}
                    weight={item.quantity} salePrice={item.sale} departmentid={item.departmentid}/>
            </li>);
        }
    }

    render(){
        return (
            <ul className="itemsGrid">
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