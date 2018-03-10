import React from 'react';
import PropTypes from 'prop-types';
import ItemCard from "./ItemCard";
import './ItemsGrid.css';

export default class ItemsGrid extends React.Component{
    renderItems(){
        if(this.props.items.length === 0) {
            let empty = Array.apply(null,Array(25).map(() => {}));
            // Add loading boxes here
            return (
                empty.map(() => <li className="itemsGrid__itemsCard">
                    <ItemCard />
                </li>)
            );
        } else{
            return this.props.items.map((item) => <li className="itemsGrid__itemsCard">
                <ItemCard
                    key={item.itemid} name={item.name} image={item.image} price={item.price}
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

ItemsGrid.propTypes = {
  items: PropTypes.array.isRequired
};