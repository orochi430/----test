"use strict"
const path = require("path")
const fs = require("fs")
const utils = require("./utils")
const webpack = require("webpack")
const config = require("../config")
const { merge } = require("webpack-merge")
const baseWebpackConfig = require("./webpack.base.conf")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MinCssExtractPlugin = require("mini-css-extract-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const PROJECT_HTML = process.env.npm_config_html

// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const env = require("../config/prod.env")
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

// 获取打包忽略的项目图片目录
function getIgnoreImages() {
  // PROJECT_NAME：命令行npm run build --project= 参数
  console.log(process.env.NODE_ENV)
  const PROJECT_NAME = process.env.npm_config_project
  //  无--project，则不忽略全部打包
  if (!PROJECT_NAME) return []

  // 兼容旧项目目录
  let oldProject = [
    "hljMedicine",
    "jiangsuyancao",
    "jiangxiDRC",
    "jinbo",
    "ghjoa",
    "mzb",
    "peopleCongress",
    "shandongdongying",
    "shandongyancao",
    "shanxi",
    "wanzhengtong",
    "xizangOffice",
    "zhezhengding",
    "greatWisdom"
  ]
  let projectIndex = oldProject.indexOf(PROJECT_NAME)
  if (projectIndex > -1) oldProject.splice(projectIndex, 1)

  // 新项目图片目录需建在 /static/images/project/下
  let newProject = []
  const files = fs.readdirSync("./static/images/project")
  files.forEach(function (item, index) {
    let stat = fs.statSync("./static/images/project/" + item)
    if (stat.isDirectory() === true && item != PROJECT_NAME) {
      newProject.push(`project/${item}`)
    }
  })
  return newProject.concat(oldProject).map(item => `**/images/${item}/**`)
}

const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[contenthash].js"),
    chunkFilename: utils.assetsPath("js/[id].[contenthash].js")
  },
  // entry: {
  //   vendor: ["axios", "vuex", "dingtalk-jsapi", "nprogress", "qs", "vant", "vue-float-action-button", "qrcodejs2", "vconsole", "vue-esign", "vue-scroller", "vue-lazyload", "vue"]
  // },
  externals: {
      vue: "Vue",
      vuex: "Vuex",
      vant: "vant",
      "element-ui": "ELEMENT",
      ELEMENT: "ELEMENT",
      jquery: "jQuery",
      lodash: "_"
    },
  optimization: {
    moduleIds: "deterministic",
    nodeEnv: process.env.npm_config_project ? '"projectProduction"' : '"production"',
    minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      minChunks: 10,
      automaticNameDelimiter: "~",
      cacheGroups: {
        // vendors: {
        //   name: "vendors",
        //   test({ resource }) {
        //     return /[\\/]node_modules[\\/]/.test(resource)
        //   },
        //   priority: -10
        // },
        styles: {
          name: "app",
          // test: /\.(sc|c)ss$/,
          type: "css/mini-extract"
          // chunks: "all",
          // enforce: true
        }
      }
    }
  },
  plugins: [
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),//打包减小moment的大小  尚未测试暂不开启
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env": env,
      buildTime: JSON.stringify(timeFormat(new Date()))
    }),

    // 允许你用 newResource 替换与 resourceRegExp 匹配的资源。如果 newResource 是相对路径，它会相对于先前的资源被解析。如果 newResource 是函数，它将会覆盖之前被提供资源的请求
    // 替换资源路径中的 PROJECT_NAME 为 打包命令行参数中的 --project=项目名
    new webpack.NormalModuleReplacementPlugin(/(.*)PROJECT_NAME(\.*)/, function (resource) {
      resource.request = resource.request.replace(/PROJECT_NAME/, `${process.env.npm_config_project}`)
    }),

    new MinCssExtractPlugin({
      filename: utils.assetsPath("css/[name].[contenthash].css"),
      chunkFilename: utils.assetsPath("css/[id].[contenthash].css"),
      ignoreOrder: true
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: config.build.productionSourceMap ? false : true, // 移除console
          drop_debugger: config.build.productionSourceMap ? false : true, // 移除debugger
          pure_funcs: ["console.log"] // 只移除console.log
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: PROJECT_HTML || "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      hash: true, //是否生成hash添加在引入文件地址的末尾，类似于我们常用的时间戳，这个可以避免缓存带来的麻烦
      cache: true, //是否需要缓存，如果填写true，则文件只有在改变时才会重新生成
      chunksSortMode: "manual"
    }),

    // copy custom static assets
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../static"),
          to: config.dev.assetsSubDirectory,
          globOptions: {
            dot: true,
            gitignore: false,
            ignore: ["**.json"].concat(getIgnoreImages())
          }
        }
      ]
    })
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin")

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: new RegExp("\\.(" + config.build.productionGzipExtensions.join("|") + ")$"),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}
if (config.build.productionDistZip) {
  //npm run build 后都要将dist文件压缩成zip包
  //npm i filemanager-webpack-plugin@2.0.5
  const FileManagerPlugin = require("filemanager-webpack-plugin")
  console.log("productionDistZip", config.build.productionDistZip)
  let deleteArray = []
  let archiveArray = []
  if (config.build.productionSourceMap) {
    deleteArray.push("./dist.zip")
    archiveArray.push({
      source: "./dist",
      destination: "./dist.zip"
    })
  } else {
    deleteArray.push("./distRelease.zip")
    archiveArray.push({
      source: "./distRelease",
      destination: "./distRelease.zip"
    })
  }
  webpackConfig.plugins.push(
    new FileManagerPlugin({
      onEnd: {
        delete: deleteArray,
        archive: archiveArray
      }
    })
  )
}
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig
