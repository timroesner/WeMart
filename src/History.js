import {withRouter} from 'react-router-dom';
import Header from './components/header';
import React from "react";

//Styles
const history = {}

class History extends React.Component{
    render(){
        return(
            <div>
                <Header/>
                <div>

                </div>
            </div>

        )
    }
}

export default withRouter(History)