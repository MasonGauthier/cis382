import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Typicode from './Typicode.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {restData: {}};
  }
    
  handleButtonClick(event) {
    
    // Prevent default submit event
    event.preventDefault();
    
    console.log("Button: " + event.target.id);
    
    let whichData = 'users';
    
    this.getRESTData(whichData);
    
  }
  
  getRESTData(whichData) {
    // Call server-side method to return weather
    // Why bind(this) below? See http://stackoverflow.com/questions/35581611/exception-in-delivering-result-of-invoking-typeerror-is-not-a-function-in-met
    // Note that setState is asynchronous, which means you should not immediately (sequentially) depend on a setState changing
    if (Meteor.isClient) {
      Meteor.call("getRestData", whichData, function(error, results) {
        try{
          //console.log(results);
          if (error) {
            console.log("Error in retrieving data: " + error);
          } else {
            this.setState({restData: JSON.parse(results)});
          }
        } catch (err) {
          console.log("Error in Meteor call: " + err);
        }
      }.bind(this));
    }
  }
  
  renderRESTData() {
    if (this.state.restData) {
      return <Typicode data={this.state.restData} />
    }
  }
  
  render() {
    return (
      <div className="container">
        <header>
          <div id="title">REACT REST Calls</div><br />
          <div id="credit">Powered by <a href="https://jsonplaceholder.typicode.com/">JSONPlaceholder</a></div>
          <p>
          Return JSON data using REST call via HTTP package using Meteor and React.
          </p>
          <div><button id="getUserData" onClick={this.handleButtonClick.bind(this)}>Get User Data</button></div>
          
        </header>
        <main>
            {this.renderRESTData()}
        </main>
      </div>
    );
  }
}