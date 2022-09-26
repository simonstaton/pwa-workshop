const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/app/index.js",
    // print: './src/print.js',
  },
  output: {
    filename: "[name]-[hash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    open: true,
    compress: true,
  },
  optimization: {
    runtimeChunk: "single",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      meta: {
        // "theme-color": "#4285f4",
        // 'set-cookie': { 'http-equiv': 'set-cookie', content: 'name=value; expires=date; path=url' },
        // 'Content-Security-Policy': { 'http-equiv': 'Content-Security-Policy', 'content': 'default-src https:' },
      },
      title: "IMDB Movie Search",
      filename: "index.html",
      template: "./src/index.html",
      minify: true,
    }),
    new HtmlWebpackPlugin({
      meta: {
        // "theme-color": "#4285f4",
        // 'set-cookie': { 'http-equiv': 'set-cookie', content: 'name=value; expires=date; path=url' },
        // 'Content-Security-Policy': { 'http-equiv': 'Content-Security-Policy', 'content': 'default-src https:' },
      },
      title: "IMDB Movie Search - About",
      filename: "about.html",
      template: "./src/about.html",
      minify: true,
    }),
  ],
};
