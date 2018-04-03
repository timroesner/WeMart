import React, { Component } from 'react';
import HorizontalScroll from './HorizontalScroll';
import '../stylesheets/home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departmentItems: [],
      savingsItems: [{
        name: 'Cream Cheese',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Philly_cream_cheese.jpg/1200px-Philly_cream_cheese.jpg',
        price: '3.79',
        sale: '2.49',
        quantity: '8 oz'
      },
      {
        name: 'Apples',
        image: 'https://www.organicfacts.net/wp-content/uploads/2013/05/Apple4.jpg',
        price: '3.79',
        sale: '2.49',
        quantity: '8 oz'
      },
      {
        name: 'Bagel',
        image: 'https://d3cizcpymoenau.cloudfront.net/images/24017/SFS_Bagel_V2-14.jpg',
        price: '3.79',
        sale: '2.49',
        quantity: '8 oz'
      },
      {
        name: 'Apples',
        image: 'https://www.organicfacts.net/wp-content/uploads/2013/05/Apple4.jpg',
        price: '3.79',
        sale: '2.49',
        quantity: '8 oz'
      },
      {
        name: 'Apples',
        image: 'https://www.organicfacts.net/wp-content/uploads/2013/05/Apple4.jpg',
        price: '3.79',
        sale: '2.49',
        quantity: '8 oz'
      },
      {
        name: 'Apples',
        image: 'https://www.organicfacts.net/wp-content/uploads/2013/05/Apple4.jpg',
        price: '3.79',
        sale: '2.49',
        quantity: '8 oz'
      },
      {
        name: 'Apples',
        image: 'https://www.organicfacts.net/wp-content/uploads/2013/05/Apple4.jpg',
        price: '3.79',
        sale: '2.49',
        quantity: '8 oz'
      }],
      historyItems: []
    }
  }

  render() {
    return (
      <div className="container">
        <HorizontalScroll items={this.state.savingsItems} title="Browse by Department"/>
        <HorizontalScroll items={this.state.savingsItems} title="History"/>
        <HorizontalScroll items={this.state.savingsItems} title="Savings"/>
      </div>
    );
  }
}

export default Home;
