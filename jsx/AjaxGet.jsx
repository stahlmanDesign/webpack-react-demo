import React from 'react';
import $ from 'jquery';
// a component is similar to a JavaScript function
class AjaxGet extends React.Component {
    constructor() {
        // must call as first thing, like in other object-oriented languages, because we're extending a class and must execute parent functionality first
        super();
        // set inital state
        this.state = {
            content: [],
            ajaxRequest: {} // save this to use componentWillUnmount to cancel any outstanding requests before the component is unmounted.
        };
    }
    render() {
        var content = JSON.stringify(this.state.content)
        return <div>
          <h2>Load ajax and show JSON</h2>
          <div>{content}</div>
        </div>
  }
    componentDidMount() {
        $.ajax({
            method: 'GET',
            url: this.props.url,
            dataType: "json",
            cache: false,
            success: (content) => {
                this._gotData(content) // arrow function allows use of lexical this. No need to .bind(this) or set context:this in ajax params
                //console.log("success")
            },
            error: (e) => {
              console.error(this.props.url, status, err.toString());
            }
        })
    }
    _gotData(content) {
        console.log(content)
        this.setState({content: content})
    }
    componentWillUnmount() {
        this.setState({ajaxRequest: null})
    }
}
export default AjaxGet
