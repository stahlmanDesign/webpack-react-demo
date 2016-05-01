// document.write('hello');
var React = require('react');
var ReactDOM = require('react-dom');

class Hello extends React.Component{
  render() {
    return <div>HELLO!</div>;
  }
}

ReactDOM.render(
  <Hello />, document.getElementById('target-container')
);
