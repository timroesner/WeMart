import React from 'react';
import ItemsGrid from "./ItemsGrid";
import {db} from './db';

export default class ItemGridTest extends React.Component{

    state = {
        items: []
    };

    // Needs to be placed in here or else rendering is a bit wonky.
    componentDidMount = () => {
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

                    let testItem = {itemid: itemid, name: name, departmentid: departmentid, image: image, price: price, quantity: quantity, sale: sale};
                    this.setState({
                        items: [...this.state.items, testItem]
                    });
                });
            }
        });
    };

    render(){
        return (
            <div>
                <ItemsGrid items={this.state.items}/>
            </div>
        );
    }
}