import React from 'react'
import Props from '../jsx/Props.jsx'

class NestedComponent extends React.Component {
  render() {
    const topicsList = [
      ["HTML", "JavaScript", "React"],
      ["Dog food", "beans", "cantelope banana"]
    ];
    const rnd = Math.floor(Math.random() * 2)
    return <div>
      Nested component:
      <br/>
      Random 0 or 1 = {rnd}
      <ul>
        {
          topicsList[rnd].map((topic, i) => {
          // Props is a React component which can have arguments in the form of properties
          // look like HTML attributes
          let commentId = "id" + i
          let prop = this.props.author;
          if (rnd === 0) prop = "Walt Whitman";

          return <li key={commentId}>
            <Props author={prop} topic={rnd + " " + topic}/>
          </li>
        })
      }
      </ul>
    </div>
  }
  _getComment(com) {
    return "test test " + com + " some rand "
  }
}

export default NestedComponent
