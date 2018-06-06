import React, { Component } from 'react';
import request from 'request';
import './App.css';
import Block from './Block';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endPointHistory: Array(6).fill(null),
      endPoints: [
        'https://cognition.dev.stackworx.cloud/api/status',
        'https://github.com/request/request/',
        'https://threejs.org/examples/webgl_objconvert_test.html',
        'https://api.durf.dev.stackworx.io/health/',
        'https://ord.dev.stackworx.io/health',
        'https://prima.run/health'
      ],
      block: Array(6).fill({
        url: '',
        status: '',
        lastPayload: null
      })
    };
    this.serverStatus = this.serverStatus.bind(this);
    this.checkServerStatus = this.checkServerStatus.bind(this);
  }
  componentDidMount() {
    setInterval(() => {
      return this.checkServerStatus(this.state.endPoints)
    }, 5000)
  }

  serverStatus = (url, index) =>
    request({ uri: url, method: 'GET' }, (error, response, body) => {
      let status = null;
      if (error) {
        status = 'OTHER';
      } else if (response.statusCode === 200) {
        status = 'UP';
      } else {
        status = 'DOWN';
      }
      this.setState(prevState => {
        const urlHistory = [...prevState.endPointHistory];
        const prevBlockInfo = [...prevState.block];
        const info = {
          url,
          status,
          lastPayload: prevBlockInfo[index].status
        };
        prevBlockInfo[index] = info;
        urlHistory[index] = status;
        return {
          block: prevBlockInfo,
          urlHistory
        }
      })
    })


  checkServerStatus = (urls) => {
    if (Array.isArray(urls) && urls.length > 0) {
      urls.map((url, index) => {
        this.serverStatus(url, index);
      })
    } else {
      return <span>Oooops!</span>
    }
  }

  render() {
    return (
      <div className='block-container'>
        {this.state.block.map(info => 
          <Block key={Math.random()}
            info={info}
          />
        )
        }
      </div>
    );
  }
}

export default App;
