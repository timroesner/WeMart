import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignUp from './SignUp';
import registerServiceWorker from './registerServiceWorker';
import ItemGridTest from "./ItemGridTest";

// ReactDOM.render(<SignUp />, document.getElementById('signup'));
ReactDOM.render(<ItemGridTest />, document.getElementById('signup'));
registerServiceWorker();
