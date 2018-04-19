import {withRouter} from 'react-router-dom';
import Header from './components/header';
import React from "react";
import {Button} from "ic-snacks";
import itemsEmpty from './images/items_empty.png'
import {CognitoUserPool} from "amazon-cognito-identity-js";
import {DynamoDB} from "aws-sdk";
import ItemsGrid from "./components/ItemsGrid";

var poolData;
var dynamodb;
//Styles
const history = {fontFamily:'"Open Sans", "Helvetica Neue", Helvetica, sans-serif', maxWidth:'145.6rem',
    height:'auto !important', margin:'3rem auto', background:'#ffffff', borderRadius:'.6rem'};
const pageTitle = {textAlign:'center', padding:'1.5rem', fontWeight:'600'};
const panel = {backgroundColor:'#FFFFFF',border:'1px solid #F0EFEC',borderRadius:'.6rem',
    marginBottom:'2rem',marginRight:'2rem',marginLeft:'2rem', padding:'4rem 0'}
const noItems = {textAlign:'center', marginBottom: '2rem'};
const noItemsButton = {paddingLeft:'4rem', paddingRight:'4rem'}
const noItemsImage = {maxWidth:'20rem'}

class History extends React.Component{

    constructor(){
        super();
        this.state = {
            orderHistory: [],
            items: [],
            isLoaded: false,
            user: null,
        }
        this.setKeys()
        this.getCognitoUser()
    }

    getCognitoUser(){

        var userPool = new CognitoUserPool(poolData);
        var cognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null) {
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    alert(err);
                    return;
                }
            });
            // Necessary because the closure has no access to this.state
            let self = this;
            cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                    alert(err);
                    //TODO remove these alerts
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

    getUserDetails(){
        var userParams = {
            Key: {
                'userid': {S: this.state.user.userId}
            },AttributesToGet: [
                'history',
                /* more items */
            ],
            TableName: "user"
        };
        dynamodb.getItem(userParams, (err, data) => {
            if(err) {console.log(err, err.stack)}
            else{
                data.Item.history.L.forEach((item)=>{
                    item.M.items.L.forEach((i)=>{
                        let itemId = i.M.itemid.S
                        console.log('[itemids]',itemId)
                        this.setState({orderHistory: [...this.state.orderHistory, itemId]})
                    })
                })
                this.getItemsFromDB()
            }
        })
    }

    renderHistory(){
        if(this.state.isLoaded){return(
            <div style={history}>
                <ItemsGrid items={this.state.items}/>
            </div>
        )}
        else{
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

    render(){
        return(
            <div>
                <Header/>
                <h1 style={pageTitle}>Your Past Purchases</h1>
                {this.renderHistory()}
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