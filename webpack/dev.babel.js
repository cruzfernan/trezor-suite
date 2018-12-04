/* @flow */

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FlowWebpackPlugin from 'flow-webpack-plugin';

import {
    SRC, BUILD, PORT,
} from './constants';

module.exports = {
    watch: true,
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        indexUI: [`${SRC}/ui/index.ui.js`],
        indexRipple: [`${SRC}/ui/ripple.js`],
        index: [`${SRC}/index.js`],
        // ripple: [`${SRC}/workers/ripple/index.js`],
    },
    output: {
        filename: '[name].[hash].js',
        path: BUILD,
    },
    devServer: {
        contentBase: [
            SRC,
        ],
        hot: false,
        https: false,
        port: PORT,
        stats: 'minimal',
        inline: true,
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    // {
                    //     loader: 'eslint-loader',
                    //     options: {
                    //         emitWarning: true,
                    //     },
                    // },
                ],
            },
        ],
    },
    resolve: {
        modules: [SRC, 'node_modules'],
    },
    performance: {
        hints: false,
    },
    plugins: [
        // new FlowWebpackPlugin({
        //     reportingSeverity: 'warning',
        // }),
        new HtmlWebpackPlugin({
            chunks: ['indexUI'],
            template: `${SRC}ui/index.html`,
            filename: 'index.html',
            inject: true,
        }),
        new HtmlWebpackPlugin({
            chunks: ['indexRipple'],
            template: `${SRC}ui/ripple.html`,
            filename: 'ripple.html',
            inject: true,
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    }
};
