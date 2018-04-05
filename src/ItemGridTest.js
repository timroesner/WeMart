import React from 'react';
import ItemsGrid from "./components/ItemsGrid";
import {db} from './db';
import ItemCard from "./components/ItemCard";

const itemGrid_itemCard = {display:'inline-block',position:'relative',width:'20.8rem',verticalAlign:'top'};

export default class ItemGridTest extends React.Component{

    constructor(){
        super();
        this.state = {
            cart: [],
            items: []
        };

        // Get the dynamoDB database
        var dynamodb = db;

        // Get the table whose name is "item"
        var params = {
            TableName: "item"
        };

        dynamodb.scan(params, (err, data) => {
            if (err) {console.log(err, err.stack)} // an error occurred
            else{
                data.Items.forEach((element) => {

                    //TODO Clean this up into a one liner.
                    let departmentid = element.departmentid.N;
                    let image = element.image.S;
                    let itemid = (element.itemid.S);
                    let name = (element.name.S);
                    let price = (element.price.N);
                    let quantity = (element.quantity.S);
                    let sale = (element.sale.N);

                    let testItem = {
                        itemid: itemid, name: name, departmentid: departmentid, image: image, price: price,
                        quantity: quantity, sale: sale, inCart: 0};
                    this.setState({
                        items: [...this.state.items, testItem]
                    });
                });
            }
        });
    }

    addToCart(item) {
        // update the item object's in cart quantity
        this.updateItemQuantity(item,1);
        // add the item to the cart array
        this.setState({cart: [...this.state.cart, item]});
    };

    removeFromCart(item){
        // set the item's in cart quantity to 0
        this.updateItemQuantity(item,0);
        // find the item in the cart and remove it
        var cart = this.state.cart;
        var olItem = null;
        for(var i = 0; i < cart.length; i++)
        {
            if(cart[i].itemid === item.itemid)
            {
                olItem = i;
            }
        }
        cart.splice(olItem,1);
        console.log(cart);
        this.setState({cart: cart});
    }
    updateItemQuantity(item,quantity){
        console.log(item,quantity);
        if(quantity === 1){
            var items = this.state.items;
            for(var i = 0; i < items.length; i++)
            {
                if(items[i].itemid === item.itemid)
                {
                    olItem = items[i];
                    oldQuant = items[i].inCart;
                    items[i].inCart = oldQuant+1;
                }
            }
            this.setState({items: items});
        } else if(quantity === -1){
            var cart = this.state.cart;
            var olItem = null;
            var oldQuant = 0;
            for(var i = 0; i < cart.length; i++)
            {
                if(cart[i].itemid === item.itemid)
                {
                    olItem = cart[i];
                    oldQuant = cart[i].inCart;
                    cart[i].inCart = oldQuant-1;
                }
            }
            console.log(oldQuant);
            console.log(cart);
            this.setState({cart: cart});
            console.log(this.state.cart);
        } else if(quantity ===0){
            var items = this.state.items;
            for(var i = 0; i < items.length; i++)
            {
                if(items[i].itemid === item.itemid)
                {
                    olItem = items[i];
                    items[i].inCart = 0;
                }
            }
            this.setState({items: items});
        }
    }

    createItemCards(){
        return(this.state.items.map((item)=>
            <li style={itemGrid_itemCard}>
                <ItemCard
                    itemID={item.itemid} name={item.name} image={item.image} price={item.price} inCart={item.inCart}
                    weight={item.quantity} salePrice={item.sale} departmentid={item.departmentid} onAddToCart={()=>{
                        this.addToCart(item);
                }} onQuantityIncrease={()=>{this.updateItemQuantity(item,1)}}
                    onQuantityDecrease={()=>{this.updateItemQuantity(item,-1)}}
                onQuantityRemove={()=>{this.removeFromCart(item)}}/>
            </li>
        ))
    }

    render(){
        return (
            <div id="root">
                <ItemsGrid>
                    {this.createItemCards()}
                </ItemsGrid>
            </div>
        );
    }
}