/**
 * @file webpack prod config
 * @author ielgnaw(wuji0223@gmail.com)
 */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const RemoveScriptTagPlugin = require('./remove-script-tag-plugin');
const config = require('./config');
const {assetsPath, styleLoaders} = require('./util');
const baseWebpackConfig = require('./webpack.base.conf');

const env = config.build.env;

const webpackConfig = merge(baseWebpackConfig, {
    entry: {
        main: './src/index.js'
    },
    module: {
        // loaders: styleLoaders({sourceMap: config.build.productionSourceMap, extract: true})
        loaders: [
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!postcss-loader'
            }
        ]
    },
    devtool: config.build.productionSourceMap ? '#eval-source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: 'san-mui.js',
        library: 'san-mui',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        san: {
            root: 'san',
            commonjs: 'san',
            commonjs2: 'san',
            amd: 'san'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
});

if (config.build.productionGzip) {
    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

module.exports = webpackConfig;
