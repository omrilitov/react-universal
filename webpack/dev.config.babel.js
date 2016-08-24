import {resolve} from 'path';

export default {
  context: resolve(__dirname, '..'),
  output: {
    path: resolve(__dirname, '../dist')
  },
  module: {
    loaders: [
      {test: /\.less$/, loader: 'isomorphic-style!css?modules!less'},
      {test: /\.css$/, loader: 'isomorphic-style!css'},
      {test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']},
      {test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000'}
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.json', '.js', '.jsx']
  }
}