const path = require('path');
const cwd = process.cwd();
const assertRootPath = path.resolve(cwd, 'dist');
module.exports = {
    assertRootPath,
    assetsPublicPath: '/',
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    devtool: false,
};