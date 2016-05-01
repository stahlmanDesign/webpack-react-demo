#Setting up Webpack to process React and JSX

Taken from [this video] [1] by Michael Chan [@chantastic] [2] and updated to work with React v15.0.2

##Quick start
```npm install``` load npm modules

```npm start```

[1]: http://www.sitepoint.com/watch-using-webpack-to-transform-jsx/ 
[2]: https://twitter.com/chantastic       "Michael Chan"

##Why Webpack?

We need it to transform JSX code into plain javascript. It's like **Browserify** but much more powerful.


## Start

- make sure npm and node.js are installed
- ```npm init``` create package.json file, accept all defaults
- ```npm install webpack react --save-dev``` install webpack and react
- ```node_modules/.bin/webpack``` or ```webpack --help``` shows commands
- create a text js file from the command line:
	- ```echo "document.write('hello');" >> index.js```
- Now let Webpack process it: (2 arguments, input and output file):
	- ```node_modules/.bin/webpack index.js browser-bundle.js```
- create html file to test that it worked
	- ```echo "<html><body><script src="./browser-bundle.js"></script></body></html>" >> index.html```
	
- ```open index.html``` should show js file loaded and works.

## Watching and building

- add to package.json "scripts":{...} a shortcut to run have webpack transform files
	- ```"start": "webpack --watch",``` this is exectued when you type ```npm start```
	- create a ```webpack.config.json``` file to tell webpack shortcut what do. Its contents should be:
<pre>module.exports = {
    entry: "./index.js",
    output: {
        filename: "./browser-bundle.js"
    }
  }
};</pre>
	- ```npm start``` to see it work.
	
## React and JSX
**This is quite different from the video tutorial because it was an older version of React. This example uses React v15.0.2**

- ```npm react-dom --save``` module is now separate
- ```npm react --save``` just to be sure
- modify index.js to have React JSX code
<pre>// document.write('hello');
var React = require('react');
var ReactDOM = require('react-dom');
class Hello extends React.Component{
  render() {
    ```return <div>HELLO!</div>;```
  }
}
ReactDOM.render(```<Hello />, document.body```);
</pre>

## Install babel-loader to process JSX

- ```npm install babel-loader --save-dev```
- modify webpack.config.json created earlier:
<pre>
    module.exports = {
    entry: "./index.js",
    output: {
        filename: "./browser-bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015']
                }
      }
    ]
    }
}
    </pre>
    
- ```npm start``` build OK? test browser
- ```open index.html``` should show HELLO! generated from React JSX file