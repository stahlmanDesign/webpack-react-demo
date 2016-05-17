// document.write('hello');
var React = require('react');
var ReactDOM = require('react-dom');

// component similar to JS function
class Hello extends React.Component {

    render() {

        var now = new Date();
        var result = <div>HEllO! {new Date().toTimeString()}</div>;
        return result;
    }
}

class RobotBox extends React.Component {
    render() {
        // instead of passing arguments, read properties using this.props
        return <div>Hello from <span className="message"> {`Mr. ${this.props.author}’s friend`} {this.props.topic}</span><img src={this.props.avatarUrl} /></div>
    }
}

class StoryBox extends React.Component {
    render() {
        const topicsList = ["HTML", "JavaScript", "React"];
        return <div>
        Using ES6 syntax: topic =>
            <ul>
                {topicsList.map( (topic,i) =>

                  <li>
                    {topic}</li>)}
            </ul>
        </div>
    }
}

class StoryBoxES5 extends React.Component {
    render() {
        const topicsList = [
          ["HTML", "JavaScript", "React"],
          ["Dog food","beans","cantelope"]
        ];
        const rnd = Math.floor(Math.random()*2)
        return <div>

        Using ES5 syntax: function(topic)
        <br/>

        Also randomly selecting array: topicsList[{rnd}].map
            <ul>
                {topicsList[rnd].map(function(topic,i) {
                    // RobotBox is a React component which can have arguments in the form of properties
                    // look like HTML attributes
                    const commentId = "id"+i
                    return <li> <RobotBox author="King Kong" topic={topic} key={commentId} /></li>
                })}
            </ul>
        </div>


    }
    _getComment(com) {
      return "test test " + com + " some rand "
    }
}


// set up divs to render components
var targets = []; // array of dom elements which we will use to render components

for (var i = 0; i < 20; i++) {
    var newEl = document.createElement('div');
    var newHr = document.createElement('hr');
    newEl.id = "target" + i;
    newEl.innerHTML = newEl.id;
    var content = document.getElementById('content')
    content.appendChild(newEl);
    content.appendChild(newHr);

    targets.push(document.getElementById('target' + i))
}

ReactDOM.render(
    <Hello/>, targets[0]);

setInterval(function() {
    // each compnent has a render function
    // UPPERCASE elements are React. lowercase are normal DOM elements

    ReactDOM.render(
        <Hello/>, targets[1]);

    ReactDOM.render(
        <RobotBox author="Justinian" avatarUrl="http://dhg7upb7j7jqa.cloudfront.net/powering_up_with_react/assets/images/logo-course-ba8641ec-bc39-4532-897e-7743c00b3162.svg"/>, targets[2]);
    ReactDOM.render(
        <StoryBox/>, targets[3]);
    ReactDOM.render(
        <StoryBoxES5 author="King Kong"/>, targets[4]);
}, 2000)
