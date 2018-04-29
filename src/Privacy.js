import React, { Component } from 'react';
import TextFileReader from './components/TextFileReader'
import Header from './components/header';
import Footer from './components/Footer'

class Privacy extends Component {


  constructor(){
    super();
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
    window.scrollTo(0, 0);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };



  render() {
    var Last = require("./text/Privacy/Last.txt");
    var Info = require("./text/Privacy/Info.txt");
    var How = require("./text/Privacy/How.txt");
    var What = require("./text/Privacy/What.txt");
    var Changes = require("./text/Privacy/Changes.txt");
    var Cali = require("./text/Privacy/California.txt");

    const pageTitle={
      color: "white",
      margin: "0",
      position: "relative",
      top: "50%",
      transform: "translateY(-50%)",
      textAlign: "center",
      fontWeight: "bold",
    };

    const heading = {
      textAlign: "center",
      marginBottom: "30px",
      fontWeight: "500",
    };

    const divSpacing={
      margin: 'auto',
      width: '60%',
      marginTop: "50px",
      marginBottom: "30px"
    }

    const divBorderW={
      borderTop: "0.5px solid rgba(238,245,244,1)",
      borderBottom: "0.5px solid rgba(238,245,244,1)",
      width: "100%",
      backgroundColor: "#FFFFFF"
    }
    const divBorderG={
      borderTop: "0.5px solid rgba(238,245,244,1)",
      borderBottom: "0.5px solid rgba(238,245,244,1)",
      width: "100%",
      backgroundColor: "#FCFCFC"
    }

    const styles={
      backgroundColor: "rgba(211,7,7,1)",
      height: "12em",
      marginTop: '-15px',
    }

    return (
      <div>
        <Header />

        <div>
          <div style={styles}>
            <h1 style={pageTitle}> Privacy </h1>
          </div>

          <div>

            <div style={divBorderW}>
              <div style={divSpacing}>
                <h3 style={heading}>Last Updated: April 19, 2018</h3>
                <TextFileReader txt={Last}/>
              </div>
            </div>

            <div style={divBorderG}>
              <div style={divSpacing}>
                <h3 style={heading}>Information we collect</h3>
                <TextFileReader txt={Info}/>
              </div>
            </div>

            <div style={divBorderW}>
              <div style={divSpacing}>
                <h3 style={heading}>How we use your information</h3>
                <TextFileReader txt={How}/>
              </div>
            </div>


            <div style={divBorderG}>
              <div style={divSpacing}>
                <h3 style={heading}>What We Share</h3>
                <TextFileReader txt={What}/>
              </div>
            </div>

            <div style={divBorderW}>
              <div style={divSpacing}>
                <h3 style={heading}>Changes to this Policy</h3>
                <TextFileReader txt={Changes}/>
              </div>
            </div>

            <div style={divBorderG}>
              <div style={divSpacing}>
                <h3 style={heading}>For Californian Residents</h3>
                <TextFileReader txt={Cali}/>
              </div>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    );

  }
}


export default Privacy;
