const withCSS = require("@zeit/next-css");

module.exports = withCSS({});
// const webpack = require('webpack');
// const fs = require('fs');
// const path = require('path');
// const glob = require('glob');
// const withPlugins = require('next-compose-plugins');
// const withCSS = require('@zeit/next-css');
// const optimizedImages = require('next-optimized-images');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// module.exports = withPlugins([
//     withCSS,
//     optimizedImages,
//   ], {
//     webpack: (config, options) => {
//       const {dev, isServer} = options;

//       config.plugins.push(
//         new UglifyJsPlugin({
//           test: /\.js($|\?)/i
//         }),
//       );

//       config.module.rules.push(
//         {
//           test: /\.(css|scss)/,
//           loader: 'emit-file-loader',
//           options: {
//             name: 'dist/[path][name].[ext]'
//           }
//         },
//         {
//           test: /\.s(a|c)ss$/,
//           exclude: /node_modules/,
//           use: ['babel-loader', 'raw-loader', 'postcss-loader',
//             { loader: 'sass-loader',
//               options: {
//                 includePaths: ['styles', 'node_modules']
//                   .map((d) => path.join(__dirname, d))
//                   .map((g) => glob.sync(g))
//                   .reduce((a, c) => a.concat(c), [])
//               }
//             }
//           ],
//         },
//         {
//           test: /\.js$/,
//           enforce: 'pre',
//           exclude: /node_modules/,
//           loader: 'eslint-loader',
//           options: {
//             emitWarning: dev,
//           },
//         },
//       )

//       if (dev) {
//         config.devtool = 'cheap-module-source-map';
//       }

//       return config;
//     },
//   });
