const path = require('path');
const webpack = require('webpack');
const cwd = process.cwd();
const NODE_ENV = process.env.NODE_ENV;
const config = require('../config');
const nodePath = path.resolve(cwd, 'node_modules');
const srcPath = path.resolve(cwd, 'src');
module.exports = {
    context: srcPath,
    output: {
        path: config.assertRootPath,
        publicPath: config.assetsPublicPath,
    },
    module: {
        rules: [{
                test: /\.ts$/,
                exclude: nodePath,
                include: srcPath,
                use: [{
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            isolatedModules: true,
                            typeCheck: true,
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [srcPath],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV),
            },
        })
    ],
    resolve: {
        mainFields: ['jsnext:main', 'main'],
        modules: [srcPath, nodePath],
        extensions: [
            ' ',
            '.js',
            '.css',
            '.scss',
            '.ts',
        ]
    },
    devtool: config.devtool,
    target: 'web',
    stats: true,
}