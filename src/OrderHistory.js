import React from 'react'
import { withRouter } from "react-router-dom";
import Header from "./components/header";
import ProfilePanel from "./components/ProfilePanel";
import {DynamoDB} from "aws-sdk/index";
import {CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';

const orderHistory = {fontFamily:'"Open Sans", "Helvetica Neue", Helvetica, sans-serif', maxWidth:'109.2rem',
height:'auto !important', margin:'3rem auto'};
const pageTitle = {textAlign:'center', padding:'1.5rem' ,fontFamily:' "Open Sans", "Helvetica Neue", Helvetica, sans-serif'};

var poolData;
var dynamodb;

class OrderHistory extends React.Component{

    constructor(){
        super()
        this.state ={
            orders: []
        }
        this.setKeys()
        this.getCognitoUser()
    }

    setKeys() {
        if(process.env.NODE_ENV === 'development'){
            poolData =require('./poolData').poolData;
            dynamodb = require('./db').db;
        } else{
            poolData = {
                UserPoolId : process.env.REACT_APP_Auth_UserPoolId,
                ClientId : process.env.REACT_APP_Auth_ClientId
            }
            dynamodb = new DynamoDB({
                region: "us-west-1",
                credentials: {
                    accessKeyId: process.env.REACT_APP_DB_accessKeyId,
                    secretAccessKey: process.env.REACT_APP_DB_secretAccessKey},
            });
        }
    }

    getCognitoUser(){
        var userPool = new CognitoUserPool(poolData);
        var cognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null) {
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    console.log(err)
                    return;
                }
            });
            // Necessary because the closure has no access to this.state
            let self = this;
            cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                    console.log(err)
                    return;
                }
                self.setState({isLoggedIn: true})
                console.log('[Cognito User Attributes]',result) //Logs user attributes

                result.forEach((attribute) => {
                    if(attribute.Name === 'email'){
                        self.setState({user: {...self.state.user , email: attribute.Value}}) // set the email
                        self.setState({user: {...self.state.user , userId: attribute.Value}}) //set the userId
                    }
                })
                self.getUserDetails()
            });

        }
    }

    getUserDetails(){
        var orderParams = {
            ExpressionAttributeValues: {
                ":u": {
                  S: this.state.user.userId
                 }
            },
            Select: 'ALL_ATTRIBUTES',
            FilterExpression: "userid = :u", 
            TableName: 'orders'
        }
        // var userParams = {
        //     Key: {
        //         'userid': {S: this.state.user.userId}
        //     },AttributesToGet: [
        //         'history',
        //     ],
        //     TableName: "user"
        // };
        dynamodb.scan(orderParams,(err, data) => {
            if(err) {console.log(err, err.stack)}
            else{
                console.log('order history',data)
                data.Items.forEach((order) => {
                    console.log('ORDER', order)
                    this.setState({
                        orders: [...this.state.orders, order]
                    })
                    console.log('State orders',this.state.orders)
                })
                // this.getItemsFromDB()
            }
        } )
        // dynamodb.getItem(userParams, (err, data) => {
        //     if(err) {console.log(err, err.stack)}
        //     else{
        //         data.Item.history.L.forEach((item)=>{
        //             item.M.items.L.forEach((i)=>{
        //                 let itemId = i.M.itemid.S
        //                 console.log('[itemids]',itemId)
        //                 var set = this.state.orderHistory
        //                 set.add(itemId)
        //                 this.setState({orderHistory: set})
        //             })
        //         })
        //         this.getItemsFromDB()
        //     }
        // })
    }

    getItemsFromDB(){
        this.state.orderHistory.forEach((itemid)=>{
            console.log('itemid',itemid)
            var itemParams  = {
                Key: {'itemid': {S:itemid}},
                TableName: 'item'
            }

            dynamodb.getItem(itemParams,(err, data)=>{
                if(err) {console.log(err, err.stack)}
                else if(data.Item) {
                    console.log(data);
                    let image = data.Item.image.S;
                    let itemid = data.Item.itemid.S;
                    let name = data.Item.name.S;
                    let price = (data.Item.price.N);
                    let quantity = (data.Item.quantity.S);
                    let sale = (data.Item.sale.N);

                    let testItem = {
                        key: itemid, itemid: itemid, name: name, image: image, price: price,
                        quantity: quantity, sale: sale, inCart: 0};
                    this.setState({
                        items: [...this.state.items, testItem]
                    });

                    console.log('test item', testItem)
                }
                this.setState({isLoaded: true})
            })
        })
    }

    renderOrders(){
        return(
            this.state.orders.map((order)=>
                <ProfilePanel title={order.date.S + ' of '+ order.items.L.length + ' items' }>
                    <h4>Order Status: {order.status.S}</h4>
                      <h4>Total: {order.total.N}</h4>
                </ProfilePanel>
            )
        )
    }

    render(){
        return(
            <div>
            <Header/>
            <div id="pageBody">
                <div style={orderHistory}>
                    <h1 style={pageTitle}>Order History</h1>
                    {this.renderOrders()}
                </div>
            </div>
            </div>
        ) 
    }
}

export default withRouter(OrderHistory);