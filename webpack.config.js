


const path = require("path");

module.exports = (mode = "production", chunksPath = "chunks/", filename = "[hash].bundle.js") => {
  return (
    {
      entry: "./src/index.js",
      mode: mode,
      devtool: "inline-source-map",
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader",
            options: { presets: ["@babel/env"] }
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          }
        ]
      },
      resolve: { extensions: ["*", ".js", ".jsx"] },
      output: {
        path: path.resolve(__dirname, chunksPath),
        // publicPath: "/dist/",
        filename: filename
      },
    }
  )
}


