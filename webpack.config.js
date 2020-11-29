var path = require('path');
module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [{
            test: /\.md$/,
            use: [
                {
                    loader: "html-loader"
                },
                {
                    loader: "markdown-loader"
                }
            ]
        }, {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'url-loader'
                }
            ]
        }]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname)
    },
};
