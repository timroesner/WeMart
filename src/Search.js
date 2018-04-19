import Header from './components/header';
import ItemsGrid from './components/ItemsGrid';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {DynamoDB} from "aws-sdk/index";
import { Button, DropdownMenu, MenuItem } from 'ic-snacks';

var query = "";
var dynamodb;

class Search extends Component {

	constructor(props) {
		super(props);

		this.state = {
			items: [],
			finishedLoading: false,
		}

		this.initializeDatabase()

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

	initializeDatabase() {
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
	}

	getDepartmentItems() {
		var params = { 
		  ExpressionAttributeValues: {
		   ":d": {
		     S: query
		    }
		  }, 
		  FilterExpression: "department = :d",  
		  TableName: "item"
		 };

		 var items = [];
		 dynamodb.scan(params, function(err, data) {
		 	if(err) {
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
	            		departmentid: element.department.S,
	            		inCart: 0,
	            	})
	            });
	            this.setState({items: items, finishedLoading: true})
		 	}
		 }.bind(this));
	}

	getSavingsItems() {
		var params = { 
		  ExpressionAttributeValues: {
		   ":s": {
		     N: "0"
		    }
		  }, 
		  FilterExpression: "sale <> :s",  
		  TableName: "item"
		};

		 var items = [];
		 dynamodb.scan(params, function(err, data) {
		 	if(err) {
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
	            		departmentid: element.department.S,
	            		inCart: 0,
	            	})
	            });
	            this.setState({items: items, finishedLoading: true})
		 	}
		 }.bind(this));
	}

	searchItems() {

	    var params = {  
		  	TableName: "item"
		};

	    var items = [];
	    dynamodb.scan(params, (err, data) => {
	        if (err) {
	        	alert(JSON.stringify(err))
	        } else {
	            data.Items.forEach((element) => {

	            	// Grab parameters for search
	            	let department = element.department.S;
	            	let name = element.name.S;
	            	let keywords = element.keywords.S.toLowerCase().split(",");
	            	query = query.toLowerCase()

	            	if(department.toLowerCase().includes(query) || name.toLowerCase().includes(query) || keywords.includes(query)) {
		            	items.push({
		            		itemid: element.itemid.S,
		            		name: name, 
		            		image: element.image.S,
		            		price: element.price.N,
		            		quantity: element.quantity.S,
		            		sale: element.sale.N,
		            		departmentid: department,
		            		inCart: 0,
		            	})
		            }
	            });
	            this.setState({items: items, finishedLoading: true})
	        }
	    });
	}

	renderItems() {
		if(this.state.items.length != 0) {
			return(
				<ItemsGrid items={this.state.items} />
			)
		} else if(this.state.finishedLoading) {
			return(
				<h1 style={{width: '100%', textAlign: 'center', marginTop: '30vh', color: 'gray'}}>No items found</h1>
			)
		}
	}

	sortBy(value) {
		if(value == "lowtohigh") {
			this.setState({items: this.state.items.sort(function(a, b){
				let priceA = a.sale != 0 ? a.sale : a.price;
				let priceB = b.sale != 0 ? b.sale : b.price;

				return((priceA > priceB) ? 1 : ((priceA < priceB) ? -1 : 0))
			})})

		} else if(value == "hightolow") {
			this.setState({items: this.state.items.sort(function(a, b){
				let priceA = a.sale != 0 ? a.sale : a.price;
				let priceB = b.sale != 0 ? b.sale : b.price;

				return((priceA < priceB) ? 1 : ((priceA > priceB) ? -1 : 0))
			})})

		} else if(value == "name") {
			this.setState({items: this.state.items.sort(function(a, b){return(a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)})})
		}
	}

	renderSortingMenu() {
		return(
				<div style={{ margin: '16px'}}>
				<DropdownMenu triggerElement={<Button snacksStyle="secondary" size="small" >Sorting by&nbsp;
				   <span class="caret"></span></Button>}>
				   	<MenuItem value="lowtohigh" style={{padding: '6px'}} labelStyles={{padding: '0'}}><p onClick={() => this.sortBy("lowtohigh")}>Price: High to Low</p></MenuItem>
				   	<MenuItem value="hightolow" style={{padding: '6px'}} labelStyles={{padding: '0'}}><p onClick={() => this.sortBy("hightolow")}>Price: Low to High</p></MenuItem>
				   	<MenuItem value="name" style={{padding: '6px'}} labelStyles={{padding: '0'}}><p onClick={() => this.sortBy("name")}>Name</p></MenuItem>
    			</DropdownMenu>
    			</div>
		)
	}

	render() {
		return(
			<div>
				<Header />
				{this.renderSortingMenu()}
				{this.renderItems()}
			</div>
		)
	}
}
export default withRouter(Search);