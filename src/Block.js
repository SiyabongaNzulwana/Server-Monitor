import React, { Component } from 'react';
import './Block.css';
class Block extends Component {
  render() {
    const { info } = this.props;
    let style = info.status === 'UP' ? 'green' : info.status === 'DOWN' ? 'red' : 'grey';
    style += ' block';
    return (
      <div className={style} onClick={() => alert('Last Payload ' + info.lastPayload)}>
        <div className="end-point-url">
          <strong>Server:</strong> {info.url}
        </div>
        <div>
          <strong>Status:</strong> {info.status}
        </div>
        <div>
          <strong>Previous Status:</strong> {info.lastPayload}
        </div>
      </div>
    );
  }
}

export default Block;
