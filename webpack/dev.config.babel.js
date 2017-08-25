import 'dotenv/config';
import {resolve} from 'path';
import webpack from 'webpack';
import _ from 'lodash';
import nodeExternals from 'webpack-node-externals';

const webpackPort = process.env.WEBPACK_PORT;

const config = {
  context: resolve(__dirname, '..'),
  output: {
    path: resolve(__dirname, '../dist')
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.json', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        rules: [{
          loader: 'isomorphic-style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }, {
          loader: 'less-loader'
        }]
      },
      {
        test: /\.css/,
        rules: [{
          loader: 'isomorphic-style-loader'
        }, {
          loader: 'css-loader'
        }]
      },
      {
        test: /\.js$/,
        include: resolve(__dirname, '../src'),
        rules: [
          /*{
            loader: 'react-hot-loader'
          }, */{
            loader: 'babel-loader'
          }]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  }
};

const clientConfig = _.defaultsDeep({
  name: 'client',
  target: 'web',
  entry: {
    client: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?path=http://localhost:${webpackPort}`,
      './src/client.js'
    ]
  },
  output: {
    filename: 'bundle.js',
    publicPath: `http://localhost:${webpackPort}/dist/`
  },
  devServer: {
    port: webpackPort,
    contentBase: '/',
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: `http://localhost:${webpackPort}/dist/`,
    headers: {'Access-Control-Allow-Origin': '*'},
    stats: {colors: true}
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        WEBPACK_ENV: '\'client\''
      }
    })
  ]
}, config);

const serverConfig = _.defaultsDeep({
  name: 'server',
  target: 'node',
  entry: {
    server: [
      './src/server.js'
    ]
  },
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()]
}, config);

export default [clientConfig, serverConfig];