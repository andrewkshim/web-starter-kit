const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: [
      path.resolve(__dirname, 'public'),
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  plugins: [
    new webpack.WatchIgnorePlugin([
      /css\.d\.ts$/,
    ]),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              importLoaders: 1,
              modules: true,
              namedExport: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer'),
              ],
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          // Why is babel-loader here?
          // https://github.com/gaearon/react-hot-loader/blob/dccd36e89a2f63d3c408c72fac753a230045418d/README.md#typescript
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-hot-loader/babel'],
            }
          },
          {
            loader: 'ts-loader',
          }
        ],
      },
    ],
  },
};
