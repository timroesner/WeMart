import Header from './components/header';
import ItemsGrid from './components/ItemsGrid';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {DynamoDB} from "aws-sdk/index";

var query = "";
var finishedLoading = false;

class Search extends Component {

	constructor(props) {
		super(props);

		this.state = {
			items: []
		}

		const queryParams = new URLSearchParams(this.props.location.search);
    	query = queryParams.get('query')
    	let special = queryParams.get('special')

    	if(special == "true") {
    		if(query == "savings") {
    			this.getSavingsItems()
    		} else {
    			this.getDepartmentItems()
    		}
    	} else {
    		this.searchItems()
    	}
	}

	getDepartmentItems() {

	}

	getSavingsItems() {

	}

	searchItems() {
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

	    var params = {
	        TableName: "item"
	    };

	    var items = [];
	    dynamodb.scan(params, (err, data) => {
	        if (err) {
	        	alert(JSON.stringify(err))
	        } else {
	            data.Items.forEach((element) => {
	            	items.push({
	            		itemid: element.itemid.S,
	            		name: element.name.S, 
	            		image: element.image.S,
	            		price: element.price.N,
	            		quantity: element.quantity.S,
	            		sale: element.sale.N,
	            		departmentid: element.departmentid.N,
	            		inCart: 0,
	            	})
	            });
	            this.setState({items: items})
	            finishedLoading = true
	        }
	    });
	}

	renderItems() {
		if(this.state.items.length != 0) {
			return(
				<ItemsGrid items={this.state.items} />
			)
		} else if(finishedLoading) {
			return(
				<h1 style={{width: '100%', textAlign: 'center', marginTop: '35vh', color: 'gray'}}>No items found</h1>
			)
		}
	}

	render() {
		return(
			<div>
				<Header />
				{this.renderItems()}
			</div>
		)
	}
}
export default withRouter(Search);