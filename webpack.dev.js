const { resolve, join } = require("path")

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
    }
}