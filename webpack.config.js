var webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        heatmapscript: "./main.js"
    },
    output: {
        //path: "/Volumes/Official/nek/deployment/ROOT/AdventNet/Sas/tomcat/webapps/ROOT/web/initializer/",
        path:"dist/",
        filename: "[name].js"
    },
    module: {
        loaders: [{
            test: /\.js$|\.tag$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: JSON.stringify(true)
            }
        }),
        // new UglifyJsPlugin()
    ]
};
