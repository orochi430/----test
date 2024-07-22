"use strict"
const utils = require("./utils")
const webpack = require("webpack")
const config = require("../config")
const { merge } = require("webpack-merge")
const path = require("path")
const baseWebpackConfig = require("./webpack.base.conf")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
const portfinder = require("portfinder")

const MinCssExtractPlugin = require("mini-css-extract-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
// 通过参数 --host=0.0.0.0 启动
const _host = process.env.npm_config_host
//const moment = require('moment')
function timeFormat(time) {
  var datetime = new Date()
  datetime.setTime(time)
  var year = datetime.getFullYear()
  var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1
  var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate()
  var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours()
  var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes()
  // var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
  return year + "-" + month + "-" + date + " " + hour + ":" + minute
}

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true,
      extract: true,
    }),
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  output: {
    pathinfo: false,
  },
  // these devServer options should be customized in /config/index.js
  stats: "errors-only",
  externals: {
    vue: "Vue",
    vuex: "Vuex",
    vant: "vant",
    "element-ui": "ELEMENT",
    ELEMENT: "ELEMENT",
    jquery: "jQuery",
    lodash: "_"
  },
  devServer: {
    // clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, "index.html"),
        },
      ],
    },
    hot: true,
    // contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: _host || HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    client: {
      overlay: config.dev.errorOverlay
        ? { warnings: false, errors: true }
        : false,
    },
    proxy: config.dev.proxyTable,
    // quiet: true, // necessary for FriendlyErrorsPlugin
    static: {
      // directory: path.join(__dirname, 'static'),
      publicPath: config.dev.assetsPublicPath,
    },
  },
  watchOptions: {
    poll: config.dev.poll,
  },

  optimization: {
    moduleIds: "named",
    runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env"),
      buildTime: JSON.stringify(timeFormat(new Date())),
    }),
    /* new webpack.ProvidePlugin({
      'dd': 'dingtalk-jsapi',
    }), */
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),

    new MinCssExtractPlugin({
      ignoreOrder: true,
    }),
    new VueLoaderPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
    }),
    // copy custom static assets
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../static"),
          to: config.dev.assetsSubDirectory,
          globOptions: {
            ignore: [".*"],
          },
        },
        {
          from: path.resolve(__dirname, "../modules"),
          to: config.dev.assetsSubDirectory,
          globOptions: {
            ignore: [".*"],
          },
        },
      ],
    }),
  ],
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
          },
          onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
