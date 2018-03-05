import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignUp from './SignUp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SignUp />, document.getElementById('signup'));
registerServiceWorker();
