import {withRouter} from 'react-router-dom';
import Header from './components/header';
import React from "react";
import {Button} from "ic-snacks";
import itemsEmpty from './images/items_empty.png'
import {CognitoUserPool} from "amazon-cognito-identity-js";
import {DynamoDB} from "aws-sdk";

//Styles
const history = {fontFamily:'"Open Sans", "Helvetica Neue", Helvetica, sans-serif', maxWidth:'145.6rem',
    height:'auto !important', margin:'3rem auto'};
const pageTitle = {textAlign:'center', padding:'1.5rem' ,fontFamily:' "Open Sans", "Helvetica Neue", Helvetica, sans-serif'};
const panel = {backgroundColor:'#FFFFFF',border:'1px solid #F0EFEC',borderRadius:'.6rem',
    marginBottom:'2rem',marginRight:'2rem',marginLeft:'2rem', padding:'4rem 0'}
const noItems = {textAlign:'center', marginBottom: '2rem'};
const noItemsButton = {paddingLeft:'4rem', paddingRight:'4rem'}
const noItemsImage = {maxWidth:'20rem'}

class History extends React.Component{

    constructor(){
        super();
        this.state = {
            orderHistory: null,
            user: null,
        }
        this.getCognitoUser()
    }

    getCognitoUser(){
        var poolData;
        if(process.env.NODE_ENV === 'development'){
            poolData =require('./poolData').poolData;
        } else{
            poolData = {
                UserPoolId : process.env.REACT_APP_Auth_UserPoolId,
                ClientId : process.env.REACT_APP_Auth_ClientId
            }
        }
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
                console.log(result) //Logs user attributes

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
        // Get the dynamoDB database
        var dynamodb;
        if(process.env.NODE_ENV === 'development'){
            dynamodb = require('./db').db;
        }else{
            dynamodb = new DynamoDB({
                region: "us-west-1",
                credentials: {
                    accessKeyId: process.env.REACT_APP_DB_accessKeyId,
                    secretAccessKey: process.env.REACT_APP_DB_secretAccessKey},
            });
        }
        // Get the user based on their userId from the user table
        var userParams = {
            Key: {
                'userid': {S: this.state.user.userId}
            },
            TableName: "user"
        };
        // Scan the DB and get the user
        dynamodb.getItem(userParams, (err, data) => {
            if(err) {console.log(err, err.stack)}
            else{
                console.log(data);

                //TODO get the users order history;
            }
        })
    }

    renderHistory(){
        if(this.state.orderHistory){return(
            <div style={history}>
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
                                Items that you order will show up here so that you can quickly find your items again
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
}

export default withRouter(History)