"use strict"
const path = require("path")
const utils = require("./utils")
const config = require("../config")
const vueLoaderConfig = require("./vue-loader.conf")
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
function resolve(dir) {
  return path.join(__dirname, "..", dir)
}

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    app: "./src/main.js"
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name][hash].js",
    publicPath: process.env.NODE_ENV === "production" ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },

  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src"),
      static: resolve("static")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: "thread-loader",
            options: {
              workers: 3
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: utils.assetsPath("media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|TTF|otf)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
      }
    ]
  },
  plugins: [new LodashModuleReplacementPlugin(), new NodePolyfillPlugin()]
}
