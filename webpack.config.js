const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/client/src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/client/dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

// adding plugin to process env variables in react

// const webpack = require('webpack');
// const dotenv = require('dotenv');

// module.exports = () => {
//   // call dotenv and it will return an Object with a parsed key
//   const env = dotenv.config().parsed;

//   // reduce it to a nice object, the same as before
//   const envKeys = Object.keys(env).reduce((prev, next) => {
//     prev[`process.env.${next}`] = JSON.stringify(env[next]);
//     return prev;
//   }, {});

//   return {
//     plugins: [
//     new webpack.DefinePlugin(envKeys)
//   ]
// };
