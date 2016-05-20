// document.write('hello');
import React from 'react'; // same as var React = require('react');
import ReactDOM from 'react-dom';
import $ from 'jquery';

// component similar to JS function
class Hello extends React.Component {

  constructor(){
    super(); // must call as first thing
    this.state = {time : ""}; // set inital state
    $("h1").css({"color":"red"}); // show that Jquery works
  }

  render() {
    var message = "Time moves on...";
    var now = new Date();
    var nowString = now.toTimeString();
    var self = this;
    if (this.props.update){
      this._timer = setInterval(function() {
        self._setTime(nowString)
      }, 1000)
    }else{
      message = "Time at page load"
    }
    var result =
    <div>
      {message} {nowString}
    </div>

    return result;
  }

  _setTime(nowString){
    if (nowString != this.state.time) {
      this.setState({time: nowString})
    }
  }
  componentDidMount() {} // should use timer here to avoid memory leak
  componentWillUnmount(){

    clearInterval(this._timer); // avoid memory leak of tons of timers
  }
}

class RobotBox extends React.Component {
  render() {
    // instead of passing arguments, read properties using this.props
    return <div>
      Hello from
      <span className="message">
        {` Mr. ${this.props.author}’s friend`}
        {this.props.topic}
      </span>
      <img src={this.props.avatarUrl}/>
    </div>
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
            {topic}
          </li>
        )}
      </ul>
    </div>
  }
}

class StoryBoxES5 extends React.Component {
  render() {
    const topicsList = [
      ["HTML", "JavaScript", "React"],
      ["Dog food","beans","cantelope banana"]
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
          return <li>
            <RobotBox
              author="King Dong"
              topic={topic}
              key={commentId} />
          </li>
        })}
      </ul>
    </div>


  }
  _getComment(com) {
    return "test test " + com + " some rand "
  }
}

class Comment extends React.Component {

  constructor(){
    super(); // must call as first thing
    this.state = {isAbusive : false}; // set inital state
  }

  render() {

    let commentBody;
    if (!this.state.isAbusive) {commentBody = this.props.body}
    else { commentBody =
      <em> Content marked as abusive </em>
    }

    let buttonText = 'Hide abusive comment?'
    if (this.state.isAbusive){buttonText='See the ugly truth?'}

    return(
      <div className="comment">
        <img
          src={this.props.avatarUrl}
          alt={`${this.props.author}'s picture`} />
        <p className="comment-header">
          {this.props.author}
        </p>
        <p className="comment-body">
          {commentBody}
        </p>
        <button onClick={this._toggleAbuse.bind(this)}>
          {buttonText}
        </button>
      </div>
    );
  }
  _toggleAbuse(event){
    event.preventDefault();// prevent page reload when called
    this.setState({isAbusive : !this.state.isAbusive});
  }
}

class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: [
        { id: 1, author: 'Morgan McCircuit', body: 'Great picture!', avatarUrl: 'images/default-avatar.png' },
        { id: 2, author: 'Bending Bender', body: 'Excellent stuff', avatarUrl: 'images/default-avatar.png' }
      ]
    };
  }

  render() {
    const comments = this._getComments();
    return(
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />
        <h3>Comments</h3>
        {this._getPopularMessage(comments.length)}
        <h4 className="comment-count">
          {this._getCommentsTitle(comments.length)}
        </h4>
        <div className="comment-list">
          {comments}
        </div>
      </div>
    );
  }

  _getPopularMessage(commentCount) {
    const POPULAR_COUNT = 10;
    if (commentCount > POPULAR_COUNT) {
      return (
        <div>
          This post is getting really popular, don't miss out!
        </div>
      );
    }
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      return (
        <Comment
          author={comment.author}
          body={comment.body}
          avatarUrl={comment.avatarUrl}
          key={comment.id} />
      );
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }

  _addComment(commentAuthor, commentBody) {
    let comment = {
      id: Math.floor(Math.random() * (9999 - this.state.comments.length + 1)) + this.state.comments.length,
      author: commentAuthor,
      body: commentBody
    };

    this.setState({
      comments: this.state.comments.concat([comment])
    });
  }
}

class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      characters: 0
    };
  }

  render() {
    return (
      <form
        className="comment-form"
        onSubmit={this._handleSubmit.bind(this)}>
        <label>
          New comment
        </label>
        <div className="comment-form-fields">
          <input
            placeholder="Name:"
            ref={c => this._author = c} />
          <textarea
            placeholder="Comment:"
            ref={c => this._body = c}
            onChange={this._getCharacterCount.bind(this)}>
          </textarea>
        </div>
        <p>
          {this.state.characters} characters
        </p>
        <div className="comment-form-actions">
          <button type="submit">
            Post comment
          </button>
        </div>
      </form>
    );
  }

  _getCharacterCount(e) {
    this.setState({
      characters: this._body.value.length
    });
  }

  _handleSubmit(event) {
    event.preventDefault();
    if (!this._author.value || !this._body.value){
      alert("Please enter you name and comment");
      return; // don't add comment of nothing
    }


    this.props.addComment(this._author.value, this._body.value);

    this._author.value = '';
    this._body.value = '';

    this.setState({ characters: 0  });
  }
}

class LoadedText extends React.Component {
  // lifecycle methods — 3 main ones - called when rendered for first time (init), or when about to be removed (kill)
  // componentWillMount() <- called before component is rendered
  // componentDidMount() <- when done rendering - using timers here
  // componentWillUnmount() <- when about to be removed from DOM
  // more info https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
  // mounting means being rendered for the first time

  constructor(){
    super();

    this.state = {
      showComments:false,
      comments: []
    }


  }

  render(){

    let comments = this._getComments((comments) =>{
      console.log(comments)
    });

    return <div>
      hey? {comments}, {}
    </div>
  }


  _fetchComments() {
    $.ajax({
      method: 'GET',
      url: 'data.json',
      success: (comments) => {
        console.log(comments)
        this.setState({comments:comments})
        console.log("success")
      },
      error: (e)=>{
        console.log(e)
      }
    });
  }

  componentWillMount(){
    this._fetchComments()
  }

  _getComments() {
    return this.state.comments.map((comment) =>
      comment.body
    )
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
  <Hello update={false}/>,
  targets[0]
);


// each compnent has a render function
// UPPERCASE elements are React. lowercase are normal DOM elements

ReactDOM.render(
  <Hello update={true}/>,
  targets[1]
);


ReactDOM.render(
  <RobotBox
    author="Justinian"
    avatarUrl="http://dhg7upb7j7jqa.cloudfront.net/powering_up_with_react/assets/images/logo-course-ba8641ec-bc39-4532-897e-7743c00b3162.svg"/>,
  targets[2]
);
ReactDOM.render(
  <StoryBox/>,
  targets[3]
);
ReactDOM.render(
  <StoryBoxES5 author="King Kong"/>,
  targets[4]
);
ReactDOM.render(
  <Comment
    author="cutie cat"
    body="fud is good"
    avatarUrl="http://campus.codeschool.com/powering_up_with_react/assets/javascripts/preview/images/default-avatar.png"
    />,
  targets[5]
);
ReactDOM.render(
  <CommentBox/>, // CommentForm doesn't need to be rendered, because it is only inside of CommentBox
    targets[6]
  );

  ReactDOM.render(
    <LoadedText/>, // CommentForm doesn't need to be rendered, because it is only inside of CommentBox
      targets[7]
    );
