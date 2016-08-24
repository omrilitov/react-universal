import 'dotenv/config';
import webpack from 'webpack';
import _ from 'lodash';
import config from './dev.config.babel';

const port = process.env.WEBPACK_PORT;

export default _.defaultsDeep(config, {
  entry: {
    main: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${port}`,
      'webpack/hot/only-dev-server',
      './src/client.js'
    ]
  },
  output: {
    filename: 'bundle.js',
    publicPath: `http://localhost:${port}/dist/`
  },
  devServer: {
    port,
    contentBase: `http://localhost:${port}`,
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: `http://localhost:${port}/dist/`,
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
});