const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point for your application
  output: {
    filename: "bundle.js", // Output file name
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Process .js, .jsx, .ts, and .tsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Transpile JavaScript files
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // Handle CSS files
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "file-loader", // Handle image files
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    proxy: [
      {
        context: ["/api"], // Proxy requests that start with /api
        target: "http://localhost:5000", // Your backend server
        changeOrigin: true, // Change the origin of the request to the target URL
      },
    ],
    static: {
      directory: path.join(__dirname, "dist"), // Serve static files from 'dist' directory
    },
    hot: true,
    compress: true,
    port: 3000,
    historyApiFallback: true, // This is useful for React Router
    open: true, // Open the browser after server start
    watchFiles: ["src/**/*.js", "src/**/*.js", "src/**/*.ts", "src/**/*.tsx"],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Resolve JavaScript and JSX files
  },
};
