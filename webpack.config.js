module.exports = {
    entry: "./index.jsx",
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
            },
            {
                // integrate jquery
                //http://reactkungfu.com/2015/10/integrating-jquery-chosen-with-webpack-using-imports-loader/
                test: /vendor\/.+\.(jsx|js)$/,
                loader: 'imports?jQuery=jquery,$=jquery,this=>window'
            }
        ]
    }
}
