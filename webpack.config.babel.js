import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const config = {
  entry: [
    ...(process.env.NODE_ENV === 'production'
      ? []
      : ['webpack-dev-server/client?http://localhost:8080']),
    './src/modules/presentation/index.js',
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new CopyWebpackPlugin([{ from: 'src/modules/presentation' }]),
    new HtmlWebpackPlugin({
      template: './src/modules/presentation/index.html',
    }),
    ...(process.env.NODE_ENV === 'production'
      ? [
          new webpack.optimize.UglifyJsPlugin({
            compressor: {
              warnings: false,
            },
          }),
          new webpack.optimize.OccurrenceOrderPlugin(),
        ]
      : [new webpack.HotModuleReplacementPlugin()]),
  ],
  devtool:
    process.env.NODE_ENV === 'production'
      ? 'source-map'
      : 'cheap-eval-source-map',
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    quiet: false,
    lazy: false,
    stats: {
      cached: false,
      chunks: false,
    },
  },
};

export default config;
