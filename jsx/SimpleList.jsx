import React from 'react';

// prefered React ES6 way
class SimpleList extends React.Component {
  render() {
    const topicsList = ["HTML", "JavaScript", "React"];
    return <div>
      Using ES6 syntax using “fat arrow” (=>)
      <ul>
        {topicsList.map( (topic,i) =>
          <li key={"myId" + i}>
            {topic}
          </li>
        )}
      </ul>
    </div>
  }
}

//same result but with varaibles defined outside return statement
// class SimpleList extends React.Component {
//   render() {
//     const topicsList = ["HTML", "JavaScript", "React"];
//     return <div>
//       Using ES6 syntax: topic => with return content wrapped in {}
//       <ul>
//         {topicsList.map( (topic,i) =>
//           {
//             // to create a variable before the returned JSX, wrap the whole return code in {}
//             let id = "myId" + i;
//             // and then explicitly return the JSX
//             return <li key={id}>
//               {topic}
//             </li>
//           }
//         )}
//       </ul>
//     </div>
//   }
// }


//same result using ES5 return function instead of fat arrow (=>) ES6 syntax
// class SimpleList extends React.Component {
//   render() {
//     const topicsList = ["HTML", "JavaScript", "React"];
//     return <div>
//       Using ES5 syntax with ES5 return function
//       <ul>
//         {topicsList.map( function(topic,i){
//             // to create a variable before the returned JSX, wrap the whole return code in {}
//             let id = "myId" + i;
//             // and then explicitly return the JSX
//             return <li key={id}>
//               {topic}
//             </li>
//           }
//         )}
//       </ul>
//     </div>
//   }
// }

export default SimpleList
