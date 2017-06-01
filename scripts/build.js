require('./check-versions')();


const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('./webpack/webpack.prod');


webpack(webpackConfig, (err, stats) => {
    console.log(chalk.cyan('building for production...'));
    if (err) {
        throw err;
    }
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
    }) + '\n\n');
    console.log(chalk.cyan('  Build complete.\n'));
})