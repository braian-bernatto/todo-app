const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const CssMinimizer = require("css-minimizer-webpack-plugin")
const Terser = require("terser-webpack-plugin")

module.exports = {
  mode: "production",
  output: {
    clean: true,
    filename: "main.[contenthash].js"
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: false,
          minimize: false
        }
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/i,
        exclude: /styles.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /styles.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "file-loader"
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizer(), new Terser()]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[fullhash].css",
      ignoreOrder: false
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets/" }]
    })
  ]
}
