// document.write('hello');
import React from 'react'; // same as var React = require('react');
import ReactDOM from 'react-dom';
import $ from 'jquery';

import SetInterval from './jsx/SetInterval.jsx';
import SimpleList from './jsx/SimpleList.jsx';
import AjaxGet from './jsx/AjaxGet.jsx';
import Props from './jsx/Props.jsx';
import NestedComponent from './jsx/NestedComponent.jsx';
import Comment from './jsx/Comment.jsx';
import CommentBox from './jsx/CommentBox.jsx';
import CommentForm from './jsx/CommentForm.jsx';
import LoadedText from './jsx/LoadedText.jsx';

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

var increment = 0;

ReactDOM.render(
  <AjaxGet url="data.json"/>,targets[increment]
);

increment += 1;
ReactDOM.render(
  <SetInterval keepTimeUpdated={false} title="setInterval just once to show time"/>,
  targets[increment]
);


// each compnent has a render function
// UPPERCASE elements are React. lowercase are normal DOM elements

increment += 1;
ReactDOM.render(
  <SetInterval keepTimeUpdated={true} title="setInterval update time, but outside of render() to avoid memory leak"/>,
  targets[increment]
);

increment += 1;
ReactDOM.render(
  <Props
    title="Use properties to make component instances unique"
    author="John Doe"
    avatarUrl="http://dhg7upb7j7jqa.cloudfront.net/powering_up_with_react/assets/images/logo-course-ba8641ec-bc39-4532-897e-7743c00b3162.svg"/>,
  targets[increment]
);

increment += 1;
ReactDOM.render(
  <SimpleList/>,
  targets[increment]
);

increment += 1;
ReactDOM.render(
  <NestedComponent author="Fyodor Dostoyevsky"/>,
  targets[increment]
);

//increment += 1;
ReactDOM.render(
  <Comment
    author="James Dean"
    body="Dead at 27"
    avatarUrl="http://campus.codeschool.com/powering_up_with_react/assets/javascripts/preview/images/default-avatar.png"
    />,
  targets[increment]
);

increment += 1;
ReactDOM.render(
  <CommentBox avatarUrl="http://campus.codeschool.com/powering_up_with_react/assets/javascripts/preview/images/default-avatar.png"/>, // CommentForm doesn't need to be rendered, because it is only inside of CommentBox
    targets[increment]
  );

increment += 1;
  ReactDOM.render(
    <LoadedText/>, // CommentForm doesn't need to be rendered, because it is only inside of CommentBox
      targets[increment]
    );
