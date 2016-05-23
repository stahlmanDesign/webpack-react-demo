import React from 'react';
import $ from 'jquery';
// a component is similar to a JavaScript function
class SetInterval extends React.Component {
  constructor() {
    // must call as first thing, like in other object-oriented languages, because we're extending a class and must execute parent functionality first
    super();
    // set inital state
    this.state = {
      currentTime: "",
      startTime: "",
      timer: {}
    };
    $("h1").css({"color": "red"}); // this is not React, just showing that Jquery can also be used
  }
  render() {
    var message = "";
    var timeString = "";
    if (this.props.keepTimeUpdated) {
      message = "Time since load: ";
      timeString = this.state.currentTime;
    } else {
      message = "Page loaded at: ";
      timeString = this.state.startTime;
    }
    return <div>
      <h2>{this.props.title}</h2>
      <div>{message}{timeString}</div>
      </div>
}
  _timer() {
    var now = new Date();
    var nowString = now.toTimeString();
    this.setState({currentTime: nowString})
  }
  _getStartTime() {
    var now = new Date();
    var nowString = now.toTimeString();
    return nowString
  }
  componentDidMount() {
    var timer = setInterval(this._timer.bind(this), 1000); // bind this so we can set state in timer update using this keyword from different scope
    this.setState({timer: timer});  // set timer to state so we can clean up memory when component remove (ex. navigate to new page)
    this.setState({startTime: this._getStartTime()}) // set once, will not change after
    this.setState({currentTime: this._getStartTime()}) // set this too so it doesn't have to wait until 1 second to show up
    this._timer.bind(this)
  } // should use timer here to avoid memory leak
  componentWillUnmount() {
    clearInterval(this.state.timer); // avoid memory leak of tons of timers
  }
}
export default SetInterval
