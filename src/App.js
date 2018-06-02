import React, { Component } from 'react';
import request from 'request';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    }
    this.callApi = this.callApi.bind(this);
    this.changeState = this.changeState.bind(this);
  }
  componentDidMount() {
    const urls = ['https://prima.run/health','https://cognition.dev.stackworx.cloud/api/status','https://api.durf.dev.stackworx.io/health','https://stackworx.io/'];
    setInterval(() => {
      return this.callApi(urls)
        .then(res => {
          console.log("Stats code: ", res)
          this.setState({ response: res }, () => console.log("Respoinse: ", this.state.response))
        })
        .catch(err => console.log(err));
    }, 3000)
  }

  changeState(response) {
    if (response.statusCode === 200) {
      this.setState({ response }, () => localStorage.setItem('checkResult', JSON.stringify(response.statusCode)  ))
    }else{

    };
  }

  callApi = async urls =>
  urls.map(url => request(url, (error, response, body) => {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      return {
        response
      };
    }).on('response', response => {
      console.log("This: ", this)
      this.changeState(response);
    })
  );
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {this.state.response.hostname}
        </p>
      </div>
    );
  }
}

export default App;
