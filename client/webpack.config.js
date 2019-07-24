const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ] 
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env']
        }
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          publicPath: path => '../' + path
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {
    contentBase: 'dist',
    open: true
  }
};