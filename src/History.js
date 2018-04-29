import {withRouter} from 'react-router-dom';
import Header from './components/header';
import React from "react";
import {Button, DropdownMenu, MenuItem } from "ic-snacks";
import itemsEmpty from './images/items_empty.png'
import {CognitoUserPool} from "amazon-cognito-identity-js";
import {DynamoDB} from "aws-sdk";
import ItemsGrid from "./components/ItemsGrid";

var poolData;
var dynamodb;
var cognitoUser
//Styles
const history = {fontFamily:'"Open Sans", "Helvetica Neue", Helvetica, sans-serif', maxWidth:'120rem',
    height:'auto !important', margin:'3rem auto', background:'#ffffff'};
const pageTitle = {textAlign:'center', padding:'1.5rem', fontWeight:'600'};
const panel = {backgroundColor:'#FFFFFF',
    marginBottom:'2rem',marginRight:'2rem',marginLeft:'2rem', padding:'4rem 0'}
const noItems = {textAlign:'center', marginBottom: '2rem'};
const noItemsButton = {paddingLeft:'4rem', paddingRight:'4rem'}
const noItemsImage = {maxWidth:'20rem'}

class History extends React.Component{

    constructor(){
        super();
        this.state = {
            orderHistory: new Set(),
            items: [],
            isLoaded: false,
            user: null,
        }
        this.setKeys()
        this.getCognitoUser()
    }

    getCognitoUser(){
        let self = this;
        var userPool = new CognitoUserPool(poolData);
        cognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null) {
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    console.log(err)
                    return;
                }
            });
            // Necessary because the closure has no access to this.state
            cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                    console.log(err)
                    return;
                }
                
                console.log('[Cognito User Attributes]',result) //Logs user attributes
                result.forEach((attribute) => {
                    if(attribute.Name === 'email'){
                        self.setState({user: {...self.state.user , email: attribute.Value}}) // set the email
                        self.setState({user: {...self.state.user , userId: attribute.Value}}) //set the userId
                    }
                })
                self.getUserDetails()
                
                console.log('STATE',self.state)
            });
        } else {
            this.setState({isLoaded: true})
        }
        
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
                    this.setState({isLoaded: true})
                    console.log('test item', testItem)
                }
            })
        })
    }

    getUserDetails(){
        var orderParams = {
            ExpressionAttributeValues: {
                ":u": {
                  S: this.state.user.userId
                 }
            },
            ExpressionAttributeNames: {
                "#S": "items", 
               },
            FilterExpression: "userid = :u", 
            ProjectionExpression: "#S", 
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
                    order.items.L.forEach((i)=>{
                        let itemId = i.M.itemid.S
                        console.log('[itemids]',itemId)
                        var set = this.state.orderHistory
                        set.add(itemId)
                        this.setState({orderHistory: set})
                    })
                })
                if(data.Items.length == 0){
                    this.setState({isLoaded: true})
                }
                this.getItemsFromDB()
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

    renderHistory(){
        if(this.state.isLoaded){
            if(this.state.items.length > 0 ){
               return(
                    <div style={history}>
                    {this.renderSortingMenu()}
                        <ItemsGrid items={this.state.items}/>
                    </div>
                ) 
            }
            else {
                return(
                    <div style={history}>
                            <div style={panel}>
                                <div style={noItems}>
                                    <div>
                                        <img src={itemsEmpty} style={noItemsImage}/>
                                    </div>
                                    <h1>No Items</h1>
                                    <h4>
                                        Items that you order will show up here, so that you can quickly find your items again
                                    </h4>
                                </div>
                                <div style={{margin:'3rem auto 2rem auto', textAlign:'center'}}>
                                    <Button size='large'
                                            onClick={()=>{this.props.history.push('/home')}}
                                            style={noItemsButton}>
                                        Browse Store
                                    </Button>
                                </div>
                            </div>
                        </div>
                )
            }
        } else if (this.state.isLoaded || cognitoUser == null){
            return(
                <div style={history}>
                        <div style={panel}>
                            <div style={noItems}>
                                <div>
                                    <img src={itemsEmpty} style={noItemsImage}/>
                                </div>
                                <h1>No Items</h1>
                                <h4>
                                    Items that you order will show up here, so that you can quickly find your items again
                                </h4>
                            </div>
                            <div style={{margin:'3rem auto 2rem auto', textAlign:'center'}}>
                                <Button size='large'
                                        onClick={()=>{this.props.history.push('/home')}}
                                        style={noItemsButton}>
                                    Browse Store
                                </Button>
                            </div>
                        </div>
                    </div>
            )
        }
    }

    // Written by https://github.com/timroesner
    sortBy(option) {
		if(option == "lowtohigh") {
			this.setState({items: this.state.items.sort(function(a, b){
				let priceA = a.sale != 0 ? a.sale : a.price;
				let priceB = b.sale != 0 ? b.sale : b.price;
				console.log(priceB)
				return(priceA - priceB)
			})})

		} else if(option == "hightolow") {
			this.setState({items: this.state.items.sort(function(a, b){
				let priceA = a.sale != 0 ? a.sale : a.price;
				let priceB = b.sale != 0 ? b.sale : b.price;
				return(priceB - priceA)
			})})

		} else if(option == "name") {
			this.setState({items: this.state.items.sort(function(a, b){return(a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)})})
		}
	}

    // Written by https://github.com/timroesner
    renderSortingMenu() {
        const astext = {
            background:'none',
            border:'none',
            margin:'0',
            padding:'0',
            marginTop: '14px',
            fontSize: '1.25em',
            textAlign: 'center'
        }

        const dropdownButton = {
            background:'none',
            border:'none',
            margin:'7px 0 7px 8px',
            padding:'0',
            fontSize: '1.15em',
            textAlign: 'center',
            fontWeight: '200'
        }
        
		return(
				<div className="dropdown" style={{margin: '16px'}} >
            <button className="dropdown-toggle primaryRedWithHover" style={astext} type="button" id="dropdownMenuHeader" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Sorting by
                <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li>
                        <button className="primaryRedWithHover" style={dropdownButton} onClick={() => this.sortBy("lowtohigh")} >
                            Price: Low to High</button></li>
                <li>
                        <button className="primaryRedWithHover" style={dropdownButton} onClick={() => this.sortBy("hightolow")} >
                            Price: High to Low</button></li>
                <li>
                        <button className="primaryRedWithHover" style={dropdownButton} onClick={() => this.sortBy("name")} >
                            Alphabetical</button></li>
            </ul>
            </div>
		)
	}

    render(){
        return(
            <div>
                <Header/>
                <div id="pageBody">
                    <h1 style={pageTitle}>Your Past Purchases</h1>
                    {this.renderHistory()}
                </div>
            </div>

        )
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
}

export default withRouter(History)