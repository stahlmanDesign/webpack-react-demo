import React from 'react';
import CommentForm from '../jsx/CommentForm.jsx'
import Comment from '../jsx/Comment.jsx'

class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: [
        { id: 1, author: 'Goth Girl', body: 'Our souls are devoured in The Void', avatarUrl: 'http://lorempixel.com/200/200/people/1/' },
        { id: 2, author: 'Bad Mom', body: 'My daughter is a real princess', avatarUrl: 'http://lorempixel.com/200/200/people/6/' }
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
      if (!comment.avatarUrl) comment.avatarUrl = "http://campus.codeschool.com/powering_up_with_react/assets/javascripts/preview/images/default-avatar.png"
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

export default CommentBox
