const path = require('path');

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

  module: {
    rules: [
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
