import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

export default {
  mode: 'production',
  entry: {
    app: path.join(__dirname, 'src', 'main.js')
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TempText',
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }
      },
      {
        test: /\.(png|svg)$/,
        use: 'url-loader'
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  }
}
