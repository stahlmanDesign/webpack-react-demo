import React from 'react';

class Props extends React.Component {
  render() {
    // instead of passing arguments, read properties using this.props
    return <div>
      <h2>{this.props.title}</h2>
      Two ways to use static text plus dynamic in color:
      <span className="message">
        <br/>
        The author:{this.props.author}!
        <br/>
        {`The author: ${this.props.author} ! `}
      </span>
      <br/>
      An image assigned by this.props :
      <img src={this.props.avatarUrl}/>
    </div>
  }
}

export default Props
