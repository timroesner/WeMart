import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignUp from './SignUp';
import registerServiceWorker from './registerServiceWorker';
import ItemGridTest from "./ItemGridTest";
import Tester from "./Tester";

// ReactDOM.render(<SignUp />, document.getElementById('signup'));
ReactDOM.render(<Tester/>, document.getElementById('signup'));

registerServiceWorker();
