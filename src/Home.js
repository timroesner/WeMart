import React, { Component } from 'react';
import HorizontalScroll from './components/HorizontalScroll';
import Header from './components/header';
import { withRouter } from 'react-router-dom';
import AWS from 'aws-sdk/index';
import {DynamoDB} from 'aws-sdk/index';
import {CognitoUserPool} from "amazon-cognito-identity-js";

var poolData;
var dynamodb;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departmentItems: [],
      savingsItems: [],
      historyItems: [],
      isLoggedIn: false,
      isLoaded: false,
      orderHistory: new Set(),
       user: null
    }
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

  getDepartments() {
    var params = {
	    TableName: "department",
      Limit: 10
	   };

	  var departments = [];
	  dynamodb.scan(params, (err, data) => {
	    if (err) {
	      alert(JSON.stringify(err))
	    }
      else {
        data.Items.forEach((element) => {
	      departments.push({name: element.departmentid.S, image: element.image.S})
	      });
				this.setState({departmentItems: departments})
	    }
	  });
  }

  getSavingsItems() {

    var params = {
      ExpressionAttributeValues: {
      ':s': {N: '0'}
      },
      FilterExpression: 'sale > :s ',
      TableName: "item",
      Limit: 50
    };

    dynamodb.scan(params, (err, data) => {
      if (err) {console.log(err, err.stack)} // an error occurred
      else {
        data.Items.forEach((element) => {
          let departmentid = element.department.S;
          let image = element.image.S;
          let itemid = (element.itemid.S);
          let name = (element.name.S);
          let price = (element.price.N);
          let quantity = (element.quantity.S);
          let sale = (element.sale.N);

          let saleItem = {
              itemid: itemid, name: name, departmentid: departmentid, image: image, price: price,
              quantity: quantity, sale: sale, inCart: 0};
          this.setState({
              savingsItems: [...this.state.savingsItems, saleItem]
          });
        });
      }
    });
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
        //         /* more items */
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
                          historyItems: [...this.state.historyItems, testItem]
                      });

                      console.log('test item', testItem)
                  }
                  this.setState({isLoaded: true})
              })
          })
      }

  componentDidMount = () =>  {

    this.setKeys()
    this.getCognitoUser()
    this.getDepartments()
    this.getSavingsItems()

  }


  render() {
    return (
      <div>
        <Header />
        <div id="pageBody" className="container-fluid">
          <HorizontalScroll items={this.state.departmentItems} title="Browse by Department"/>
          <HorizontalScroll items={this.state.savingsItems} title="Savings"/>
          <HorizontalScroll items={this.state.historyItems} title="History"/>
      </div>
      </div>
    );
  }
}

export default withRouter(Home);
