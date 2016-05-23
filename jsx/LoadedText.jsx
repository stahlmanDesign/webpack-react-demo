import React from 'react'
import $ from 'jquery';

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
    let comments = this._getComments((comments) =>{});
    return <div>
      Loaded text from Ajax call: {comments}
    </div>
  }

  _fetchComments() {
    $.ajax({
      method: 'GET',
      url: 'data.json',
      success: (comments) => {
        this.setState({comments:comments})
        //console.log("success")
      },
      error: (e)=>{
        console.log(e)
      }
    });
  }

  componentDidMount(){
    this._fetchComments()
  }

  _getComments() {
    return this.state.comments.map((comment) =>
      comment.body
    )
  }
}

export default LoadedText
