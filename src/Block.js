import React, { Component } from 'react';

const styles =  {
  bg:  'background: red'
}
export default class Block extends Component {
  
  render() {
    const { response } = this.props;
    const { statusCode } = response;
    return (
      <p>
      {response.length > 0 && this.renderBlocks(response)}
      </p>
    )
  }
  renderBlocks(response) {
    return response.map(response => <div className={response.statusCode !== 200 ? 'green': styles.bg}>{response.statusCode}</div>)
  }
}