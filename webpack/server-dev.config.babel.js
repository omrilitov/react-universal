import 'dotenv/config';
import nodeExternals from 'webpack-node-externals';
import _ from 'lodash';
import config from './dev.config.babel';

export default _.defaultsDeep(config, {
  target:  "node",
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
});