import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Header from './components/header';
import {DynamoDB} from "aws-sdk/index";

var departments = [{name: "Dairy", image: "https://wemartimages.s3.us-west-1.amazonaws.com/departments/bakery.jpg"}, {name: "Dairy", image: "https://wemartimages.s3.us-west-1.amazonaws.com/departments/bakery.jpg"}, {name: "Dairy", image: "https://wemartimages.s3.us-west-1.amazonaws.com/departments/bakery.jpg"}, {name: "Dairy", image: "https://wemartimages.s3.us-west-1.amazonaws.com/departments/bakery.jpg"}, {name: "Dairy", image: "https://wemartimages.s3.us-west-1.amazonaws.com/departments/bakery.jpg"}, {name: "Dairy", image: "https://wemartimages.s3.us-west-1.amazonaws.com/departments/bakery.jpg"}, {name: "Dairy", image: "https://wemartimages.s3.us-west-1.amazonaws.com/departments/bakery.jpg"}, {name: "Dairy", image: "https://wemartimages.s3.us-west-1.amazonaws.com/departments/bakery.jpg"},]

class Departments extends Component {

	getDepartments() {
		const gridItem = {
		  border: '2px solid gray',
		  borderRadius: '10px',
		  fontSize: '1.4em',
		  textAlign: 'center',
		  marginBottom: '5vw',
		  height: 'minmax(150px, 1fr)',
		}

		// // Get the dynamoDB database
	 //    var dynamodb;
	 //    if(process.env.NODE_ENV === 'development'){
	 //        dynamodb = require('./db').db;
	 //    } else {
	 //        dynamodb = new DynamoDB({
	 //            region: "us-west-1",
	 //            credentials: {
	 //                accessKeyId: process.env.REACT_APP_DB_accessKeyId,
	 //                secretAccessKey: process.env.REACT_APP_DB_secretAccessKey},
	 //        });
	 //    }

	 //    var params = {
	 //        TableName: "departments"
	 //    };

	 //    dynamodb.scan(params, (err, data) => {
	 //        if (err) {
	 //        	alert(JSON.stringify(err))
	 //        } else {
	 //            data.Items.forEach((element) => {
	 //            	departments.push({name: element.name.S, image: element.image.S})
	 //            });

	 //            return(departments.map((dep)=>
		// 			<div style={gridItem}>
		// 				<img src={dep.image} style={{width: '80%', marginLeft:'20%', borderRadius: '10px'}} />
		// 			{dep.name}
		// 			</div>
		// 		))
	 //        }
	 //    });

	    return(departments.map((dep)=>
					<div style={gridItem} onClick={() => this.handleClick(dep.name)} >
						<img src={dep.image} style={{width: '80%', marginLeft:'20%', borderRadius: '10px'}} />
						{dep.name}
					</div>
				))
	}

	handleClick(depName) {
		this.props.history.push({
          pathname: '/search',
          search: '?query='+depName+'&dep=true'
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
			  {this.getDepartments()} 
			</div>

		</div>
		)
	}
}
export default withRouter(Departments);