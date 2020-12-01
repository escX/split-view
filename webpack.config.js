var path = require('path');
module.exports = {
    entry: {
        'index': './src/index.js',
        'privacy-policy': './src/privacy-policy.js'
    },
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
        filename: "[name].js",
        path: path.resolve(__dirname)
    },
};
