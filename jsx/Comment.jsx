import React from 'react';

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

export default Comment
