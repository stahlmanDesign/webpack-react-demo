import React from 'react';

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
          <br/>
          <textarea
            placeholder="Comment:"

            ref={c => this._body = c}
            onChange={this._getCharacterCount.bind(this)}>
          </textarea>
        </div>

        <div className="comment-form-actions">
          <button type="submit">
            Post comment
          </button>
          <span className="num-characters">{this.state.characters} characters</span>
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

export default CommentForm
