var webpack = require('webpack');
var path = require('path');

var config = {
  entry: [
    './src/index'
  ],
  module: {
    loaders: [
      { test: /\.js?$/, loader: 'babel', exclude: /node_modules/ },
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool : "#source-map",
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

if(process.env.NODE_ENV !== 'production'){
  config.plugins.splice(1,0,new webpack.HotModuleReplacementPlugin());
  config.devServer.hot = true;
}

module.exports = config ;
