import React, { Component } from 'react';
import HorizontalScroll from './components/HorizontalScroll';
import Header from './components/header';
import { withRouter } from 'react-router-dom';
import AWS from 'aws-sdk/index';
import {DynamoDB} from 'aws-sdk/index';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departmentItems: [],
      savingsItems: [],
      historyItems: []
    }
  }

  componentDidMount = () =>  {

    // Get the dynamoDB database
    var dynamodb;
    if(process.env.NODE_ENV === 'development'){
        dynamodb = require('./db').db;
    } else {
        dynamodb = new DynamoDB({
            region: "us-west-1",
            credentials: {
                accessKeyId: process.env.REACT_APP_DB_accessKeyId,
                secretAccessKey: process.env.REACT_APP_DB_secretAccessKey},
        });
    }

    // Get the table whose name is "item"
    var params = {
        TableName: "item"
    };

    dynamodb.scan(params, (err, data) => {
        if (err) {console.log(err, err.stack)} // an error occurred
        else{
            data.Items.forEach((element) => {

                //TODO Clean this up into a one liner.
                let departmentid = element.department.S;
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
                    savingsItems: [...this.state.savingsItems, testItem]
                });
            });
        }
    });
  }


  render() {
    return (
      <div>
        <Header />
        <div id="pageBody" className="container-fluid">
          <HorizontalScroll items={this.state.savingsItems} title="Browse by Department"/>
          <HorizontalScroll items={this.state.savingsItems} title="History"/>
          <HorizontalScroll items={this.state.savingsItems} title="Savings"/>
      </div>
      </div>
    );
  }
}

export default withRouter(Home);
