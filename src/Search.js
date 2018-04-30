import Header from './components/header';
import Footer from './components/Footer';
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
		this.props.history.listen((location, action) => {
    		// This 100ms delay is necessary for the query to change
    		setTimeout(function() {
      			this.getQuerry()
  			}.bind(this), 100)
		})

		this.initializeDatabase()
		this.getQuerry()
	
	}

	getQuerry() {
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
				console.log(JSON.stringify(err))
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
	            		quantityInCart: 0,
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
				console.log(JSON.stringify(err))
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
	        	console.log(JSON.stringify(err))
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

		return (
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

	render() {
		return(
			<div>
				<Header />
				<div id="pageBody" style ={{minHeight:window.innerHeight-228}} >
					{this.renderSortingMenu()}
					{this.renderItems()}
				</div>
				<Footer />
			</div>
		)
	}
}
export default withRouter(Search);