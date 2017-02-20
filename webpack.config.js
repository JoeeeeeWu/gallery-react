var webpack = require("webpack");
module.exports = {
    entry: [
        './src/components/root.js'
    ],
    output: {
        path: './disk',
        // filename: 'bundle.js',
        //生产环境
        filename: 'bundle.[hash:5].js',
        // publicPath: 'disk/'
        // 生产环境
        publicPath: 'http://wuxiaozhou.coding.me/gallery-react/disk/'
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
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),//代码压缩，只在生产环境使用
        new webpack.DefinePlugin({
			"process.env": { 
				NODE_ENV: JSON.stringify("production") 
			}
		})
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}