const { resolve, join } = require("path")
const webpack = require('webpack')

module.exports = {
    mode: "development",
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
        filename: "bundle.js",
        path: resolve(__dirname, "public"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js"]
    },
    devtool: "source-map",
    devServer: {
        contentBase: join(__dirname, 'public'),
        compress: false,
        historyApiFallback: true
    },
    stats: {
        colors: true,
        reasons: true
    },
    plugins: [
        new webpack.DefinePlugin({
            WEATHER_API: {
                URL: JSON.stringify('https://api.openweathermap.org/data/2.5/weather'),
                KEY: JSON.stringify('551b54a7e304f6cca2c11e47b71257bd')
            },
            CACHE_EXPIRATION_MS: (1000 * 60 * 10)
        })
    ]
}