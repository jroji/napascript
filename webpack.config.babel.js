const path = require('path');

const {
  DefinePlugin,
  ProgressPlugin,
} = require('webpack');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const paths = {
  src: path.join(__dirname, '/src/'),
  output: path.join(__dirname, '/dist/'),
  public: '/'
};

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  output: {
    path: paths.output,
    publicPath: paths.public,
    pathinfo: !isProd,
    filename: isProd ? '[name]-[hash].min.js' : '[name].js',
  },
  plugins: [
    new ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html',
      chunks:['common', 'main']
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv)
    }),
    new CommonsChunkPlugin({
        // (the filename of the commons chunk)
        // minChunks: 3,
        // (Modules must be shared between 3 entries)
        name: 'common',
        chunks: ["main", "home", "test"],
        // (Only use these entries)
    })
  ],
  entry: {
    'main': path.join(__dirname, 'src/main.js')
  },
  resolve: {
    extensions: [ '.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
          test: /\.html/,
          loader: 'html-loader'
      },
      {
        test: /\.css$/,
        loader: ['css-loader']
      },
      {
        test: /\.md$/,
        use: [
            {
                loader: "html-loader"
            },
            {
                loader: "markdown-loader",
                options: {
                    /* your options here */
                }
            }
        ]
    }
    ]
  },
  devServer: {
    contentBase: paths.src,
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    compress: isProd,
    inline: true,
    stats: 'minimal',
  }
};
