import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import Header from './components/header';


ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Home />, document.getElementById('root'));
