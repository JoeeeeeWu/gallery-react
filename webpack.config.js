var webpack = require("webpack");
module.exports = {
    entry: [
        './src/components/GalleryByReactApp.js'
    ],
    output: {
        path: './disk',
        filename: 'bundle.js',
        publicPath: 'disk/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style!css!autoprefixer?{browsers:["last 2 version", "> 1%"]}',
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: "json-loader",
            },
            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=8192&name=images/[name].[ext]',
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}