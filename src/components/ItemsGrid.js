import React from 'react';
import PropTypes from 'prop-types'
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
        if(this.props.items){
            return(this.props.items.map((item)=>
                <li style={itemGrid_itemCard}>
                    <ItemCard
                        itemID={item.itemid} name={item.name} image={item.image} price={item.price} inCart={item.inCart}
                        weight={item.quantity} salePrice={item.sale} departmentid={item.departmentid} onAddToCart={()=>{
                        this.props.onAddToCart(item);
                    }} onQuantityIncrease={()=>{this.props.onQuantityIncrease(item,1)}}
                        onQuantityDecrease={()=>{this.props.onQuantityDecrease(item,-1)}}
                        onQuantityRemove={()=>{this.props.onQuantityRemove(item)}}/>
                </li>
            ))
        }else{
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
            <ul style={itemGrid}>
                {this.renderChildren()};
            </ul>
        );
    }
}

ItemsGrid.propTypes = {
    items: PropTypes.array,
    onQuantityIncrease: PropTypes.func,
    onQuantityDecrease: PropTypes.func,
    onQuantityRemove: PropTypes.func,
    onAddToCart: PropTypes.func,
}