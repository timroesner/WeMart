import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Header from './components/header';
import {DynamoDB} from "aws-sdk/index";
import Footer from './components/Footer';

class Departments extends Component {

	constructor(props) {
		super(props)

		this.state = { departments: [] }

		this.getDepartments()
	}

	getDepartments() {

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
	        TableName: "department"
	    };

	    var departments = [];
	    dynamodb.scan(params, (err, data) => {
	        if (err) {
	        	alert(JSON.stringify(err))
	        } else {
	            data.Items.forEach((element) => {
	            	departments.push({name: element.departmentid.S, image: element.image.S})
	            });
				this.setState({departments: departments})
				console.log(departments)
	        }
	    });
	}

	renderDepartments(departments) {
		const gridItem = {
		  border: '1.5px solid gray',
		  borderRadius: '10px',
		  fontSize: '1.2em',
		  textAlign: 'center',
		  marginBottom: '5vw',
		  height: 'minmax(150px, 1fr)',
		  overflow: 'hidden',
		  cursor: 'pointer',
		}

		// Inline sort by department name
		departments.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );

		return(departments.map((dep)=>
			<div style={gridItem} onClick={() => this.handleClick(dep.name)} >
				<img src={dep.image} style={{width: '80%', marginLeft:'20%', borderRadius: '0 10px 0 0'}} />
			{dep.name}
			</div>
		))
	}

	handleClick(depName) {
		this.props.history.push({
          pathname: '/search',
          search: '?query='+depName+'&special=true'
        })
	}

	render() {

		const gridContainer = {
  			display: 'grid',
  			gridTemplateColumns: 'repeat( auto-fit, minmax(150px, 1fr) )',
  			gridColumnGap: '5%',
  			margin: '5%',
  			width: '90%',
		}

		return(
		<div>
			<Header />

			<div style={gridContainer}>
			  {this.renderDepartments(this.state.departments)}
			</div>

			<Footer />
		</div>
		)
	}
}
export default withRouter(Departments);
