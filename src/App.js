import React, { Component } from 'react';
import request from 'request';
import logo from './logo.svg';
import './App.css';
import Block from './Block';
import itemExists from './itemExists';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: []
    }
    this.callApi = this.callApi.bind(this);
    this.changeState = this.changeState.bind(this);
  }
  componentDidMount() {
    const urls = ['https://prima.run/health','https://cognition.dev.stackworx.cloud/api/status','https://api.durf.dev.stackworx.io/health','https://stackworx.io/'];
    setInterval(() => {
      return this.callApi(urls)
    }, 3000)
  }

  changeState(response) {
    console.log("Length: ", this.state.response.length)
    if (response.statusCode === 200) {
      this.setState(
        previousState => {
          response:  !itemExists(previousState.response, response) ?
            previousState.response.push(response) : previousState.response}, () => localStorage.setItem('checkResult', JSON.stringify(response.statusCode)  ))
      
    }else{

    };
  }

  callApi = async urls =>
  urls.map(url => request(url, (error, response, body) => {
      return {
        response
      };
    }).on('response', response => {
      this.changeState(response);
    })
  );
  render() {
    return (
      <Block response={this.state.response} />
    );
  }
}

export default App;
