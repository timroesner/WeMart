import React, { Component } from 'react';
import TextFileReader from './components/TextFileReader'
import Header from './components/header';
import Footer from './components/Footer'

class Terms extends Component {


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
    var Last = require("./text/Terms/Last.txt");
    var Use = require("./text/Terms/Use.txt");
    var Comm = require("./text/Terms/Comm.txt");
    var Coupons = require("./text/Terms/Coupons.txt");
    var Alcohol = require("./text/Terms/Alcohol.txt");
    var Third = require("./text/Terms/Third.txt");
    var Service = require("./text/Terms/Service.txt");
    var Limit = require("./text/Terms/Limit.txt");
    var Indemn = require("./text/Terms/Indemn.txt");
    var Dispute = require("./text/Terms/Dispute.txt");
    var Termin = require("./text/Terms/Termin.txt");
    var Control = require("./text/Terms/Control.txt");
    var Entire = require("./text/Terms/Entire.txt");
    var Waiver = require("./text/Terms/Waiver.txt");
    var Assign = require("./text/Terms/Assign.txt");
    var Changes = require("./text/Terms/Changes.txt");
    var Copy = require("./text/Terms/Copy.txt");



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
            <div style={styles}>
              <h1 style={pageTitle}> Terms </h1>
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
                  <h3 style={heading}>1. Your Use of the Services</h3>
                  <TextFileReader txt={Use}/>
                </div>
              </div>

              <div style={divBorderW}>
                <div style={divSpacing}>
                  <h3 style={heading}>2. WeMart Communications</h3>
                  <TextFileReader txt={Comm}/>
                </div>
              </div>


              <div style={divBorderG}>
                <div style={divSpacing}>
                  <h3 style={heading}>3. WeMart Coupons</h3>
                  <TextFileReader txt={Coupons}/>
                </div>
              </div>

              <div style={divBorderW}>
                <div style={divSpacing}>
                  <h3 style={heading}>4. Transactions involving Alcohol</h3>
                  <TextFileReader txt={Alcohol}/>
                </div>
              </div>

              <div style={divBorderG}>
                <div style={divSpacing}>
                  <h3 style={heading}>5. Third-Party Products and Content</h3>
                  <TextFileReader txt={Third}/>
                </div>
              </div>

              <div style={divBorderW}>
                <div style={divSpacing}>
                  <h3 style={heading}>6. SERVICE PROVIDED AS-IS AND RELEASE OF CLAIMS</h3>
                  <TextFileReader txt={Service}/>
                </div>
              </div>

              <div style={divBorderG}>
                <div style={divSpacing}>
                  <h3 style={heading}>7. LIMITATION OF LIABILITY</h3>
                  <TextFileReader txt={Limit}/>
                </div>
              </div>

              <div style={divBorderW}>
                <div style={divSpacing}>
                  <h3 style={heading}>8. Indemnification</h3>
                  <TextFileReader txt={Indemn}/>
                </div>
              </div>

              <div style={divBorderG}>
                <div style={divSpacing}>
                  <h3 style={heading}>9. Disputes & Arbitration</h3>
                  <TextFileReader txt={Dispute}/>
                </div>
              </div>

              <div style={divBorderW}>
                <div style={divSpacing}>
                  <h3 style={heading}>10. Termination</h3>
                  <TextFileReader txt={Termin}/>
                </div>
              </div>

              <div style={divBorderG}>
                <div style={divSpacing}>
                  <h3 style={heading}>11. Controlling Law</h3>
                  <TextFileReader txt={Control}/>
                </div>
              </div>

              <div style={divBorderW}>
                <div style={divSpacing}>
                  <h3 style={heading}>12. Entire Agreement & Severability</h3>
                  <TextFileReader txt={Entire}/>
                </div>
              </div>

              <div style={divBorderG}>
                <div style={divSpacing}>
                  <h3 style={heading}>13. No Waiver</h3>
                  <TextFileReader txt={Waiver}/>
                </div>
              </div>

              <div style={divBorderW}>
                <div style={divSpacing}>
                  <h3 style={heading}>14. Assignment</h3>
                  <TextFileReader txt={Assign}/>
                </div>
              </div>

              <div style={divBorderG}>
                <div style={divSpacing}>
                  <h3 style={heading}>15. Changes to the Terms</h3>
                  <TextFileReader txt={Changes}/>
                </div>
              </div>

              <div style={divBorderW}>
                <div style={divSpacing}>
                  <h3 style={heading}>16. Copyright and Trademark Policy</h3>
                  <TextFileReader txt={Copy}/>
                </div>
              </div>


            </div>
        <Footer />
      </div>
    );
}
}


export default Terms;
